// precision mediump float;
varying float vRandom;

uniform vec3 uColor;
uniform sampler2D uTexture;

varying vec2 vUV;
varying float vElevation;


void main () {
      vec4 textureColor = texture2D(uTexture,vUV); // return vec4
      // textureColor.xyz *= vElevation;
      gl_FragColor = vec4(vRandom*uColor,0.9);
}