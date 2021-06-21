// uniform mat4 projectionMatrix;
// uniform mat4 viewMatrix;
// uniform mat4 modelMatrix;
// attribute vec2 uv;
// attribute vec3 position;


attribute float aRandom; // a for attribute
varying float vRandom; // v for varying
uniform vec2 uFrequency; // u for uniform
uniform float uTime;

varying vec2 vUV;
varying float vElevation;


void main(){

   // create plane
   vec4 modelPosition = modelMatrix * vec4(position,1.0);
   modelPosition.y += 0.20;

   float elevation = sin(modelPosition.x * uFrequency.x + uTime)*0.25;
   elevation += sin(modelPosition.y * uFrequency.y)*0.25;
   // elevation += aRandom*0.5;
   modelPosition.z = elevation;

   vec4 viewPosition = viewMatrix * modelPosition;
   vec4 projectionPosition = projectionMatrix *viewPosition;

   gl_Position = projectionPosition;

   // send data & Attribute to fragment
   vRandom = aRandom;
   vUV = uv;
   vElevation = elevation; 

}