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
   count:1000,size:0.02

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
   const {count,size} = parameterG
   geometry = new THREE.BufferGeometry()
   const positions = new Float32Array(parameterG.count*3)
   for (let idx = 0; idx < count; idx++) {
      const i3 = idx*3
      positions[i3+0] = (Math.random()-0.5)*3
      positions[i3+1] = (Math.random()-0.5)*3
      positions[i3+2] = (Math.random()-0.5)*3
      
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

const tick = ()=>{
   const elapsedTime = clock.getElapsedTime()
   
   window.requestAnimationFrame(tick)

}

tick()
export default Group