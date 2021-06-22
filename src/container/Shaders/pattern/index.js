import * as THREE from 'three'
import {GUI} from 'dat.gui'
import vertexShader from './vertexTemplate.glsl'
import fragmentShader from './fragmentTemplate.glsl'

const Group = new THREE.Group()
const gui = new GUI({closed:false,width:400})

const textureLoader = new THREE.TextureLoader()
// const doorColorTexture = textureLoader.load('/textures/door/color.jpg')

/**
 * Material
 */
const material = new THREE.ShaderMaterial({
   vertexShader:vertexShader,
   fragmentShader:fragmentShader,
   transparent:true,
   side:THREE.DoubleSide
})
const geometry = new THREE.PlaneBufferGeometry(4,4,32,32)
const plane = new THREE.Mesh(geometry,material)
console.log(plane)

/**
 * new Object 
 */


/**
 * light
 */
const ambientLight = new THREE.AmbientLight('#ffffff',0.2)
Group.add(ambientLight)
Group.add(plane)

/**
 *  Helpers
 */ 
let axis = new THREE.AxesHelper()
Group.add(axis)

/**
 * Gui . data
 */
const newLesson = gui.addFolder('Shaders Pattern')
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