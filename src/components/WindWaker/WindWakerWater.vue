<template>
    <Renderer ref="renderer" mouse-over click resize antialias orbit-ctrl>
        <Camera :position="{ y: 25, z: 30 }" />
        <Scene>
            <PointLight :position="{ y: 50, z: 50 }" />
            <Ground />
        </Scene>
    </Renderer>
</template>

<script>
import Ground from './Ground.vue'
export default {
    components: { Ground },
}
</script>