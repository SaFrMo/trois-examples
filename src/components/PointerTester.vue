<template>
    <Renderer ref="renderer" resize antialias orbit-ctrl>
        <!-- camera -->
        <Camera :position="{ z: 2 }" ref="camera" :near="0.2" :far="20" />

        <!-- scene -->
        <Scene background="tomato">
            <Box
                v-for="x in count"
                :key="x"
                :position="{ x: x - count * 0.5 }"
                :size="0.5"
                :onPointerEnter="setRed"
                :onPointerLeave="setBlue"
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
    },
}
</script>