uniform mat4 projectionMatrix;
uniform mat4 viewMatrix;
uniform mat4 modelMatrix;

attribute vec3 position;

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

   gl_Position = projectionMatrix * viewMatrix* modelMatrix * vec4(position,1.0);
}