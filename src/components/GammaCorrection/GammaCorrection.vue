<template>
    <Renderer ref="renderer" resize shadow orbit-ctrl>
        <!-- camera -->
        <Camera
            :position="{ z: 70 }"
            :fov="75"
            ref="camera"
            :near="10"
            :far="150"
        />

        <!-- scene -->
        <Scene background="#f0f0f0">
            <AmbientLight :intensity="1.5" />
            <PointLight
                :position="{ x: 100, y: 100, z: 100 }"
                :intensity="2"
                cast-shadow
            />
            <PointLight
                :position="{ x: -100, y: -100, z: -100 }"
                :intensity="5"
                cast-shadow
                color="red"
            />

            <Box :size="20"><PhongMaterial /></Box>
            <!-- <InstancedMesh
                :count="count"
                ref="box"
                @created="ready"
                @pointerMove="onPointerMove"
                @pointerLeave="onPointerLeave"
            >
                <BoxGeometry :size="0.7" />
                <PhongMaterial />
            </InstancedMesh> -->
        </Scene>

        <!-- effect composer -->
        <!-- <EffectComposer>
            <RenderPass />
            <SSAOPass :options="{ kernelRadius: 0.2, maxDistance: 0.03 }" />
            <UnrealBloomPass :strength="1" :threshold="0.99" />
            <FXAAPass />
        </EffectComposer> -->
    </Renderer>
</template>

<script>
// this is a port of another incredible react-three-fiber demo: https://codesandbox.io/embed/r3f-gamma-correction-kmb9i
import { Object3D, Color } from 'three'

export default {
    setup() {
        return {}
    },
    methods: {
        ready(mesh) {
            // let i = 0
            // for (let x = 0; x < width; x++) {
            //     for (let y = 0; y < height; y++) {
            //         for (let z = 0; z < depth; z++) {
            //             mesh.setColorAt(i, color.set(colors[i]))
            //             i++
            //         }
            //     }
            // }
            // this.$refs.renderer.onBeforeRender(this.render)
        },
        render() {
            // const { mesh } = this.$refs.box
            // const time = (Date.now() - this.startTime) * 0.001
            // // rotate full box
            // mesh.rotation.x = Math.sin(time / 4)
            // mesh.rotation.y = Math.sin(time / 2)
            // // rotate individual boxes
            // let i = 0
            // for (let x = 0; x < width; x++) {
            //     for (let y = 0; y < height; y++) {
            //         for (let z = 0; z < depth; z++) {
            //             // position
            //             dummy.position.set(
            //                 width * 0.5 - x,
            //                 height * 0.5 - y,
            //                 depth * 0.5 - z
            //             )
            //             // rotation
            //             dummy.rotation.y =
            //                 Math.sin(x * 0.25 + time) +
            //                 Math.sin(y * 0.25 + time) +
            //                 Math.sin(z * 0.25 + time)
            //             dummy.rotation.z = dummy.rotation.y * 2
            //             // scale
            //             const scale = i === this.selected ? 2 : 1
            //             dummy.scale.set(scale, scale, scale)
            //             // set matrix
            //             dummy.updateMatrix()
            //             mesh.setMatrixAt(i, dummy.matrix)
            //             // set color
            //             mesh.setColorAt(
            //                 i,
            //                 color.set(
            //                     i === this.selected ? 'white' : this.colors[i]
            //                 )
            //             )
            //             i++
            //         }
            //     }
            // }
            // mesh.instanceMatrix.needsUpdate = true
            // mesh.instanceColor.needsUpdate = true
        },
    },
}
</script>
