<template>
    <section class="gallery">
        <ul class="items">
            <li
                v-for="(cmp, i) in Object.keys($options.components)"
                :key="i"
                class="single-item"
            >
                <button @click="selected = cmp">
                    <component :is="cmp" />
                </button>
            </li>
        </ul>

        <div v-if="selected" class="selected">
            <button @click="selected = ''" aria-label="Close."></button>
            <component :is="selected" class="canvas" />
        </div>
    </section>
</template>

<script>
import WindWakerWater from './components/WindWaker/WindWakerWater.vue'
import Lightboxes from './components/Lightboxes/Lightboxes.vue'
import InstancedColors from './components/InstancedColors/InstancedColors.vue'
import AsciiTerrain from './components/AsciiTerrain/AsciiTerrain.vue'
import MarsDemo from './components/MarsDemo.vue'
import GammaCorrection from './components/GammaCorrection/GammaCorrection.vue'

export default {
    components: {
        WindWakerWater,
        Lightboxes,
        InstancedColors,
        MarsDemo,
        // AsciiTerrain,
        // GammaCorrection
    },
    data() {
        return {
            selected: '',
        }
    },
    mounted() {
        window.addEventListener('keydown', (evt) => {
            if (evt.code === 'Escape') {
                this.selected = ''
            }
        })
    },
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
        grid-gap: 40px;
        list-style-type: none;
        margin: 0;
        padding: 0;
        margin: 40px auto;
        justify-content: center;
        align-items: center;

        @media (max-width: 1100px) {
            grid-template-columns: repeat(2, 300px);
        }
        @media (max-width: 700px) {
            grid-template-columns: 300px;
        }

        .single-item {
            height: 100%;
        }
    }
    .selected {
        position: fixed;
        top: 30px;
        right: 30px;
        bottom: 30px;
        left: 30px;
        // width: 100%;
        background: white;

        button {
            position: fixed;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            width: 100%;
        }
        .canvas {
            position: relative;
        }
    }
    button {
        -webkit-appearance: none;
        border: none;
        background: none;
        cursor: pointer;
        width: 100%;
        height: 100%;
        position: relative;
        display: block;
    }
}
</style>
