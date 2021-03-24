<template>
    <Renderer ref="renderer" resize antialias orbit-ctrl>
        <!-- camera -->
        <Camera :position="{ z: 2 }" ref="camera" :near="0.2" :far="20" />

        <!-- scene -->
        <Scene background="tomato">
            <Box :onPointerEnter="onPointerEnter">
                <BasicMaterial :color="color" ref="mat" />
            </Box>
        </Scene>

        <!-- effect composer -->
        <EffectComposer>
            <RenderPass />
            <UnrealBloomPass :strength="0.3" :threshold="0.6" />
            <FXAAPass />
        </EffectComposer>
    </Renderer>
</template>

<script>
export default {
    data() {
        return {
            color: 'blue',
        }
    },
    methods: {
        onPointerEnter(evt) {
            this.color = 'red'
        },
    },
}
</script>