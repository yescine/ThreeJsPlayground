// import './style.css'
import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import gasp from 'gsap'
// import TickBasics from './Basics'
// import asset
// import LightAndTexture from './container/LightAndTexture'
// import PortFolio from './container/PortFolio'
// import LightsAndShadow from './container/LightsAndShadow'
// import House from './container/House'
// import Particle from './container/Particle'
import Galaxy from './container/Galaxy'

// import util
import {resize,getFullScreen} from './util/browser'
// import Gui from './util/ParamUi'

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
 // Axis Helper
let axis = new THREE.AxesHelper()
primaryScene.add(axis)

// transform graphic group

primaryScene.add(camera)
primaryScene.add(
   // LightAndTexture,
   // PortFolio,
   // LightsAndShadow,
   // House,
   // Particle,
   Galaxy
)


// Render all element
const canvas = document.querySelector('.webgl'),
  renderer = new THREE.WebGLRenderer(
     {canvas}
  )
renderer.setSize(sizes.width,sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio,2))
// shadow
renderer.shadowMap.enabled=true
renderer.shadowMap.type = THREE.PCFShadowMap
resize({sizes,camera,renderer});getFullScreen(canvas);

const control = new OrbitControls(camera,canvas)
control.enableDamping=true

// renderer.render(primaryScene,camera)

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