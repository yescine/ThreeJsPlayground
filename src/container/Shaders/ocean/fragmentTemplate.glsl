// precision mediump float;

varying vec2 vUv;
varying float vElevation;

uniform vec3 uSurfaceColor;
uniform vec3 uDepthColor;


void main () {
      vec3 Color = mix(uSurfaceColor,uDepthColor,vElevation);

      gl_FragColor = vec4(Color, 1.0);
}