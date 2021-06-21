import * as THREE from 'three'
import {GUI} from 'dat.gui'
import testVertexShaders from './vertex.glsl'
import testfragment from './fragment.glsl'


console.log(testfragment)

const Group = new THREE.Group()
const gui = new GUI({closed:true,width:400})

const textureLoader = new THREE.TextureLoader()
// const doorColorTexture = textureLoader.load('/textures/door/color.jpg')
const material = new THREE.RawShaderMaterial({
   vertexShader:testVertexShaders,
   fragmentShader:testfragment,
      wireframe:false, 
      side:THREE.DoubleSide,
      transparent:true
   })

const planeGeometry = new THREE.PlaneBufferGeometry(3,3,32,32);
const count = planeGeometry.attributes.position.count;
const random = new Float32Array(count)
for (let idx = 0; idx < count; idx++) {
   random[idx] = (Math.random()-0.5);
   
}
planeGeometry.setAttribute('aRandom', new THREE.BufferAttribute(random,1))
console.log('planeGeometry',planeGeometry.attributes)
const plane = new THREE.Mesh(planeGeometry,material)

/**
 * new Object 
 */


/**
 * light
 */
const ambientLight = new THREE.AmbientLight('#ffffff',0.5)
// const pointLight = new THREE.PointLight('#ffffff',0.6)
// pointLight.position.set(2,3,4)
Group.add(ambientLight, 
   // pointLight
)
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
const tick = ()=>{
   const elapsedTime = clock.getElapsedTime()
   window.requestAnimationFrame(tick)

}

tick()
export default Group