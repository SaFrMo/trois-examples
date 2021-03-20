<template>
    <Renderer ref="renderer" resize antialias orbit-ctrl>
        <Camera :position="{ z: 250 }" ref="camera" />
        <Scene>
            <AmbientLight :intensity="0.5" />
            <PointLight
                :position="{ x: -150, y: 100, z: 200 }"
                :intensity="0.8"
            />
            <InstancedMesh :count="count" @ready="ready">
                <BoxGeometry :size="8" />
                <PhongMaterial />
            </InstancedMesh>
        </Scene>
    </Renderer>
</template>

<script>
// lots of this is lifted from a react-three-fiber demo: https://codesandbox.io/embed/r3f-instanced-colors-8fo01
import { Object3D, MathUtils, Color } from 'three'
import niceColors from 'nice-color-palettes'

const height = 10,
    width = 10,
    depth = 10
const count = height * width * depth
const colors = new Array(count)
    .fill()
    .map(() => niceColors[17][Math.floor(Math.random() * 5)])
const { randFloat: rnd, randFloatSpread: rndFS } = MathUtils

export default {
    data() {
        return {
            colors,
            count,
            startTime: Date.now(),
        }
    },
    methods: {
        ready(box) {
            const { mesh } = box

            const blank = new Object3D()
            const color = new Color()
            const spacer = 15

            let i = 0
            const xOffset = spacer * width * 0.5
            const yOffset = spacer * height * 0.5
            const zOffset = spacer * depth * 0.5
            for (let x = 0; x < width; x++) {
                for (let y = 0; y < height; y++) {
                    for (let z = 0; z < depth; z++) {
                        blank.position.set(
                            x * spacer - xOffset,
                            y * spacer - yOffset,
                            z * spacer - zOffset
                        )
                        blank.updateMatrix()
                        mesh.setMatrixAt(i, blank.matrix)
                        mesh.setColorAt(i, color.set(colors[i]))

                        i++
                    }
                }
            }

            mesh.instanceMatrix.needsUpdate = true

            this.render(box)
        },
        render(box) {
            const { mesh } = box
            const time = (Date.now() - this.startTime) * 0.001

            // rotate full box
            mesh.rotation.x = Math.sin(time / 4)
            mesh.rotation.y = Math.sin(time / 2)

            // let i = 0
            // for (let x = 0; x < 10; x++)
            //     for (let y = 0; y < 10; y++)
            //         for (let z = 0; z < 10; z++) {
            //             const id = i++
            //             tempObject.position.set(5 - x, 5 - y, 5 - z)
            //             tempObject.rotation.y =
            //                 Math.sin(x / 4 + time) +
            //                 Math.sin(y / 4 + time) +
            //                 Math.sin(z / 4 + time)
            //             tempObject.rotation.z = tempObject.rotation.y * 2
            //             if (hovered !== previous.current) {
            //                 tempColor
            //                     .set(id === hovered ? 'white' : colors[id])
            //                     .toArray(colorArray, id * 3)
            //                 ref.current.geometry.attributes.color.needsUpdate = true
            //             }
            //             const scale = id === hovered ? 2 : 1
            //             tempObject.scale.set(scale, scale, scale)
            //             tempObject.updateMatrix()
            //             ref.current.setMatrixAt(id, tempObject.matrix)
            //         }
            // ref.current.instanceMatrix.needsUpdate = true

            requestAnimationFrame(() => this.render(box))
        },
    },
}
</script>