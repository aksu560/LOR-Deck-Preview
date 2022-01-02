<template>
    <div :id="id" class="lor_card">
        <div class="card-image-container">
            <img v-for="img in count" :key="img" :src="cardUrl" :style="getCardPositionStyle(img)"
                class="image card-image"
            >
        </div>
    </div>
</template>

<script lang="ts">
import {Component, Vue } from 'vue-property-decorator';

const CardProps = Vue.extend({
    props: {
        id: String,
        count: Number,
        cardName: String,
        region: String,
        set: String,
        cardUrl: String,
    }
});

@Component
export default class Card extends CardProps {

    getCardPositionStyle(index: number): string {
        let offset = index * 15;
        if (offset === 0) {
            return '';
        }
        return "position:absolute;top: " + String(offset) + "px;";
    }

}
</script>
<style lang="scss">
    .card-image-container {
        height: 200px;
        position: relative;
        margin-bottom: 50%;
    }
</style>