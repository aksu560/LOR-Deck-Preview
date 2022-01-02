<template>
    <div class="deck-preview">
        <div class="deck-name-container section">
            <div
                class="deck-name-box box has-text-centered"
                @click="editingName = true"
            >
                <span v-if="!editingName" class="title">{{ name }}</span>
                <input @blur="changeName(deckName)" v-else v-model="deckName" type="text" class="input">

            </div>
        </div>
        <div class="card-list-wrapper section tile is-ancestor">
            <div class="card-list tile is-parent box has-background-light">
                <Card v-for="card in deck" :key="card.cardCode" :id="card.cardCode"
                    :cardUrl="getCardUrl(card.cardCode)" :count="card.count"
                    class="tile is-child is-1"
                />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { getDeckFromCode, Deck } from 'lor-deckcodes-ts'
import { getFunctions, httpsCallable } from "firebase/functions";
import Card from '../components/Card.vue';
import { default as SET1DATA } from '../assets/card_data/set1-en_us.json';
import { default as SET2DATA } from '../assets/card_data/set2-en_us.json';
import { default as SET3DATA } from '../assets/card_data/set3-en_us.json';
import { default as SET4DATA } from '../assets/card_data/set4-en_us.json';
import { default as SET5DATA } from '../assets/card_data/set5-en_us.json';

const functions = getFunctions();
const generateSocialImage = httpsCallable(functions, 'generateSocialImage');

type CardData = {
    [key: string]: {
        [key: string]: any;
    };
}

declare module "vue/types/options" {
    interface ComponentOptions<V extends Vue> {
        metaInfo?: any;
    }
}

function replaceName(name: string) {
    if (!name) {
        return "Unnamed Deck";
    }
    return name;
}

function getOGImage(deckCode: string) {
    let url = `https://storage.googleapis.com/lor-preview.appspot.com/OpenGraphThumbnails/${deckCode}.jpg`
    return url;
}

@Component({
    components: {
        Card,
    },
    metaInfo() {
        return {
            title: replaceName(this.$route.query.name as string),
            meta: [
                {
                    property: 'description',
                    content: 'Deck preview for ' + replaceName(this.$route.query.name as string),
                },
                {
                    property: 'og:title',
                    content: replaceName(this.$route.query.name as string),
                },
                {
                    property: 'og:description',
                    content: 'Deck preview for ' + replaceName(this.$route.query.name as string),
                }
            ],
        }
    },
    mounted() {
        generateSocialImage({ deck: this.$route.query.deck as string });
    }
})

export default class DeckPreview extends Vue {

    deckName: string = '';
    editingName: boolean = false;

    // Computed properties like this, are cached, so they are only calculated once.
    get allCards() {
        const set_list = [SET1DATA, SET2DATA, SET3DATA, SET4DATA, SET5DATA];
        let final: CardData = {};

        for (const set of set_list) {
            for (const card of set) {
                final[card.cardCode] = card;
            }
        }
        return final;
    }
    get deckCode(): string {
        return this.$route.query.deck as string;
    }
    get name(): string {
        return replaceName(this.$route.query.name as string);
    }
    get deck(): Deck {
        return getDeckFromCode(this.deckCode);
    }
    changeName(name: string) {
        this.$router.push({
            path: this.$route.path,
            query: {
                deck: this.deckCode,
                name: name,
            },
        });
        this.editingName = false;
    }
    getCardData(cardCode: string): any {
        return this.allCards[cardCode];
    }
    getCardUrl(id: string): string {
        return this.allCards[id].assets[0].gameAbsolutePath;
    }
}
</script>
<style lang="scss">
    .card-list-wrapper {
        display: flex;
        justify-content: center;
    }
    .card-list {
        display: flex;
        flex-wrap: wrap;
        box-shadow: inset 5px 5px 10px 3px rgba(0,0,0,0.4);
        max-width: 1800px;
    }
    .deck-name-box {
        box-shadow: inset 5px 5px 10px 3px rgba(0,0,0,0.4);
    }
</style>
