import './style.css'
import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import gasp from 'gsap'
// import asset
import Cubies from './assets/cube'
import mesh from './assets/helloElem'
import AnimatedCube from './assets/animateCube'
// import util
import {resize,getFullScreen} from './util/browser'

const primaryScene = new THREE.Scene()

// Camera instanciation
const FOV = 65,
 sizes = {
   width:window.innerWidth, // 800
   height:window.innerHeight // 600
},
 camera = new THREE.PerspectiveCamera(FOV,sizes.width/sizes.height,1,1000)
 camera.position.z=4; camera.position.x=1; camera.position.y=1;

 // camera looking at
let origin =[0,0,0]; camera.lookAt(...origin)
console.log('origin position',mesh.position.length())
console.log('camera position',mesh.position.distanceTo(camera.position))
 // Axis Helper
let axis = new THREE.AxesHelper()
primaryScene.add(axis)

// transform graphic group
Cubies.rotateZ(180)
 // add to scene assets
 primaryScene.add(mesh)
//  primaryScene.add(Cubies)
primaryScene.add(AnimatedCube)
primaryScene.add(camera)

// Render all element
const canvas = document.querySelector('.webgl'),
  renderer = new THREE.WebGLRenderer(
     {canvas}
  )
renderer.setSize(sizes.width,sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio,2))
resize({sizes,camera,renderer});getFullScreen(canvas);

const control = new OrbitControls(camera,canvas)
control.enableDamping=true
// renderer.render(primaryScene,camera)

// Animation  
let time = Date.now()
const clock = new THREE.Clock()
gasp.to(mesh.position,{duration:1,delay:2,x: 0.5,y:2})
gasp.to(mesh.position,{duration:1,delay:5,x: 2,y:0,z:-1})

const tick = () =>{
    const currentTime = Date.now()
    const deltaTime = currentTime - time; time = currentTime
    
    renderer.render(primaryScene,camera)
    AnimatedCube.rotation.y += 0.01 *deltaTime
    AnimatedCube.position.z = Math.sin( 2*clock.getElapsedTime())
    AnimatedCube.position.x = Math.cos( clock.getElapsedTime())
    mesh.rotation.y = 1.3*clock.getElapsedTime()
    
    // camera.lookAt(AnimatedCube.position)

    // console.log('tick')
    control.update()
    window.requestAnimationFrame(tick)
 }
tick()