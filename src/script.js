import './style.css'
import * as THREE from 'three'

// import asset
import Cubies from './assets/cube'
import mesh from './assets/helloElem'

const primaryScene = new THREE.Scene()

const FOV = 75,
 sizes = {width:800,height:600},
 camera = new THREE.PerspectiveCamera(FOV,sizes.width/sizes.height)
 camera.position.z=4; camera.position.x=0; camera.position.y=0;

 // camera looking at
//  camera.lookAt(mesh.position)
 console.log('origin position',mesh.position.length())
 console.log('camera position',mesh.position.distanceTo(camera.position))

 // Axis Helper
 let axis = new THREE.AxesHelper()
 primaryScene.add(axis)

 // transform graphic group
 Cubies.rotateZ(180)


 // add to scene
 primaryScene.add(Cubies)
 primaryScene.add(mesh)
 primaryScene.add(camera)
 
 
// Render all element
const canvas = document.querySelector('.webgl'),
  renderer = new THREE.WebGLRenderer(
     {canvas}
  )

renderer.setSize(sizes.width,sizes.height)
renderer.render(primaryScene,camera)