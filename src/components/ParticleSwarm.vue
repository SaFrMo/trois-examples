<template>
    <div class="particle-swarm-wrap">
        <Renderer
            ref="renderer"
            resize
            antialias
            pointer
            class="particle-swarm"
            alpha
        >
            <Camera :fov="75" :position="{ z: 70 }" ref="camera" />
            <Scene>
                <!-- scene lights -->
                <PointLight :intensity="1.4" color="white" />
                <SpotLight
                    :intensity="1.6"
                    :position="{ x: 70, y: 70, z: 70 }"
                    :penumbra="0.2"
                    color="white"
                />

                <!-- mesh lights -->
                <PointLight
                    :distance="120"
                    :intensity="0.8"
                    color="lightblue"
                    ref="light"
                />

                <InstancedMesh ref="mesh" :count="count">
                    <DodecahedronGeometry />
                    <StandardMaterial color="black" />
                </InstancedMesh>
            </Scene>

            <EffectComposer>
                <RenderPass />
                <UnrealBloomPass :strength="3" :radius="1" />
            </EffectComposer>
        </Renderer>
    </div>
</template>

<script>
import { Object3D } from 'three'

const count = 10000

export default {
    data() {
        return {
            count,

            // non-reactive:
            // particles
            // placer
        }
    },
    mounted() {
        // initialize particles
        const temp = []
        for (let i = 0; i < count; i++) {
            const t = Math.random() * 100
            const factor = 20 + Math.random() * 100
            const speed = 0.01 + Math.random() / 200
            const xFactor = -50 + Math.random() * 100
            const yFactor = -50 + Math.random() * 100
            const zFactor = -50 + Math.random() * 100
            temp.push({
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
        this.particles = temp
        this.placer = new Object3D()

        // update loop
        this.$refs.renderer.onBeforeRender(this.update)
        // console.log(this.$refs.light)
    },
    methods: {
        update() {
            const mouse = this.$refs.renderer.three.pointer.positionN
            const { mesh } = this.$refs.mesh

            this.$refs.light.light.position.set(
                mouse.x * 150,
                mouse.y * 100,
                this.$refs.light.light.position.z
            )

            this.particles.forEach((particle, i) => {
                let { t, factor, speed, xFactor, yFactor, zFactor } = particle
                // There is no sense or reason to any of this, just messing around with trigonometric functions
                t = particle.t += speed / 2
                const a = Math.cos(t) + Math.sin(t * 1) / 10
                const b = Math.sin(t) + Math.cos(t * 2) / 10
                const s = Math.cos(t)
                particle.mx += mouse.x * particle.mx * 0.01
                particle.my += mouse.y * particle.my * 0.01
                // Update the dummy object
                this.placer.position.set(
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
                this.placer.scale.set(s, s, s)
                this.placer.rotation.set(s * 5, s * 5, s * 5)
                this.placer.updateMatrix()
                // And apply the matrix to the instanced item
                mesh.setMatrixAt(i, this.placer.matrix)
            })
            mesh.instanceMatrix.needsUpdate = true

            this.$refs.camera.camera.position.z =
                55 + Math.sin(Date.now() * 0.001) * 20
        },
    },
}
</script>

<style lang="scss">
.particle-swarm-wrap {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    height: 100%;
    width: 100%;

    background: radial-gradient(
        at 50% 70%,
        #200f20 40%,
        #090b1f 80%,
        #050523 100%
    );
}
</style>