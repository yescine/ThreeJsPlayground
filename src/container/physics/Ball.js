import * as THREE from 'three'
import {GUI} from 'dat.gui'
import Cannon from 'cannon'

const Group = new THREE.Group()
const gui = new GUI({closed:true,width:400})

const textureLoader = new THREE.TextureLoader()
// const doorColorTexture = textureLoader.load('/textures/door/color.jpg')
const groundMaterial = new THREE.MeshStandardMaterial({side: THREE.DoubleSide})
const plane = new THREE.Mesh(
   new THREE.PlaneBufferGeometry(6,6),
   groundMaterial
)
plane.rotation.x=-Math.PI/2

plane.material.metalness=0.5;plane.material.roughness=0.3;plane.receiveShadow=true
/**
 * new Object 
 */
const ball = new THREE.Mesh(
   new THREE.SphereBufferGeometry(0.3,32,32),
   new THREE.MeshStandardMaterial()
)
ball.position.set(0,1,0);ball.castShadow=true
console.log(ball)

/**
 * Physics
 */
const world = new Cannon.World()
world.gravity.set(0,-9.82,0)

// Materials
const concreteMaterial = new Cannon.Material('concrete')
const plasticMaterial = new Cannon.Material('plastic')
const contactPC = new Cannon.ContactMaterial(concreteMaterial,plasticMaterial,
   {
      friction:0.3,
      restitution:0.5,
   })

world.addContactMaterial(contactPC)

// Body
const ballShape = new Cannon.Sphere(ball.geometry.parameters.radius)
const ballBody = new Cannon.Body({mass:1,position:new Cannon.Vec3(0,4,0),shape:ballShape,material:plasticMaterial})
ballBody.applyLocalForce(new Cannon.Vec3(150,0,0), new Cannon.Vec3(0,0,0))

const groundBody = new Cannon.Body({shape:new Cannon.Plane(),mass:0,material:concreteMaterial})
groundBody.quaternion.setFromAxisAngle(new Cannon.Vec3(1,0,0),-Math.PI/2)

world.addBody(ballBody)
world.addBody(groundBody)


/**
 * light
 */
const ambientLight = new THREE.AmbientLight('#ffffff',0.5)
const pointLight = new THREE.PointLight('#ffffff',0.6)
pointLight.castShadow=true
pointLight.position.set(2,3,4)
Group.add(ambientLight,pointLight )
Group.add(plane)
Group.add(ball)

/**
 *  Helpers
 */ 
let axis = new THREE.AxesHelper()
Group.add(axis)

/**
 * Gui . data
 */
gui.add(plane,'visible').name('Ground').setValue(true)
gui.add(ambientLight,'intensity',0,1,0.0001).name('Ambient light')
gui.add(axis,'visible').name('Axis xyz').setValue(true)

const clock = new THREE.Clock()
let oldElapsedTime = 0
const tick = ()=>{
   const elapsedTime = clock.getElapsedTime()
   const deltaTime = elapsedTime-oldElapsedTime
   oldElapsedTime = elapsedTime 
   // update physics world
   ballBody.applyForce(new Cannon.Vec3(-0.5,0,0),ballBody.position)
   world.step(1/60,deltaTime,3)
   // update object
   ball.position.copy(ballBody.position)
   
   window.requestAnimationFrame(tick)
}

tick()
export default Group