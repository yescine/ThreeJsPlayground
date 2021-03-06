import './style.css'
import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import Stats from 'stats.js'
// import {postProcessEffectComposer} from './container/postProcessing/process'

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
// -- PostProcessing
// const effectComposer = postProcessEffectComposer(sizes,renderer,primaryScene,camera)

resize({sizes,camera,renderer});
getFullScreen(canvas);

const control = new OrbitControls(camera,canvas)
control.enableDamping=true
 
// -- statistique
const stats = new Stats()
stats.showPanel(0)
document.body.appendChild(stats.dom)
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
   stats.begin()
   const currentTime = Date.now()  
   renderer.render(primaryScene,camera)
   // -- postProcessing
   // effectComposer.render()
   // effectComposer.setPixelRatio(Math.min(window.devicePixelRatio,2))
   // effectComposer.setSize(sizes.width,sizes.height)


   control.update()
   window.requestAnimationFrame(tick)

   stats.end()

 }
tick()
// TickBasics()

console.log('\x1b[36m%s\x1b[0m', 'Performance Data');
console.log(renderer.info)

export const Camera = camera