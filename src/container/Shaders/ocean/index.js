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
const params = {surface:'#0000ff',depth:'#8888ff'}
const material = new THREE.ShaderMaterial({
   vertexShader:vertexShader,
   fragmentShader:fragmentShader,
   transparent:true,
   side:THREE.DoubleSide,
   uniforms:{
      uTime:{value:0},
      uElevation:{value:1},
      wave:{value:new THREE.Vector2(4,4)},
      uSurfaceColor:{value:new THREE.Color(params.surface)},
      uDepth:{value:new THREE.Color(params.depth)}

   }
})
const geometry = new THREE.PlaneBufferGeometry(6,4,128,128)
const plane = new THREE.Mesh(geometry,material)
plane.rotation.x=-Math.PI/2;plane.material.metalness=0.7;plane.material.roughness=0.3;

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
const newLesson = gui.addFolder('Water Pattern')
newLesson.add(plane,'visible').name('Ground').setValue(true)
newLesson.add(ambientLight,'intensity',0,1,0.0001).name('Ambient light')
newLesson.add(axis,'visible').name('Axis xyz').setValue(true)
newLesson.add(material.uniforms.uElevation,'value',1,10,0.01).name('Elevation').setValue(1)
newLesson.add(material.uniforms.wave.value,'x',0,10,0.01).name('waveX').setValue(2)
newLesson.add(material.uniforms.wave.value,'y',0,10,0.01).name('waveY').setValue(1)
newLesson.addColor(params,'surface').name('Surface Color').onChange(()=>{material.uniforms.uSurfaceColor.value.set(params.surface)})
newLesson.addColor(params,'depth').name('depth Color').onChange(()=>{material.uniforms.uSurfaceColor.value.set(params.depth)})


const clock = new THREE.Clock()
const tick = ()=>{
   const elapsedTime = clock.getElapsedTime()
   material.uniforms.uTime.value=elapsedTime
   window.requestAnimationFrame(tick)

}

tick()
export default Group