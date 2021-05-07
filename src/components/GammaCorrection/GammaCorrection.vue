<template>
    <Renderer ref="renderer" resize shadow>
        <!-- camera -->
        <Camera
            :position="{ z: 70 }"
            :fov="75"
            ref="camera"
            :near="10"
            :far="150"
        />

        <!-- scene -->
        <Scene background="#f0f0f0">
            <AmbientLight :intensity="0.98" />
            <PointLight
                :position="{ x: 100, y: 100, z: 100 }"
                :intensity="2"
                cast-shadow
                :shadow-map-size="{ width: 1024, height: 1024 }"
            />
            <PointLight
                :position="{ x: -100, y: -100, z: -100 }"
                :intensity="5"
                color="red"
            />

            <InstancedMesh
                :count="count"
                ref="cloud"
                @created="ready"
                cast-shadow
                receive-shadow
            >
                <SphereGeometry
                    :radius="1"
                    :width-segments="32"
                    :height-segments="32"
                />
                <PhongMaterial />
            </InstancedMesh>
            <!-- <InstancedMesh
                :count="count"
                ref="box"
                @created="ready"
                @pointerMove="onPointerMove"
                @pointerLeave="onPointerLeave"
            >
                <BoxGeometry :size="0.7" />
                <PhongMaterial />
            </InstancedMesh> -->
        </Scene>

        <!-- effect composer -->
        <EffectComposer>
            <RenderPass />
            <!-- <CustomPass :method="NormalPass" :options="normalOptions" /> -->
            <!-- <CustomEffect :method="SSAOEffect" :options="ssaoOptions" /> -->
            <CustomEffect :method="PixelationEffect" />
            <!-- <SSAOPass
                :options="{
                    samples: 31,
                    radius: 20,
                    intensity: 40,
                    luminanceInfluence: 0.1,
                }"
            /> -->
        </EffectComposer>
    </Renderer>
</template>

<script>
// this is a port of another incredible react-three-fiber demo: https://codesandbox.io/embed/r3f-gamma-correction-kmb9i
import { Object3D } from 'three'
const dummy = new Object3D()
import { SSAOEffect, NormalPass, PixelationEffect } from 'postprocessing'

export default {
    setup() {
        return {
            count: 150,
            particles: [],
        }
    },
    computed: {
        normalOptions() {
            return ['scene', 'camera']
        },
        ssaoOptions() {
            return [
                'camera',
                'previous-texture',
                {
                    samples: 31,
                    rings: 4,
                    distanceThreshold: 1.0,
                    distanceFalloff: 0.0,
                    rangeThreshold: 0.5,
                    rangeFalloff: 0.1,
                    luminanceInfluence: 100,
                    radius: 0.1,
                    // scale: 0.5,
                    bias: 0.5,
                    intensity: 0.1,
                    // samples={31} radius={20} intensity={40} luminanceInfluence={0.1}
                },
            ]
        },
    },
    methods: {
        SSAOEffect,
        NormalPass,
        PixelationEffect,
        ready() {
            for (let i = 0; i < this.count; i++) {
                const t = Math.random() * 100
                const factor = 20 + Math.random() * 100
                const speed = 0.01 + Math.random() / 200
                const xFactor = -20 + Math.random() * 40
                const yFactor = -20 + Math.random() * 40
                const zFactor = -20 + Math.random() * 40
                this.particles.push({
                    t,
                    factor,
                    speed,
                    xFactor,
                    yFactor,
                    zFactor,
                    mx: 0,
                    my: 0,
                })
            }

            this.$refs.renderer.onBeforeRender(this.render)
        },
        render() {
            const { mesh } = this.$refs.cloud
            this.particles.forEach((particle, i) => {
                let { t, factor, speed, xFactor, yFactor, zFactor } = particle
                t = particle.t += speed / 2
                const a = Math.cos(t) + Math.sin(t * 1) / 10
                const b = Math.sin(t) + Math.cos(t * 2) / 10
                const s = Math.max(1.5, Math.cos(t) * 5)
                particle.mx += 0
                // (state.mouse.x * state.viewport.width - particle.mx) * 0.02
                particle.my += 0
                //(state.mouse.y * state.viewport.height - particle.my) * 0.02
                dummy.position.set(
                    (particle.mx / 10) * a +
                        xFactor +
                        Math.cos((t / 10) * factor) +
                        (Math.sin(t * 1) * factor) / 10,
                    (particle.my / 10) * b +
                        yFactor +
                        Math.sin((t / 10) * factor) +
                        (Math.cos(t * 2) * factor) / 10,
                    (particle.my / 10) * b +
                        zFactor +
                        Math.cos((t / 10) * factor) +
                        (Math.sin(t * 3) * factor) / 10
                )
                dummy.scale.set(s, s, s)
                dummy.updateMatrix()
                mesh.setMatrixAt(i, dummy.matrix)
            })
            mesh.instanceMatrix.needsUpdate = true
        },
    },
}
</script>
