import './style.css'
import * as THREE from 'three'
import Cubies from './assets/cube'

const primaryScene = new THREE.Scene()

const cubePrimary = new THREE.BoxGeometry(1,1,1),
 materialPrimary = new THREE.MeshBasicMaterial({color:'#ff0000'}),
 mesh = new THREE.Mesh(cubePrimary,materialPrimary)

 

 // transform position
 mesh.rotateY(45)
 mesh.position.set(2,1,0)
 mesh.scale.set(0.5,0.5,0.5)

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

 // transform Scene
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