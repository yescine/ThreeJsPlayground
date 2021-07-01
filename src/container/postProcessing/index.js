import * as THREE from 'three'
import {GUI} from 'dat.gui'
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader'
import {loadingManager} from '../../progressLoader'

const Group = new THREE.Group()
const gui = new GUI({closed:false})

const gltfLoader = new GLTFLoader(loadingManager)
const textureLoader = new THREE.TextureLoader(loadingManager)
const mapTexture = textureLoader.load('/models/DamagedHelmet/glTF/Default_albedo.jpg');
mapTexture.encoding = THREE.sRGBEncoding;
const normalTexture = textureLoader.load('/models/DamagedHelmet/glTF/Default_normal.jpg')
const material = new THREE.MeshStandardMaterial({
   map:mapTexture,
   normalMap:normalTexture
})

const plane = new THREE.Mesh(
   new THREE.PlaneBufferGeometry(10,10),
   new THREE.MeshStandardMaterial({side: THREE.DoubleSide,metalness:0.5,roughness:0.2})
)
plane.rotation.x=-Math.PI/2

/**
 * new Object 
 */

 gltfLoader.load('/models/DamagedHelmet/glTF/DamagedHelmet.gltf',
 (gltf)=>{
   console.log(gltf)
   const mesh = gltf.scene.children[0]
   // mesh.material = material
   mesh.position.y=0.9
   Group.add(mesh)
 }
)


/**
 * light
 */
const ambientLight = new THREE.AmbientLight('#ffffff',0.5)
const pointLight = new THREE.DirectionalLight('#ffffff',0.9)
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
const newLesson = gui.addFolder('Post Processing')
newLesson.add(plane,'visible').name('Ground').setValue(true)
newLesson.add(ambientLight,'intensity',0,1,0.0001).name('Ambient light')
newLesson.add(axis,'visible').name('Axis xyz').setValue(true)

const clock = new THREE.Clock()
const tick = ()=>{
   const elapsedTime = clock.getElapsedTime()
   window.requestAnimationFrame(tick)

}

tick()
export default Group