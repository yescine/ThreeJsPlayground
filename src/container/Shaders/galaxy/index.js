import * as THREE from 'three'
import {GUI} from 'dat.gui'
import vertexShader from './vertexTemplate.glsl';
import fragmentShader from './fragmentTemplate.glsl';

const Group = new THREE.Group()
const gui = new GUI()

const textureLoader = new THREE.TextureLoader()
const StarColorTexture = textureLoader.load('/textures/particles/11.png')

const parameterG = {
   count:100000,size:0.1,radius:5,branche:3,spin:1,randomness:0.7,randomnessPower:4,
   insideColor:'#ff6030',outsideColor:'#1b3984',mixt:0.2

}
/**
 * Galaxy gen
 */
let geometry = null
let material = null
let points = null
const generateGalaxy = () =>{

   if(points!==null) {
      geometry.dispose()
      material.dispose()
      Group.remove(points)
   }

   /**
    * Geometry
    */
   const {count,size,radius,branche,spin,randomnessPower} = parameterG
   geometry = new THREE.BufferGeometry()
   const positions = new Float32Array(parameterG.count*3)
   const colors = new Float32Array(parameterG.count*3)
   const scales = new Float32Array(parameterG.count*1)
   const randomness = new Float32Array(parameterG.count*3)

   const colorInside = new THREE.Color(parameterG.insideColor)
   const colorOutside = new THREE.Color(parameterG.outsideColor)

   for (let idx = 0; idx < count; idx++) {
      const i3 = idx*3
      const randRadius = Math.random()*radius
      const brancheAngle = ((idx%branche)/branche) * (2*Math.PI)
      const spinAngle = randRadius*spin

      // Position
      positions[i3+0] = Math.cos(brancheAngle+spinAngle)*randRadius 
      positions[i3+1] = 0
      positions[i3+2] = Math.sin(brancheAngle + spinAngle)*randRadius 
      
      // Color
      const mixtColor = colorInside.clone()
      mixtColor.lerp(colorOutside,randRadius/parameterG.radius)

      colors[i3+0]=  mixtColor.r
      colors[i3+1]=  mixtColor.g
      colors[i3+2]=  mixtColor.b

      // scales
      scales[idx] = Math.random() +0.1

      // randomness
      const randomX = Math.pow(Math.random(),randomnessPower)*(Math.random()<0.5?1:-1)*parameterG.randomness
      const randomY= Math.pow(Math.random(),randomnessPower)*(Math.random()<0.5?1:-1)*parameterG.randomness
      const randomZ= Math.pow(Math.random(),randomnessPower)*(Math.random()<0.5?1:-1)*parameterG.randomness

      randomness[i3+0] = randomX;
      randomness[i3+1] = randomY;
      randomness[i3+2] = randomZ;

   }

   geometry.setAttribute('position', new THREE.BufferAttribute(positions,3))
   geometry.setAttribute('color', new THREE.BufferAttribute(colors,3))
   geometry.setAttribute('aScales', new THREE.BufferAttribute(scales,1))
   geometry.setAttribute('aRandomness', new THREE.BufferAttribute(randomness,3))


   /**
    * Material
    */
   material = new THREE.ShaderMaterial({
      blending:THREE.AdditiveBlending,
      depthWrite:false,
      vertexColors:true,
      vertexShader:vertexShader,
      fragmentShader:fragmentShader,
      uniforms:{
         uSize:{value:40.0},
         uTime:{value:0},
         uTexture:{StarColorTexture}
      },

   })

   /**
    * Points
    */
   points = new THREE.Points(
      geometry,material
   )
   points.rotateZ(0.1)
   Group.add(points)
}

generateGalaxy() 

const ambientLight = new THREE.AmbientLight('#ffffff',0.5)
Group.add(ambientLight,)

 // Axis Helper
let axis = new THREE.AxesHelper()
Group.add(axis)

const clock = new THREE.Clock()
const gFolder = gui.addFolder('Quassar Animated');gFolder.close()
gFolder.add(axis,'visible').name('Axis xyz').setValue(true)
gFolder.add(ambientLight,'intensity',0,1,0.0001).name('Ambient light')
gFolder.add(parameterG,'count',1000,500000,100).name('star count').onFinishChange(generateGalaxy)
gFolder.add(parameterG,'size',0.01,1,0.001).name('size').onFinishChange(generateGalaxy)
gFolder.add(parameterG,'radius',2,10,0.1).name('Radius').onFinishChange(generateGalaxy)
gFolder.add(parameterG,'branche',2,15,1).name('branche').onFinishChange(generateGalaxy)
gFolder.add(parameterG,'spin',-5,5,0.01).onChange(generateGalaxy)
gFolder.add(parameterG,'randomness',0,1,0.01).onFinishChange(generateGalaxy)
gFolder.add(parameterG,'randomnessPower',0,10,0.1).name('branch centereed').onChange(generateGalaxy)
gFolder.addColor(parameterG,'insideColor').onChange(generateGalaxy)
gFolder.addColor(parameterG,'outsideColor').onChange(generateGalaxy)
gFolder.add(parameterG,'mixt',0,1,0.001).onChange(generateGalaxy)


const tick = ()=>{
   const elapsedTime = clock.getElapsedTime()

   material.uniforms.uTime.value=elapsedTime;
   window.requestAnimationFrame(tick)

}

tick()
export default Group