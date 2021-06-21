precision mediump float;
varying float vRandom;

uniform vec3 uColor;

void main () {
      gl_FragColor = vec4(vRandom*uColor,0.9);
}