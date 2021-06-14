import * as THREE from 'three'
import {GUI} from 'dat.gui'

const Group = new THREE.Group()
const gui = new GUI({closed:true,width:400})

const textureLoader = new THREE.TextureLoader()
// const doorColorTexture = textureLoader.load('/textures/door/color.jpg')
const simpleMaterial = new THREE.MeshStandardMaterial()
const plane = new THREE.Mesh(
   new THREE.PlaneBufferGeometry(4,4),
   new THREE.MeshBasicMaterial({side: THREE.DoubleSide})
)
plane.rotation.x=-Math.PI/2


const sphere = new THREE.Mesh(
   new THREE.SphereBufferGeometry(0.4,16,16),
   simpleMaterial
)
sphere.position.set(0,1,0)

const cube = new THREE.Mesh(
   new THREE.BoxBufferGeometry(0.4,0.4,0.4),
   simpleMaterial
)
cube.position.set(-1.2,1,0)

const torus = new THREE.Mesh(
   new THREE.TorusBufferGeometry(0.3,0.2,16,32),
   simpleMaterial
)
torus.position.set(1.2,1,0)

// light 
// const ambientLight = new THREE.AmbientLight('#ffffff',0.5)
// const pointLight = new THREE.PointLight('#ffffff',0.6)
// pointLight.position.set(2,3,4)
// Group.add(ambientLight, pointLight)

Group.add(plane)
Group.add(sphere,cube,torus)


const clock = new THREE.Clock()
gui.add(plane,'visible').name('Ground').setValue(true)

const tick = ()=>{
   const elapsedTime = clock.getElapsedTime()

   torus.rotation.y = 0.3*elapsedTime
   cube.rotation.y = 0.3*elapsedTime
   sphere.rotation.y = 0.3*elapsedTime

   torus.rotation.x = 0.1*elapsedTime
   cube.rotation.x = 0.1*elapsedTime
   sphere.rotation.x = 0.1*elapsedTime

   window.requestAnimationFrame(tick)

}

tick()
export default Group