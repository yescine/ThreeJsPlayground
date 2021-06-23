// uniform mat4 projectionMatrix;
// uniform mat4 viewMatrix;
// uniform mat4 modelMatrix;
// attribute vec2 uv;
// attribute vec3 position;

attribute float aScales;
attribute vec3 aRandomness;

uniform float uSize;
uniform float uTime;

varying vec3 vColor;
varying vec2 vUv;


void main(){

   // create plane
   vec4 modelPosition = modelMatrix * vec4(position,1.0);
   // spin
   float angle = atan(modelPosition.x,modelPosition.z);
   float distanceToCenter = distance(modelPosition.xz,vec2(0.0));
   float angleOffset = (1.0/distanceToCenter)*uTime*0.3;
   angle+=angleOffset;

   modelPosition.x = cos(angle)*distanceToCenter;
   modelPosition.z = sin(angle)*distanceToCenter;

   // randomness
   modelPosition.xyz += aRandomness;
   modelPosition.y+=(1.0*uTime)/(100.0*(distanceToCenter));

   vec4 viewPosition = viewMatrix * modelPosition;
   vec4 projectionPosition = projectionMatrix *viewPosition;

   gl_Position = projectionPosition;
   gl_PointSize = uSize*aScales;
   gl_PointSize *= (1.0/-viewPosition.z);

   // send data & Attribute to fragment
   vColor = color;
   vUv = uv;

}