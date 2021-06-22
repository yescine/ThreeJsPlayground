// precision mediump float;
#define Pi 3.141592653 
varying vec2 vUv;

float random (vec2 st){
      return fract(sin(dot(st.xy,vec2(12.9898,78.233)))*43758.5453123);
}

vec2 rotate(vec2 UVCoordinate, float angle){
    float c = cos(radians(angle));
    float s = sin(radians(angle));
    return vec2(
        UVCoordinate.x * c - UVCoordinate.y * s,
        UVCoordinate.x * s + UVCoordinate.y * c);
}

vec2 rotateUV(vec2 uv, float rotation, vec2 mid)
{
    return vec2(
      cos(rotation) * (uv.x - mid.x) + sin(rotation) * (uv.y - mid.y) + mid.x,
      cos(rotation) * (uv.y - mid.y) - sin(rotation) * (uv.x - mid.x) + mid.y
    );
}

void main () {
      // pattern 1
      // float strength = vUv.y;

      // pattern 2
      // float strength = 1.0-vUv.x;

      // pattern 3
      // float strength =mod(vUv.y*10.0,1.0); // strength =strength<0.5?0.0:1.0;
      // strength = step(0.5,strength);

      // pattern 4
      // float barX = step(0.8,mod(vUv.y*10.0,1.0));
      // barX *= step(0.4,mod(vUv.x*10.0,1.0));
      // float barY = step(0.4,mod(vUv.y*10.0,1.0));
      // barY *= step(0.8,mod(vUv.x*10.0,1.0));

      // float strength = barX + barY;

      // pattern 5
      // float barX = step(0.8,mod(vUv.y*10.0,1.0));
      // barX *= step(0.4,mod(vUv.x*10.0 + 0.2, 1.0));
      // float barY = step(0.4,mod(vUv.y*10.0 , 1.0));
      // barY *= step(0.8,mod(vUv.x*10.0 + 0.2, 1.0));

      // float strength = barX + barY;

      // pattern 6
      // float strength = min(abs(vUv.x-0.5),abs(vUv.y-0.5));

      // pattern 7
      // float strength =step(0.2, max(abs(vUv.x-0.5),abs(vUv.y-0.5)));

      // pattern 8
      // float strength = floor(vUv.x*15.0)/15.0;
      // strength *= floor(vUv.y*15.0)/15.0;

      // pattern 9
      // float strength = random(vUv);

      // pattern 10
      // vec2 grid = vec2(
      // floor(vUv.x*10.0)/10.0,
      // floor(vUv.y*10.0)/10.0
      // );
      // float strength = random(grid);

      // pattern 11 // Star pattern
      // float strength = distance(vUv,vec2(0.8,0.3));
      // pattern 12
      // float strength =0.02 / distance(vUv,vec2(0.5,0.5));

      // pattern 13
      // vec2 light2D = vec2(
      //       vUv.x * 0.1 + 0.45,
      //       vUv.y * 0.5 + 0.25
      // );
      // float strength = 0.015 / distance(light2D,vec2(0.5));

      // pattern 14
      // draw star
      vec2 vUvRotated = rotateUV(vUv,radians(45.0),vec2(0.5));
      vec2 lightUvX = vec2(vUvRotated.x * 0.1 + 0.45,vUvRotated.y * 0.5 + 0.25);
      float LighX = 0.015 / distance(lightUvX,vec2(0.5));

      vec2 lightUvY = vec2(vUvRotated.y * 0.1 + 0.45,vUvRotated.x * 0.5 + 0.25);
      float LighY = 0.015 / distance(lightUvY,vec2(0.5));

      float strength = 1.0;
      strength *=1.0 - LighX*LighY;
      // draw elipse f*g
      float circleR = 0.2;
      strength *= step(0.005,abs(distance(vec2(vUv.x*0.9,vUv.y*1.02),vec2(0.5)) - circleR));
      // color inversion
      strength =
            1.0 - 
            strength;
      

      gl_FragColor = vec4(vec3(strength),1);
}