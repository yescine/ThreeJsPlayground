import * as THREE from 'three'
import {EffectComposer} from 'three/examples/jsm/postprocessing/EffectComposer'
import {RenderPass} from 'three/examples/jsm/postprocessing/RenderPass'
import {GlitchPass} from 'three/examples/jsm/postprocessing/GlitchPass'
import {ShaderPass} from 'three/examples/jsm/postprocessing/ShaderPass'
import {RGBShiftShader} from 'three/examples/jsm/shaders/RGBShiftShader'
import {SMAAPass} from 'three/examples/jsm/postprocessing/SMAAPass'


export const postProcessEffectComposer = (sizes,renderer,primaryScene,camera) =>{
   // -- Post Processing
   // render Targert
   const renderTarget = new THREE.WebGLMultisampleRenderTarget(sizes.width,sizes.height,{
      minFilter:THREE.LinearFilter,
      magFilter:THREE.LinearFilter,
      format:THREE.RGBFormat,
      encoding:THREE.sRGBEncoding,
   })

   const effectComposer = new EffectComposer(renderer,renderTarget);
   effectComposer.setPixelRatio(Math.min(window.devicePixelRatio,2))
   effectComposer.setSize(sizes.width,sizes.height)

   const renderPass = new RenderPass(primaryScene,camera)
   effectComposer.addPass(renderPass)

   const glitchPass = new GlitchPass()
   glitchPass.enabled= false
   effectComposer.addPass(glitchPass)

   const rgbShiftPass = new ShaderPass(RGBShiftShader)
   rgbShiftPass.enabled = false
   effectComposer.addPass(rgbShiftPass)

   const smaaPass = new SMAAPass()
   effectComposer.addPass(smaaPass)

   // custom displacement postProcessing shaders
   const TintShader = {
      uniforms:{
         tDiffuse:{value:null},
         uNormalMap:{value:null}
      },
      vertexShader:`
      varying vec2 vUv;
      void main(){
         gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
         vUv = uv;
      }
      `,
      fragmentShader:`
      uniform sampler2D tDiffuse;
      uniform sampler2D uNormalMap;

      varying vec2 vUv;

      void main (){
         vec3 normalColor = texture2D(uNormalMap,vUv).xyz *2.0 - 1.0;
         vec2 newUv = vUv + normalColor.xy *0.5;
         vec4 color = texture2D(tDiffuse,newUv);
         // color.r += 0.05;

         vec3 lightDir = normalize(vec3(-1.0,1.0,0.0));
         float lightness =  clamp(dot(normalColor,lightDir),0.0,1.0);
         color.rgb+=lightness;

         gl_FragColor = color;
      }

      `
   }
   const displacementPass = new ShaderPass(TintShader)
   const textureLoader = new THREE.TextureLoader()
   displacementPass.material.uniforms.uNormalMap.value = textureLoader.load('/textures/interfaceNormalMap.png');
   effectComposer.addPass(displacementPass)

   return effectComposer
}
