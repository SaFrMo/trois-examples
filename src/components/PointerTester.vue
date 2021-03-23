<template>
    <Renderer ref="renderer" resize antialias orbit-ctrl>
        <!-- camera -->
        <Camera
            :position="{ x: 2, y: 2, z: 8 }"
            ref="camera"
            :near="5"
            :far="20"
        />

        <!-- scene -->
        <Scene background="tomato">
            <Box />
        </Scene>

        <!-- effect composer -->
        <EffectComposer>
            <RenderPass />
            <UnrealBloomPass :strength="0.3" :threshold="0.99" />
            <FXAAPass />
        </EffectComposer>
    </Renderer>
</template>