<template>
    <Renderer ref="renderer" resize antialias orbit-ctrl>
        <Camera :position="{ x: 15, y: 20, z: 30 }" />
        <Scene> </Scene>

        <!-- <EffectComposer>
            <RenderPass />
            <UnrealBloomPass :strength="0.4" />
            <FXAAPass />
        </EffectComposer> -->
    </Renderer>
</template>

<script>
export default {}
</script>