<template>
    <Renderer ref="renderer" resize>
        <Camera fov="11" :position="{ x: 1, y: 0.45, z: 5 }" />
        <Scene>
            <PointLight color="goldenrod" :position="{ y: 1, x: 5, z: 2 }" />
            <AmbientLight intensity="0.1" />
            <Icosahedron detail="10" ref="planet">
                <StandardMaterial>
                    <Texture src="/images/mars.jpg" />
                </StandardMaterial>
            </Icosahedron>
        </Scene>
        <EffectComposer>
            <RenderPass />
            <UnrealBloomPass :strength="0.25" />
            <FXAAPass />
        </EffectComposer>
    </Renderer>
</template>

<script>
export default {
    mounted() {
        this.$refs.renderer.three.onBeforeRender(this.update)
    },
    methods: {
        update() {
            this.$refs.planet.mesh.rotation.set(0, Date.now() * 0.00001, 0)
        },
    },
}
</script>