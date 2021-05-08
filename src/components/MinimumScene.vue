<template>
    <Renderer ref="renderer" resize antialias orbit-ctrl>
        <Camera :position="{ x: 2, y: 2, z: 2 }" />
        <Scene>
            <!-- replace with your scene and get started! -->
            <Box />
        </Scene>
    </Renderer>
</template>

