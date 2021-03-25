<template>
    <Renderer ref="renderer" resize antialias orbit-ctrl>
        <!-- camera -->
        <Camera :position="{ z: 1 }" ref="camera" :near="0.2" :far="20" />

        <!-- scene -->
        <Scene background="tomato">
            <Box
                v-for="x in count"
                :key="x"
                :position="{ x: x - count * 0.5, z: -x }"
                :size="0.5"
                :onPointerEnter="setRed"
                :onPointerLeave="setBlue"
                pointer-objects
                @ready="boxReady($event, x)"
            >
                <BasicMaterial color="blue" ref="mat" />
            </Box>
        </Scene>
    </Renderer>
</template>

<script>
import { Color } from 'three'
const red = new Color('red')
const blue = new Color('blue')
import { tween } from 'popmotion'

export default {
    data() {
        return {
            count: 5,
        }
    },
    methods: {
        setRed({ object }) {
            object.material.color = red
        },
        setBlue({ object }) {
            object.material.color = blue
        },
        boxReady(box, x) {
            tween({
                from: -0.5,
                to: 0.5,
                duration: 900 + x * 50,
                flip: Infinity,
            }).start((v) => (box.mesh.position.y = v))
        },
    },
}
</script>