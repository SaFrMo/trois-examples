<template>
    <Plane
        :rotation="{ x: Math.PI * -0.5 }"
        :scale="{ x: 100, y: 100 }"
        :width-segments="100"
        :height-segments="100"
    >
        <ShaderMaterial
            ref="shader"
            :fragment-shader="fragmentShader"
            :vertex-shader="vertexShader"
        >
            <Texture src="voronoi.png" uniform="voronoi" />
        </ShaderMaterial>
    </Plane>
</template>

<script>
import vertexShader from '../../shaders/ground.vert'
import fragmentShader from '../../shaders/ground.frag'
// import {TextureLoader}

export default {
    data() {
        return {
            fragmentShader,
            vertexShader,
            startTime: 0,
        }
    },
    mounted() {
        this.startTime = Date.now()
        this.update()
    },
    methods: {
        update() {
            this.$refs.shader.uniforms.uTime = {
                value: Date.now() - this.startTime,
            }
            requestAnimationFrame(this.update)
        },
        onLoad() {
            console.log('ready')
        },
    },
}
</script>