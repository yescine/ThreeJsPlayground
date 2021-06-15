import * as THREE from 'three'
import {GUI} from 'dat.gui'

const Group = new THREE.Group()
const gui = new GUI({closed:true,width:400})

const textureLoader = new THREE.TextureLoader()
// const doorColorTexture = textureLoader.load('/textures/door/color.jpg')

const plane = new THREE.Mesh(
   new THREE.PlaneBufferGeometry(4,4),
   new THREE.MeshStandardMaterial({side: THREE.DoubleSide})
)
plane.rotation.x=-Math.PI/2

const material = new THREE.MeshStandardMaterial()
const object1 = new THREE.Mesh(new THREE.SphereBufferGeometry(0.4,16,16), new THREE.MeshStandardMaterial());object1.position.x=2
const object2 = new THREE.Mesh(new THREE.SphereBufferGeometry(0.4,16,16), new THREE.MeshStandardMaterial());object2.position.x=0
const object3 = new THREE.Mesh(new THREE.SphereBufferGeometry(0.4,16,16), new THREE.MeshStandardMaterial());object3.position.x=-2

const rayCaster = new THREE.Raycaster()
const rayOrigin = new  THREE.Vector3(-4,0,0)
const rayDirection = new THREE.Vector3(10,0,0);rayDirection.normalize()
rayCaster.set(rayOrigin,rayDirection)
/**
 * Mouse
 */
const mouse = new THREE.Vector3()
window.addEventListener('mousemove',(event)=>{
   let X = (event.clientX/window.innerWidth)*Math.PI
   let Y = -(event.clientY/window.innerHeight)*Math.PI
   mouse.x = X
   mouse.y = Y
   mouse.z=Math.cos(X) + Math.sin(Y)
})

const points = [];
points.push( new THREE.Vector3( - 4, 0, 0 ) );
points.push(mouse)
const geometryLine = new THREE.BufferGeometry().setFromPoints( points );
const line = new THREE.Line( geometryLine, new THREE.LineBasicMaterial({color: 0x0000ff }) );
Group.add(line)

const ambientLight = new THREE.AmbientLight('#ffffff',0.5)
const pointLight = new THREE.PointLight('#ffffff',0.6)
pointLight.position.set(2,3,4)
Group.add(ambientLight, pointLight)
Group.add(plane)

Group.add(object1,object2,object3)

// Helpers
let axis = new THREE.AxesHelper()
Group.add(axis)

const clock = new THREE.Clock()
gui.add(plane,'visible').name('Ground').setValue(false)
gui.add(ambientLight,'intensity',0,1,0.0001).name('Ambient light')
gui.add(axis,'visible').name('Axis xyz').setValue(true)

const tick = ()=>{
   const elapsedTime = clock.getElapsedTime()
   const points = [];
   points.push( new THREE.Vector3( - 4, 0, 0 ) );
   points.push(mouse)
   geometryLine.setFromPoints( points );

   object1.position.y = Math.sin(elapsedTime*0.5)*1.3
   object2.position.y = Math.sin(elapsedTime)*2
   object3.position.y = Math.sin(elapsedTime*2)*1
   const Objects = [object1,object2,object3]
 
   for(const obj of Objects){
      obj.material.color.set('#ffffff')
   }

   const intercepts = rayCaster.intersectObjects(Objects)
   for (const intercept of intercepts ){
      intercept.object.material.color.set('#0088ff')
   }

   window.requestAnimationFrame(tick)

}

tick()
export default Group