<template>
    <div class="deck-search">
        <input placeholder="Your Deckcode here" v-model="search_text" type="text" class="input is-large deck-search_input">
        <div class="tile is-ancestor">
            <div class="search-button-wrapper tile is-parent">
                <div
                    class="notification is-info has-text-centered tile is-child is-2"
                    @click="search"
                    :class="{'is-light': !inputIsValid}"
                >
                    <span class="title is-2">
                        <i class="fas fa-search"></i>
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { getDeckFromCode, Deck } from 'lor-deckcodes-ts';
import router from '@/router';

@Component
export default class DeckSearch extends Vue {
    search_text: string = '';
    get inputDeck(): Deck | null {
        try {
            return getDeckFromCode(this.search_text);
        }
        catch (e) {
            return null;
        }
    }
    get inputIsValid(): boolean {
        return Boolean(this.inputDeck);
    }
    onInput(e: any): void {
        this.search_text = e.target.innerText.replace(/\s+/g, '')
    }
    search(): void {
        if (this.inputIsValid) {
            router.push({path: '/deck/', query: {deck: this.search_text}});
        }
    }
}

</script>
<style lang="scss">
    .search-button-wrapper {
        display: flex;
        justify-content: center;
        margin: 10px;
    }
    .deck-search_input {
        text-align: center;
    }
</style>