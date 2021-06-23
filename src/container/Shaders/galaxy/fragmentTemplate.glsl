// precision mediump float;

varying vec3 vColor;
varying vec2 vUv;

uniform sampler2D uTexture;

void main () {
      vec4 textureColor = texture2D(uTexture,vUv); // return vec4

      float strenght = distance(gl_PointCoord,vec2(0.5));
      strenght = 1.0-strenght;
      strenght = pow(strenght,3.0);

      vec3 color = mix(vec3(0.0),vColor,strenght);

      vec4 fragColor = vec4(color,1.0);
      gl_FragColor = fragColor+textureColor;

}