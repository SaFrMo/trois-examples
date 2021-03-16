varying float n;
varying vec2 vUv;
uniform sampler2D voronoi;
uniform float uTime;

void main(){
    vec2 uv = vUv * 1.;
    uv.x += (sin(uTime * 0.001) * sin(uv.y * 30.))* 0.02;
    uv.y += (cos(uTime * 0.001) * cos(uv.x * 20.)) * 0.02;
    vec3 foam = texture2D(voronoi, fract(uv)).rgb;
    vec3 blue = vec3(0., 0.44, 0.75);
    vec3 final = foam + blue;
    gl_FragColor = vec4(final, 1.);
}