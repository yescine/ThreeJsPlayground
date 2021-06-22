// uniform mat4 projectionMatrix;
// uniform mat4 viewMatrix;
// uniform mat4 modelMatrix;
// attribute vec2 uv;
// attribute vec3 position;

uniform float uElevation;
uniform vec2 wave;
uniform float uTime;

varying vec2 vUv;
varying float vElevation;


void main(){

   // create plane

   vec4 modelPosition = modelMatrix * vec4(position,1.0);
   float elevation = sin(uTime+modelPosition.x *wave.x)*sin(uTime+modelPosition.z *wave.y)*uElevation;
   modelPosition.y +=elevation;

   vec4 viewPosition = viewMatrix * modelPosition;
   vec4 projectionPosition = projectionMatrix *viewPosition;

   gl_Position = projectionPosition;

   // send data & Attribute to fragment
   vUv = uv;
   vElevation = elevation;

}