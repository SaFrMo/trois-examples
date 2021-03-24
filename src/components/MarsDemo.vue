<template>
    <Renderer ref="renderer" resize>
        <Camera ref="camera" :fov="11" :position="{ x: 1, y: 0.45, z: 5 }" />
        <Scene>
            <PointLight color="goldenrod" :position="{ y: 1, x: 5, z: 2 }" />
            <AmbientLight :intensity="0.1" />
            <Icosahedron :detail="15" ref="planet">
                <StandardMaterial>
                    <Texture src="/images/mars.jpg" />
                </StandardMaterial>
            </Icosahedron>
        </Scene>
        <EffectComposer>
            <RenderPass />
            <UnrealBloomPass :strength="0.3" />
            <FXAAPass />
        </EffectComposer>
    </Renderer>
</template>

<script>
import { tween } from 'popmotion'
import { Vector3 } from 'three'

export default {
    mounted() {
        this.$refs.renderer.three.onBeforeRender(this.update)
        tween({
            from: new Vector3(1, 0.45, 5),
            to: new Vector3(0.8, -0.1, 5),
            duration: 14000,
            flip: Infinity,
        }).start((v) => {
            if (this && this.$refs && this.$refs.camera) {
                this.$refs.camera.camera.position.set(v.x, v.y, v.z)
            }
        })
    },
    methods: {
        update() {
            this.$refs.planet.mesh.rotation.set(0, Date.now() * 0.00001, 0)
        },
    },
}
</script>