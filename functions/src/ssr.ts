import * as functions from 'firebase-functions';
import * as express from 'express';
//import * as fs from 'fs';

const app = express();
//const index = fs.readFileSync(__dirname +'/index.html', 'utf8');


app.get('/deck', (req, res) => {
    console.log("Hello from Express!");
    res.send(`
    <!doctype html>
    <head>
      <title>Time</title>
      <link rel="stylesheet" href="/style.css">
      <script src="/script.js"></script>
    </head>
    <body>
      <p>foo</p>
      <button onClick="refresh(this)">Refresh</button>
    </body>
  </html>`);
});

export const deckSSR = functions.https.onRequest(app);

