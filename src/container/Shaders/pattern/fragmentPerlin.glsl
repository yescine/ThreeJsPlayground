// precision mediump float;
#define Pi 3.141592653 
varying vec2 vUv;

float random (vec2 st){
      return fract(sin(dot(st.xy,vec2(12.9898,78.233)))*43758.5453123);
}

vec2 rotateUV(vec2 uv, float rotation, vec2 mid)
{
    return vec2(
      cos(rotation) * (uv.x - mid.x) + sin(rotation) * (uv.y - mid.y) + mid.x,
      cos(rotation) * (uv.y - mid.y) - sin(rotation) * (uv.x - mid.x) + mid.y
    );
}

void main () {
      float strength = vUv.x;
      gl_FragColor = vec4(vec3(strength),1); // a parametric function of x and y
}