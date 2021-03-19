<template>
    <Renderer ref="renderer" resize antialias orbit-ctrl>
        <Camera :position="{ x: 15, y: 20, z: 30 }" />
        <Scene>
            <!-- lights -->
            <RectAreaLight
                helper
                :rotation="{ y: Math.PI }"
                :width="4"
                :height="height"
                v-for="(item, i) in grid.x * grid.y"
                :key="i"
                :position="{
                    x:
                        (i % grid.x) * spacer.x +
                        (Math.floor(i / grid.y) % 2 ? spacer.x * 0.5 : 0) -
                        spacer.x * grid.x * 0.5,
                    z: Math.floor(i / grid.y) * -spacer.y,
                }"
                :ref="setItemRef"
            />

            <!-- ground -->
            <Plane
                :position="{ y: -height * 0.5 }"
                :rotation="{ x: -Math.PI * 0.5 }"
                :scale="{ x: 300, y: 300 }"
            >
                <StandardMaterial color="#ff0000" :roughness="0.2" />
            </Plane>
        </Scene>

        <EffectComposer>
            <RenderPass />
            <UnrealBloomPass :strength="0.4" />
            <FXAAPass />
        </EffectComposer>
    </Renderer>
</template>

<script>
import { Vector2 } from 'three'
import { tween, chain, delay } from 'popmotion'

export default {
    data() {
        return {
            height: 8,
            grid: new Vector2(4, 4),
            spacer: new Vector2(10, 10),
            lights: [],
        }
    },
    mounted() {
        this.lights.forEach((l) => (l.intensity = 0))
        for (let i = 0; i < this.grid.x * this.grid.y; i++) {
            chain(
                delay((i + 1) * 300),
                tween({
                    from: 0.1,
                    to: 1,
                    duration: 1000,
                    flip: Infinity,
                })
            ).start((v) => {
                if (this.lights[i]) {
                    this.lights[i].intensity = v || 0
                }
            })
        }
    },
    methods: {
        setItemRef(el) {
            if (el) {
                this.lights.push(el.light)
            }
        },
    },
}
</script>