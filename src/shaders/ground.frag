varying float n;
varying vec2 vUv;
uniform sampler2D voronoi;

void main(){
    gl_FragColor = texture2D(voronoi, vUv);
}