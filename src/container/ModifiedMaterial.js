import * as THREE from 'three'
import {GUI} from 'dat.gui'
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader'

const Group = new THREE.Group()
const gui = new GUI({closed:false})

const gltfLoader = new GLTFLoader()
const textureLoader = new THREE.TextureLoader()
const mapTexture = textureLoader.load('/models/LeePerrySmith/color.jpg');
mapTexture.encoding = THREE.sRGBEncoding;

const normalTexture = textureLoader.load('/models/LeePerrySmith/normal.jpg');

const material = new THREE.MeshStandardMaterial({
   map:mapTexture,
   normalMap:normalTexture
})
material.onBeforeCompile= (shader)=>{
   console.log(shader)
}

const plane = new THREE.Mesh(
   new THREE.PlaneBufferGeometry(4,4),
   new THREE.MeshStandardMaterial({side: THREE.DoubleSide})
)
plane.rotation.x=-Math.PI/2

/**
 * new Object 
 */

 gltfLoader.load('/models/LeePerrySmith/LeePerrySmith.glb',
 (gltf)=>{
   const mesh = gltf.scene.children[0]
   mesh.material = material
   mesh.scale.set(0.5,0.5,0.5)
   Group.add(mesh)
 }
)


/**
 * light
 */
const ambientLight = new THREE.AmbientLight('#ffffff',0.5)
const pointLight = new THREE.PointLight('#ffffff',0.6)
pointLight.position.set(2,3,4)
Group.add(ambientLight, pointLight)
Group.add(plane)

/**
 *  Helpers
 */ 
let axis = new THREE.AxesHelper()
Group.add(axis)

/**
 * Gui . data
 */
const newLesson = gui.addFolder('Lee Perry Smith')
newLesson.add(plane,'visible').name('Ground').setValue(false)
newLesson.add(ambientLight,'intensity',0,1,0.0001).name('Ambient light')
newLesson.add(axis,'visible').name('Axis xyz').setValue(true)

const clock = new THREE.Clock()
const tick = ()=>{
   const elapsedTime = clock.getElapsedTime()
   window.requestAnimationFrame(tick)

}

tick()
export default Group