<template>
    <div class="ascii-terrain">
        <Renderer ref="renderer" resize orbit-ctrl>
            <Camera :position="{ x, y, z }" />
            <Scene>
                <Sphere :position="{ y: 5 }" />
                <Plane
                    :rotation="{ x: Math.PI * -0.5 }"
                    :scale="{ x: 40, y: 40 }"
                    :width-segments="100"
                    :height-segments="100"
                >
                    <ShaderMaterial
                        ref="shader"
                        :fragment-shader="fragmentShader"
                        :vertex-shader="vertexShader"
                    />
                </Plane>
            </Scene>
        </Renderer>
    </div>
</template>

<script>
import { AsciiEffect } from 'three/examples/jsm/effects/AsciiEffect' //'./jsm/effects/AsciiEffect.js';
import vertexShader from './shaders/ground.vert'
import fragmentShader from './shaders/ground.frag'

export default {
    data() {
        return {
            fragmentShader,
            vertexShader,
            x: -20.7062909015047047,
            y: 20.7581015041184327,
            z: -20.9359404778660516,
        }
    },
    async mounted() {
        const { three, renderer } = this.$refs.renderer
        const effect = new AsciiEffect(renderer, null, { invert: true })
        const { width, height } = three.size
        effect.setSize(width, height)
        three.renderer.domElement.parentElement.appendChild(effect.domElement)
        this.$refs.renderer.onBeforeRender(() => {
            effect.render(three.scene, three.camera)
        })
    },
}
</script>

<style lang="scss">
.ascii-terrain {
    height: 100%;
    canvas {
        opacity: 0;
        position: absolute;
    }
}
</style>
