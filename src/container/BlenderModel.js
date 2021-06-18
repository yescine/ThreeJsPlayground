import * as THREE from 'three'
import {GUI} from 'dat.gui'
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader'
import {SVGLoader} from 'three/examples/jsm/loaders/SVGLoader'
import {DRACOLoader} from 'three/examples/jsm/loaders/DRACOLoader'


const Group = new THREE.Group()
const gui = new GUI({closed:true,width:400})

const textureLoader = new THREE.TextureLoader()
// const doorColorTexture = textureLoader.load('/textures/door/color.jpg')

const gltfLoader = new GLTFLoader()
const dracoLoader = new DRACOLoader()
dracoLoader.setDecoderPath('/draco/')
gltfLoader.setDRACOLoader(dracoLoader)
let mixer = null

gltfLoader.load('/models/Fox/glTF/Fox.gltf',
   ({scene,animations})=>{
      mixer = new THREE.AnimationMixer(scene)
      const action = mixer.clipAction(animations[0])
      action.play()

      Group.add(scene)
      scene.position.set(-2,0,-2);scene.rotateY(Math.PI/4);
      scene.scale.set(0.02,0.02,0.02)
      scene.castShadow=true
   }
)

gltfLoader.load('/models/Duck/glTF-Draco/Duck.gltf',
   (model)=>{
      console.log(model)
      // const children = [...model.scene.children]
      // for (const child of children){
      //    Group.add(child)
      // }
      Group.add(model.scene)
   }
)



const plane = new THREE.Mesh(
   new THREE.PlaneBufferGeometry(7,7),
   new THREE.MeshStandardMaterial({side: THREE.DoubleSide})
)
plane.rotation.x=-Math.PI/2;plane.material.metalness=0.5;plane.material.roughness=0.2;

/**
 * new Object 
 */


/**
 * light
 */
const ambientLight = new THREE.AmbientLight('#ffffff',0.5)
const pointLight = new THREE.PointLight('#ffffff',0.6)
pointLight.position.set(2,3,4)
pointLight.shadow.normalBias=0.05 // ? prevent shadow acne
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
gui.add(plane,'visible').name('Ground').setValue(true)
gui.add(ambientLight,'intensity',0,1,0.0001).name('Ambient light')
gui.add(axis,'visible').name('Axis xyz').setValue(true)

const clock = new THREE.Clock()
let previousTime = 0
const tick = ()=>{
   const elapsedTime = clock.getElapsedTime()
   const deltaTime = elapsedTime - previousTime
   previousTime=elapsedTime

   mixer?.update(deltaTime)

   window.requestAnimationFrame(tick)

}

tick()
export default Group