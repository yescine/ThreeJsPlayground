import * as THREE from 'three'
import {GUI} from 'dat.gui'
import testVertexShaders from './vertex.glsl'
import testfragment from './fragment.glsl'
import vertexP from './vertexP.glsl'
import fragmentP from './fragmentP.glsl'


console.log(testfragment)

const Group = new THREE.Group()
const gui = new GUI({closed:true,width:400})

const textureLoader = new THREE.TextureLoader()
const flagTexture = textureLoader.load('/textures/flag-tunisia.png')

const params = {waveX:10,waveY:5}

const material = new THREE.RawShaderMaterial({
   vertexShader:testVertexShaders,
   fragmentShader:testfragment,
   uniforms:{
      uFrequency:{value:new THREE.Vector2(params.waveX,params.waveY )},
      uTime:{value:0},
      uColor:{value: new THREE.Color('cyan')},
      uTexture:{value:flagTexture}
   },
   wireframe:false, 
   side:THREE.DoubleSide,
   transparent:true,

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

const materialP = new THREE.ShaderMaterial({
   vertexShader:vertexP,
   fragmentShader:fragmentP,
   uniforms:{
      uFrequency:{value:new THREE.Vector2(params.waveX,params.waveY )},
      uTime:{value:0},
      uColor:{value: new THREE.Color('cyan')},
   },
   wireframe:false, 
   side:THREE.DoubleSide,
   transparent:true,
   })
const plane2 = new THREE.Mesh(planeGeometry,materialP)
plane2.position.z=-1


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
Group.add(plane,plane2)

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
gui.add(material.uniforms.uFrequency.value,'x',1,10,0.01).name('Wave freq X')
gui.add(material.uniforms.uFrequency.value,'y',1,10,0.01).name('Wave freq Y')


const clock = new THREE.Clock()
const tick = ()=>{
   const elapsedTime = clock.getElapsedTime()
   // !update Material
   material.uniforms.uTime.value = (elapsedTime*2)

   window.requestAnimationFrame(tick)

}

tick()
export default Group