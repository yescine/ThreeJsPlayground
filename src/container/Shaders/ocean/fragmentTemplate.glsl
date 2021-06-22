// precision mediump float;

varying vec2 vUv;
uniform vec3 uSurfaceColor;
uniform vec3 uDepth;


void main () {

      gl_FragColor = vec4(uSurfaceColor, 1.0);
}