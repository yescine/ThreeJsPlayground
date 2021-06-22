// uniform mat4 projectionMatrix;
// uniform mat4 viewMatrix;
// uniform mat4 modelMatrix;
// attribute vec2 uv;
// attribute vec3 position;


varying vec2 vUv;

void main(){

   // create plane
   vec4 modelPosition = modelMatrix * vec4(position,1.0);

   vec4 viewPosition = viewMatrix * modelPosition;
   vec4 projectionPosition = projectionMatrix *viewPosition;

   gl_Position = projectionPosition;

   gl_PointSize = 2.0;

   // send data & Attribute to fragment
   vUv = uv;

}