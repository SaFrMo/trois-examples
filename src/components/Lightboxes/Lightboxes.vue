<template>
    <Renderer ref="renderer" resize antialias orbit-ctrl>
        <Camera :position="{ y: height * -0.5, z: 10 }" ref="camera" />
        <Scene>
            <RectAreaLight
                v-for="i in rows * columns"
                :key="i"
                :position="{
                    x:
                        ((i % rows) - this.rows * 0.5) * xSpacer +
                        (Math.floor(-i / columns) % 2 ? xSpacer * 0.55 : 0),
                    z: Math.floor(-i / columns) * zSpacer + 40,
                }"
                helper
                :width="7"
                :height="height"
                :rotation="{ y: Math.PI }"
                :intensity="0.3"
            />
        </Scene>
        <EffectComposer>
            <RenderPass />
            <UnrealBloomPass :strength="1" />
            <!-- <HalftonePass :radius="1" :scatter="0" /> -->
            <FXAAPass />
        </EffectComposer>
    </Renderer>
</template>

<script>
import { Vector3 } from 'three'

export default {
    data() {
        return {
            rows: 10,
            columns: 10,
            xSpacer: 20,
            zSpacer: 40,
            height: 20,
        }
    },
    mounted() {
        this.$refs.camera.camera.lookAt(new Vector3(0, 20, -200))
    },
}
</script>