import * as THREE from 'three'
import {GUI} from 'dat.gui'
import Cannon from 'cannon'
import { Scene } from 'three'

const Group = new THREE.Group()
const gui = new GUI({closed:false,width:400})

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
 * Sounds
 */
const hitSound = new Audio('/sounds/hit.mp3')

/**
 * Physics
 */
const world = new Cannon.World()
world.broadphase = new Cannon.SAPBroadphase(world)
world.allowSleep=true
world.gravity.set(0,-9.82,0)

// Materials
const concreteMaterial = new Cannon.Material('concrete')
const plasticMaterial = new Cannon.Material('plastic')
const contactPC = new Cannon.ContactMaterial(concreteMaterial,plasticMaterial,
   {
      friction:0.3,
      restitution:0.5,
   })

const defaultMaterial = new Cannon.Material('default')
const contactDefault = new Cannon.ContactMaterial(defaultMaterial,defaultMaterial,
   {
      friction:0.3,
      restitution:0.8,
   })

world.addContactMaterial(contactDefault)
world.addContactMaterial(contactPC)

// Body
const ballShape = new Cannon.Sphere(ball.geometry.parameters.radius)
const ballBody = new Cannon.Body({mass:1,position:new Cannon.Vec3(0,4,0),shape:ballShape,material:plasticMaterial})
ballBody.applyLocalForce(new Cannon.Vec3(150,0,0), new Cannon.Vec3(0,0,0))

world.addBody(ballBody)

// -- Create Drop of Ball

const ObjectToUpdate = []
const sphereGeometry = new THREE.SphereBufferGeometry(1,20,20)
const sphereMaterial = new THREE.MeshStandardMaterial({
   metalness:0.3,roughness:0.4
})
const playHitSound = (collision)=>{
   let amp = collision.contact.getImpactVelocityAlongNormal()
   // console.log('collision',amp)
   
   if(amp>2){
      hitSound.volume=Math.random()
      hitSound.currentTime=0;
      hitSound.play();
   }
}
const createSphere = (radius,position)=>{
   // * Three Js
   const mesh = new THREE.Mesh(sphereGeometry,sphereMaterial)
   // mesh.geometry.parameters.radius =radius // !bufy with the ground need update
   mesh.scale.set(radius,radius,radius)
   mesh.castShadow=true
   mesh.position.copy(position)
   Group.add(mesh)

   // * Cannon Js
   const rho = 0.8
   const shape = new Cannon.Sphere(radius)
   const body = new Cannon.Body({
      mass: Math.abs(Math.pow(radius,3)*rho),
      position:new Cannon.Vec3(0,0,0),
      shape,
      material:defaultMaterial
   })
   body.position.copy(position)
   world.addBody(body)
   ObjectToUpdate.push({mesh,body})

   // * add Sounds
   body.addEventListener('collide',playHitSound)
   console.log('ball created',radius)
}

const debugObject = {
   createSphere: ()=>{
      createSphere(Math.random()+0.1,{x:(Math.random()-0.5)*3,y:3+(Math.random()-0.5),z:(Math.random()-0.5)*3})   
   },
   resetObject:()=>{
      ObjectToUpdate.forEach(({body,mesh})=>{
         body.removeEventListener('collide',playHitSound)
         world.remove(body)
         Group.remove(mesh)
      })
   }
}

const groundBody = new Cannon.Body({shape:new Cannon.Plane(),mass:0,
   material:defaultMaterial // concreteMaterial
})
groundBody.quaternion.setFromAxisAngle(new Cannon.Vec3(1,0,0),-Math.PI/2)
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
gui.add(debugObject,'createSphere')
gui.add(debugObject,'resetObject')
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
   // update object
   ball.position.copy(ballBody.position)
   ballBody.applyForce(new Cannon.Vec3(-0.5,0,0),ballBody.position)
   ObjectToUpdate.forEach(({mesh,body})=>{
      mesh.position.copy(body.position)
      mesh.quaternion.copy(body.quaternion)
   })
   world.step(1/60,deltaTime,3)
   
   window.requestAnimationFrame(tick)
}

tick()
export default Group