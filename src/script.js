import './style.css'
import * as THREE from 'three'
import gasp from 'gsap'
// import asset
import Cubies from './assets/cube'
import mesh from './assets/helloElem'
import AnimatedCube from './assets/animateCube'

const primaryScene = new THREE.Scene()

const FOV = 75,
 sizes = {width:800,height:600},
 camera = new THREE.PerspectiveCamera(FOV,sizes.width/sizes.height)
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
// renderer.render(primaryScene,camera)

let time = Date.now()
const clock = new THREE.Clock()
gasp.to(mesh.position,{duration:1,delay:2,x: 0.5,y:2})
const tick = () =>{
    const currentTime = Date.now()
    const deltaTime = currentTime - time; time = currentTime
    
    renderer.render(primaryScene,camera)
    AnimatedCube.rotation.y += 0.01 *deltaTime
    AnimatedCube.position.z = Math.sin( 2*clock.getElapsedTime())
    AnimatedCube.position.x = Math.cos( clock.getElapsedTime())

    // camera.lookAt(AnimatedCube.position)

    // console.log('tick')
    window.requestAnimationFrame(tick)
 }
tick()