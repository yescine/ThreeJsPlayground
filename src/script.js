import './style.css'
import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import {GUI} from 'dat.gui'
import gasp from 'gsap'
// import TickBasics from './Basics'
// import asset
import LightAndTexture from './container/LightAndTexture'
import PortFolio from './container/PortFolio'
// import LightsAndShadow from './container/LightsAndShadow'
// import House from './container/House'
// import Particle from './container/Particle'
// import Galaxy from './container/Galaxy'
// import RayCaster from './container/RayCaster'
// import Physics from './container/physics/Ball'
// import BlenderModel from './container/BlenderModel'
import ShadersBasics from './container/Shaders/basics'

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
   height:window.innerHeight // 600
},
 camera = new THREE.PerspectiveCamera(FOV,sizes.width/sizes.height,1,1000)
 camera.position.z=4; camera.position.x=3; camera.position.y=3;

 // camera looking at
let origin =[0,0,0]; camera.lookAt(...origin)

primaryScene.add(camera)
primaryScene.add(
   LightAndTexture,
   PortFolio,
   // LightsAndShadow,
   // House,
   // Particle,
   // Galaxy,
   // RayCaster,
   // Physics,
   // BlenderModel,
   ShadersBasics
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


resize({sizes,camera,renderer});getFullScreen(canvas);

const control = new OrbitControls(camera,canvas)
control.enableDamping=true
 
// -- Gui
const lessonFolder = gui.addFolder('load lesson')

lessonFolder.add(LightAndTexture,'visible').name('Light and texture').setValue(false)
lessonFolder.add(PortFolio,'visible').name('PortFolio').setValue(false)
lessonFolder.add(ShadersBasics,'visible').name('Shaders Basics').setValue(false)


// Animation  
const clock = new THREE.Clock()


const tick = () =>{
    const currentTime = Date.now()  
    renderer.render(primaryScene,camera)
    control.update()
    window.requestAnimationFrame(tick)
 }
tick()
// TickBasics()

export const Camera = camera