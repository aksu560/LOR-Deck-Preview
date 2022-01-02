<template>
    <div id="app">
        <Navbar/>
        <router-view/>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Navbar from './components/Navbar.vue';

function getOGImage(deckCode: string) {
    if (deckCode) {
        let url = `https://storage.googleapis.com/lor-preview.appspot.com/OpenGraphThumbnails/${deckCode}.jpg`
        return url;
    }
    return '';
}

export default Vue.extend({
    name: 'App',
    components: {
        Navbar
    },
    metaInfo() {
        return {
            title: 'Legends of Runeterra Deck Preview',
            meta: [
                {
                    name: 'description',
                    content: 'Legends of Runeterra Deck Preview'
                },
                {
                    property: 'og:title',
                    content: 'Legends of Runeterra Deck Preview'
                },
                {
                    property: 'og:url',
                    content: window.location.href,
                },
                {
                    property: 'og:type',
                    content: 'website',
                },
                {
                    property: 'og:image',
                    content: getOGImage(this.$route.query.deck as string),
                },
                {
                    property: 'og:image:secure_url',
                    content: getOGImage(this.$route.query.deck as string),
                },
                {
                    property: 'og:image:width',
                    content: '1800',
                },
                {
                    property: 'og:image:type',
                    content: 'image/jpeg',
                },
            ]
        }
    }
});
</script>
