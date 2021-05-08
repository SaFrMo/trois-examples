<template>
    <Renderer ref="renderer" resize shadow>
        <Camera ref="camera" :fov="11" :position="cameraPos" />
        <Scene>
            <!-- lights -->
            <PointLight
                cast-shadow
                color="goldenrod"
                :position="{ x: 4, y: 2, z: 2 }"
                ref="sun"
            />
            <AmbientLight :intensity="0.1" />

            <!-- planet -->
            <Icosahedron :detail="15" ref="planet" cast-shadow receive-shadow>
                <StandardMaterial>
                    <Texture src="/images/mars.jpg" />
                </StandardMaterial>
            </Icosahedron>

            <!-- square -->
            <!-- revolves around planet -->
            <Group ref="container">
                <Box
                    ref="box"
                    :position="{ x: 1.2 }"
                    :size="0.05"
                    cast-shadow
                    receive-shadow
                >
                    <StandardMaterial />
                </Box>
            </Group>
        </Scene>
        <EffectComposer>
            <RenderPass />
            <UnrealBloomPass :strength="0.3" />
            <FXAAPass />
        </EffectComposer>
    </Renderer>
</template>

<script>
import { Vector2, Vector3, Object3D } from 'three'
const body = new Object3D()
const up = new Vector3(0, 1, 0)

export default {
    data() {
        return {
            cameraPos: new Vector3(1, 0.45, 5), //0, 0.45, 15),
        }
    },
    mounted() {
        this.$refs.container.o3d.rotation.z = 0.4
        this.$refs.container.o3d.rotation.y = -0.5
        this.$refs.container.o3d.rotation.order = 'ZYX'

        // adjust shadow
        const sun = this.$refs.sun.light
        sun.shadow.camera.near = 1
        sun.shadow.camera.far = 5
        if (sun.shadow.map) {
            sun.shadow.map.dispose()
        }
        sun.shadow.map = null
        sun.shadow.mapSize = new Vector2(2048, 2048)

        // update
        this.$refs.renderer.onBeforeRender(this.update)
    },
    methods: {
        update() {
            const now = Date.now()

            // rotate planet
            this.$refs.planet.mesh.rotation.set(0, now * 0.00001, 0)

            // revolve box
            this.$refs.container.o3d.rotation.y = now * 0.001
        },
    },
}
</script>