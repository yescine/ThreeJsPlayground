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
   fragmentShader:`
      precision mediump float; 
      void main () {
         gl_FragColor = vec4(1.0,1,0.2,1.0);
      }`,
      wireframe:true, 
      side:THREE.DoubleSide
   })
const plane = new THREE.Mesh(
   new THREE.PlaneBufferGeometry(4,4),
   material
)

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