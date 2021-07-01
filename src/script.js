import './style.css'
import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import {EffectComposer} from 'three/examples/jsm/postprocessing/EffectComposer'
import {RenderPass} from 'three/examples/jsm/postprocessing/RenderPass'
import {GlitchPass} from 'three/examples/jsm/postprocessing/GlitchPass'
import {ShaderPass} from 'three/examples/jsm/postprocessing/ShaderPass'
import {RGBShiftShader} from 'three/examples/jsm/shaders/RGBShiftShader'
import {SMAAPass} from 'three/examples/jsm/postprocessing/SMAAPass'

import {GUI} from 'dat.gui'
import gasp from 'gsap'
// import TickBasics from './Basics'
// import asset
// import LightAndTexture from './container/LightAndTexture'
// import PortFolio from './container/PortFolio'
// import LightsAndShadow from './container/LightsAndShadow'
// import House from './container/House'
// import Particle from './container/Particle'
// import Galaxy from './container/Galaxy'
// import RayCaster from './container/RayCaster'
// import Physics from './container/physics/Ball'
// import BlenderModel from './container/BlenderModel'
// import ShadersBasics from './container/Shaders/basics'
// import PatternShaders from './container/Shaders/pattern'
// import OceanShaders from './container/Shaders/ocean'
// import galaxyAnimated from './container/Shaders/galaxy' 
// import ModifiedMaterial from './container/Shaders/modifiedMaterial'
import postProcessing from './container/postProcessing'

// import util
import {resize,getFullScreen} from './util/browser'
// import Gui from './util/ParamUi'

const gui = new GUI({closed:false,width:500})
const primaryScene = new THREE.Scene()
// export const loadingManager = new THREE.LoadingManager()

// Camera instanciation
const FOV = 65,
 sizes = {
   width:window.innerWidth, // 800
   height:window.innerHeight // -64*2 // 600
},
 camera = new THREE.PerspectiveCamera(FOV,sizes.width/sizes.height,1,1000)
 camera.position.z=5; camera.position.x=4; camera.position.y=3;

 // camera looking at
let origin =[0,0,0]; camera.lookAt(...origin)

primaryScene.add(camera)
primaryScene.add(
   // LightAndTexture,
   // PortFolio,
   // LightsAndShadow,
   // House,
   // Particle,
   // Galaxy,
   // RayCaster,
   // Physics,
   // BlenderModel,
   // ShadersBasics,
   // PatternShaders,
   // OceanShaders,
   // galaxyAnimated
   // ModifiedMaterial,
   postProcessing
)


// Render all element
const canvas = document.querySelector('.webgl'),
  renderer = new THREE.WebGLRenderer(
     {canvas,
      antialias:false
   }
  )
renderer.setSize(sizes.width,sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio,2))
renderer.setClearColor('#111111') // '#0d47a1'
// -- shadow
renderer.shadowMap.enabled=true
renderer.shadowMap.type = THREE.PCFShadowMap
// -- Realistic Render
renderer.physicallyCorrectLights=false
renderer.outputEncoding = THREE.sRGBEncoding
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

resize({sizes,camera,renderer});
getFullScreen(canvas);

const control = new OrbitControls(camera,canvas)
control.enableDamping=true
 
// -- Gui
const lessonFolder = gui.addFolder('load lesson')

// lessonFolder.add(LightAndTexture,'visible').name('Light and texture').setValue(false)
// lessonFolder.add(PortFolio,'visible').name('PortFolio').setValue(false)
// lessonFolder.add(ShadersBasics,'visible').name('Shaders Basics').setValue(false)
// lessonFolder.add(PatternShaders,'visible').name('Pattern Shaders').setValue(false)
// lessonFolder.add(OceanShaders,'visible').name('Ocean Shaders').setValue(true)
// lessonFolder.add(galaxyAnimated,'visible').name('Quassar Animated').setValue(false)
// lessonFolder.add(ModifiedMaterial,'visible').name('Modified Material').setValue(true)
lessonFolder.add(postProcessing,'visible').name('Post Processing').setValue(true)

// Animation  
const clock = new THREE.Clock()


const tick = () =>{
   const currentTime = Date.now()  
   // renderer.render(primaryScene,camera)
   // -- postProcessing
   effectComposer.render()
   effectComposer.setPixelRatio(Math.min(window.devicePixelRatio,2))
   effectComposer.setSize(sizes.width,sizes.height)


   control.update()
   window.requestAnimationFrame(tick)
 }
tick()
// TickBasics()

export const Camera = camera