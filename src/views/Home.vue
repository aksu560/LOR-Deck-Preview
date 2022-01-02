<template>
    <div class="home">
        <div class="section">
            <deck-search/>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import DeckSearch from '@/components/DeckSearch.vue';

@Component({
    components: {
        DeckSearch
    },
})
export default class Home extends Vue {}
</script>
