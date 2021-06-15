import * as THREE from 'three'
import {GUI} from 'dat.gui'

const Group = new THREE.Group()
const gui = new GUI({closed:true,width:400})

const textureLoader = new THREE.TextureLoader()
// const doorColorTexture = textureLoader.load('/textures/door/color.jpg')

const plane = new THREE.Mesh(
   new THREE.PlaneBufferGeometry(4,4),
   new THREE.MeshStandardMaterial({color:'#ffffff',side: THREE.DoubleSide})
)
plane.rotation.x=-Math.PI/2

const parameterG = {
   count:1000,size:0.02,radius:2,branche:3,spin:1,randomness:0.2

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
   const {count,size,radius,branche,spin} = parameterG
   geometry = new THREE.BufferGeometry()
   const positions = new Float32Array(parameterG.count*3)
   for (let idx = 0; idx < count; idx++) {
      const i3 = idx*3
      const randRadius = Math.random()*radius
      const brancheAngle = ((idx%branche)/branche) * (2*Math.PI)
      const spinAngle = randRadius*spin

      const randomX = (Math.random()-0.5) * parameterG.randomness
      const randomY= (Math.random()-0.5) * parameterG.randomness
      const randomZ= (Math.random()-0.5) * parameterG.randomness

      positions[i3+0] = Math.cos(brancheAngle+spinAngle)*randRadius + randomX
      positions[i3+1] = randomY
      positions[i3+2] = Math.sin(brancheAngle + spinAngle)*randRadius + randomZ
      
   }
   geometry.setAttribute('position', new THREE.BufferAttribute(positions,3))

   /**
    * Material
    */
   material = new THREE.PointsMaterial({
      size:size,
      sizeAttenuation:true,
      depthWrite:false,
      blending:THREE.AdditiveBlending
   })

   /**
    * Points
    */
   points = new THREE.Points(
      geometry,material
   )
   Group.add(points)
}

generateGalaxy() 

const ambientLight = new THREE.AmbientLight('#ffffff',0.5)
Group.add(ambientLight,)
Group.add(plane)

 // Axis Helper
let axis = new THREE.AxesHelper()
Group.add(axis)

const clock = new THREE.Clock()
gui.add(plane,'visible').name('Ground').setValue(false)
gui.add(axis,'visible').name('Axis xyz').setValue(true)
gui.add(ambientLight,'intensity',0,1,0.0001).name('Ambient light')
const gFolder = gui.addFolder('Galaxy');gFolder.close()
gFolder.add(parameterG,'count',100,100000,100).name('star count').onFinishChange(generateGalaxy)
gFolder.add(parameterG,'size',0.001,0.1,0.001).name('size').onFinishChange(generateGalaxy)
gFolder.add(parameterG,'radius',2,10,0.1).name('Radius').onFinishChange(generateGalaxy)
gFolder.add(parameterG,'branche',2,15,1).name('branche').onFinishChange(generateGalaxy)
gFolder.add(parameterG,'spin',-5,5,0.01).onChange(generateGalaxy)
gFolder.add(parameterG,'randomness',0,1,0.01).onFinishChange(generateGalaxy)

const tick = ()=>{
   const elapsedTime = clock.getElapsedTime()
   
   window.requestAnimationFrame(tick)

}

tick()
export default Group