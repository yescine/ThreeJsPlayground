uniform mat4 projectionMatrix;
uniform mat4 viewMatrix;
uniform mat4 modelMatrix;

attribute vec3 position;
attribute float aRandom; // a for attribute
varying float vRandom; // v for varying
uniform vec2 uFrequency; // u for uniform
uniform float uTime;


float lorem (float w) {
   float q =1.0 +w;
   return q;
}

void main(){

   // -- tutoriel
   float fooBar = 0.25;
   int dat = 2;
   float c = float(dat) + fooBar;
   vec2 point = vec2(1.0,c);
   point.x = 2.0;
   vec3 bar = vec3(point,lorem(2.2));

   // create plane
   vec4 modelPosition = modelMatrix * vec4(position,1.0);
   modelPosition.y += 0.20;
   modelPosition.z += 1.0+ sin(modelPosition.x * uFrequency.x + uTime)*0.25;
   modelPosition.z += sin(modelPosition.y * uFrequency.y)*0.25;
   //  modelPosition.z += aRandom*0.5;

   vec4 viewPosition = viewMatrix * modelPosition;
   vec4 projectionPosition = projectionMatrix *viewPosition;

   gl_Position = projectionPosition;
   // gl_Position = projectionMatrix * viewMatrix* modelMatrix * vec4(position,1.0);

   vRandom = aRandom;
}