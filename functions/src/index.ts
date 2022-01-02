import * as functions from "firebase-functions";
import * as puppeteer from "puppeteer";
import * as admin from "firebase-admin";

const ssr = require('./ssr');

exports.app = ssr.app;

const runtimeConfig = {
    timeoutSeconds: 120,
    memory: "1GB"
} as functions.RuntimeOptions;

const serviceAccount = require("../service_account.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: "lor-preview.appspot.com"
});

export const generateSocialImage = functions.runWith(runtimeConfig).https.onCall(async (data, context) => {
    const selector = ".card-list";
    const deckCode = data.deck;

    // Check if the a screenshot has already been created for this deck.
    const image = admin.storage().bucket().file(`OpenGraphThumbnails/${deckCode}.jpg`)
    
    return image.exists().then(async exists => {
        if (exists[0]) {
            console.log('Image already exists');
            return image.getSignedUrl({ action: 'read', expires: '03-09-2500' }).then(signedUrl => {
                return signedUrl;
            });
        } else {
            const browser = await puppeteer.launch()
            const page = await browser.newPage()
            await page.setViewport({
                width: 1920,
                height: 1080
            });
            console.log("Generating image...");

            const url = new URL('https://lor-preview.web.app/#/deck/?deck=' + deckCode);

            await page.goto(url.toString(), { waitUntil: 'domcontentloaded' })
            await page.waitForTimeout(3500);
            console.log("Page loaded");
            const element = await page.$(selector);
            if (element) {
                const imageBuffer = await element.screenshot({encoding: 'base64'});
                await browser.close();
                console.log("Image generated");

                if (imageBuffer) {
                    console.log("Saving image...");
                    return saveScreenShot(imageBuffer as string, deckCode).then(url => {
                        console.log("Image saved");
                        return url;
                    }).catch(err => {
                        console.log(err);
                        return;
                    });
                }
                return;
            }
            console.log("Screenshot Failed");
            return;
        }
    }).catch(err => {
        console.log(err);
    });
    
});

function saveScreenShot(imageBuffer: string, deck: string): Promise<string> {
    return new Promise<string>(async (resolve, reject) => {
        if (!imageBuffer || imageBuffer === '') {
            reject('No screenshot');
            return;
        }
        const bucket = admin.storage().bucket();
        const file = bucket.file(`OpenGraphThumbnails/${deck}.jpg`);
        file.save(Buffer.from(imageBuffer, 'base64'), {
            metadata: {
                contentType: 'image/jpeg'
            }
        }).then(() => {
            console.log('Image saved');
            return resolve(file.getSignedUrl({ action: 'read', expires: '03-09-2500' }).then(signedUrl => {
                return signedUrl[0];
            }));
        });
    });
}