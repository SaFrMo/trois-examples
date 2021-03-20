<template>
    <Renderer ref="renderer" resize antialias orbit-ctrl>
        <Camera :position="{ x: 15, y: 20, z: 30 }" />
        <Scene>
            <PointLight />
            <InstancedMesh ref="imesh" :count="count" @ready="onReady">
                <SphereGeometry :radius="5" />
                <PhongMaterial />
            </InstancedMesh>
        </Scene>
    </Renderer>
</template>

<script>
// lots of this is lifted from a react-three-fiber demo: https://codesandbox.io/embed/r3f-instanced-colors-8fo01
import { Object3D, MathUtils, Color } from 'three'
import niceColors from 'nice-color-palettes'

const count = 1000
const colors = new Array(count)
    .fill()
    .map(() => niceColors[17][Math.floor(Math.random() * 5)])
const { randFloat: rnd, randFloatSpread: rndFS } = MathUtils

export default {
    data() {
        return {
            colors,
            count,
        }
    },
    mounted() {
        console.log('mounted', this.$refs.imesh.material)
    },
    methods: {
        onReady({ mesh: imesh }) {
            console.log('ready', imesh.material)
            const dummy = new Object3D()
            const color = new Color()

            for (let i = 0; i < count; i++) {
                dummy.position.set(rndFS(200), rndFS(200), rndFS(200))
                const scale = rnd(0.2, 1)
                dummy.scale.set(scale, scale, scale)
                dummy.updateMatrix()
                imesh.setMatrixAt(i, dummy.matrix)

                imesh.setColorAt(i, color.set(colors[i]))
            }
        },
    },
}
</script>