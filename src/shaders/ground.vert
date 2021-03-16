varying vec2 vUv;
uniform float uTime;

float rand(vec2 n) { 
	return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453);
}

float noise(vec2 p){
	vec2 ip = floor(p);
	vec2 u = fract(p);
	u = u*u*(3.0-2.0*u);
	
	float res = mix(
		mix(rand(ip),rand(ip+vec2(1.0,0.0)),u.x),
		mix(rand(ip+vec2(0.0,1.0)),rand(ip+vec2(1.0,1.0)),u.x),u.y);
	return res*res;
}

void main(){
	vUv = uv;
	float amplitude = 
		sin(uTime * 0.001 + uv.x * 10.) + 
		sin(uTime * 0.003 + uv.x * 3.45) +
		sin(uTime * 0.001 + uv.x * 5.38 ) + 
		sin(uTime * 0.001 + uv.y * 10.) + 
		sin(uTime * 0.0006 + uv.y * 2.34);

    vec3 pos = position + normal * amplitude;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.);
}