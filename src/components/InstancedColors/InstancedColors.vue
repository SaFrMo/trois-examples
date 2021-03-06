<template>
    <Renderer ref="renderer" resize>
        <Stats />

        <!-- camera -->
        <Camera :position="{ z: 15 }" ref="camera" :near="5" :far="20" />

        <!-- scene -->
        <Scene background="lightpink">
            <AmbientLight />
            <PointLight
                :position="{ x: 150, y: 150, z: 150 }"
                :intensity="0.55"
            />
            <InstancedMesh
                :count="count"
                ref="box"
                @created="ready"
                @pointerMove="onPointerMove"
                @pointerLeave="onPointerLeave"
            >
                <BoxGeometry :size="0.7" />
                <PhongMaterial />
            </InstancedMesh>
        </Scene>

        <!-- effect composer -->
        <EffectComposer>
            <RenderPass />
            <SSAOPass :options="{ kernelRadius: 0.2, maxDistance: 0.03 }" />
            <UnrealBloomPass :strength="1" :threshold="0.99" />
            <FXAAPass />
        </EffectComposer>
    </Renderer>
</template>

<script>
// this is a port of an excellent react-three-fiber demo: https://codesandbox.io/embed/r3f-instanced-colors-8fo01
import { Object3D, Color } from 'three'
import niceColors from 'nice-color-palettes'
import Stats from '../../../trois-edge/src/components/misc/Stats'

const height = 10,
    width = 10,
    depth = 10
const count = height * width * depth

const colors = new Array(count)
    .fill()
    .map(() => niceColors[17][Math.floor(Math.random() * 5)])

const dummy = new Object3D()
const color = new Color()

export default {
    setup() {
        return {
            count,
            colors,
            startTime: Date.now(),
            selected: null,
        }
    },
    components: {
        Stats,
    },
    methods: {
        ready(mesh) {
            let i = 0
            for (let x = 0; x < width; x++) {
                for (let y = 0; y < height; y++) {
                    for (let z = 0; z < depth; z++) {
                        mesh.setColorAt(i, color.set(colors[i]))
                        i++
                    }
                }
            }
            this.$refs.renderer.onBeforeRender(this.render)
        },
        render() {
            const { mesh } = this.$refs.box
            const time = (Date.now() - this.startTime) * 0.001
            // rotate full box
            mesh.rotation.x = Math.sin(time / 4)
            mesh.rotation.y = Math.sin(time / 2)
            // rotate individual boxes
            let i = 0
            for (let x = 0; x < width; x++) {
                for (let y = 0; y < height; y++) {
                    for (let z = 0; z < depth; z++) {
                        // position
                        dummy.position.set(
                            width * 0.5 - x,
                            height * 0.5 - y,
                            depth * 0.5 - z
                        )
                        // rotation
                        dummy.rotation.y =
                            Math.sin(x * 0.25 + time) +
                            Math.sin(y * 0.25 + time) +
                            Math.sin(z * 0.25 + time)
                        dummy.rotation.z = dummy.rotation.y * 2
                        // scale
                        const scale = i === this.selected ? 2 : 1
                        dummy.scale.set(scale, scale, scale)
                        // set matrix
                        dummy.updateMatrix()
                        mesh.setMatrixAt(i, dummy.matrix)
                        // set color
                        mesh.setColorAt(
                            i,
                            color.set(
                                i === this.selected ? 'white' : this.colors[i]
                            )
                        )
                        i++
                    }
                }
            }
            mesh.instanceMatrix.needsUpdate = true
            mesh.instanceColor.needsUpdate = true
        },
        onPointerMove({ intersect }) {
            this.selected = intersect.instanceId
        },
        onPointerLeave() {
            this.selected = null
        },
    },
}
</script>
