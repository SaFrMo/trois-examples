<template>
    <section class="gallery">
        <ul class="items">
            <li v-for="(cmp, i) in Object.keys($options.components)" :key="i">
                <component :is="cmp" />
            </li>
        </ul>
    </section>
</template>

<script>
import WindWakerWater from './components/WindWaker/WindWakerWater.vue'
export default {
    components: { WindWakerWater },
}
</script>

<style lang="scss">
body {
    margin: 0;
}

body,
html,
#app,
.app {
    height: 100%;
}

.gallery {
    .items {
        display: grid;
        grid-template-columns: repeat(3, 300px);
        grid-auto-rows: 170px;
        grid-gap: 40px;
        list-style-type: none;
        margin: 0;
        padding: 0;
        margin: 30px auto;
        justify-content: center;
        align-items: center;
    }
}
</style>
