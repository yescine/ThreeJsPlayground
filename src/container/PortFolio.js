import * as THREE from 'three'
import {GUI} from 'dat.gui'
// import typeFace from 'three/examples/fonts/helvetiker_regular.typeface.json'

const Group = new THREE.Group()
const gui = new GUI({closed:true,width:400})

const textureLoader = new THREE.TextureLoader()
const fontLoader = new THREE.FontLoader()
// const doorColorTexture = textureLoader.load('/textures/door/color.jpg')
fontLoader.load(
   '/fonts/helvetiker_regular.typeface.json',
   (font)=>{
      const bevelSize= 0.02;
      const textMaterial = new THREE.MeshMatcapMaterial({matcap:textureLoader.load('/textures/matcaps/1.png')})
      const textGeometry = new THREE.TextBufferGeometry(
         'hello three.js !!',
         {
            font,
            size:0.2,
            height:0.02,
            curveSegments:12,
            bevelEnabled:true,
            bevelThickness:0.03,
            bevelSize,
            bevelOffset:0,
            bevelSegments:5
         }
      )
      const textMesh = new THREE.Mesh(textGeometry,textMaterial)

      // textGeometry.computeBoundingBox()
      // console.log('boundingBox',textGeometry.boundingBox)
      // textGeometry.translate((-textGeometry.boundingBox.max.x-bevelSize)*0.5,1,0)
      textGeometry.center();textGeometry.translate(0,0.5,0)
      textMaterial.wireframe=false
      Group.add(textMesh)

      console.time('donut creation')
      const torusMaterial = new THREE.MeshMatcapMaterial({matcap:textureLoader.load('/textures/matcaps/4.png')})
      const torusGeometry = new THREE.TorusBufferGeometry(0.3,0.2,20,45)
      for (let idx = 0; idx < 200; idx++) {
         const donut = new THREE.Mesh(torusGeometry,torusMaterial)
         donut.position.x = (Math.random()-0.5)*10
         donut.position.y = (Math.random()-0.5)*10
         donut.position.z = (Math.random()-0.5)*10
         donut.rotation.x = Math.random()*Math.PI
         donut.rotation.y = Math.random()*Math.PI
         const scale = Math.random()
         donut.scale.set(scale,scale,scale)

         Group.add(donut)    
      }
      console.timeEnd('donut creation')
   }
)

const plane = new THREE.Mesh(
   new THREE.PlaneBufferGeometry(4,4),
   new THREE.MeshBasicMaterial({side: THREE.DoubleSide})
)
plane.rotation.x=-Math.PI/2

// const ambientLight = new THREE.AmbientLight('#ffffff',0.5)
// const pointLight = new THREE.PointLight('#ffffff',0.6)
// pointLight.position.set(2,3,4)
// Group.add(ambientLight, pointLight)
Group.add(plane)

const clock = new THREE.Clock()
gui.add(plane,'visible').name('Ground').setValue(true)

const tick = ()=>{
   const elapsedTime = clock.getElapsedTime()
   window.requestAnimationFrame(tick)

}

tick()
export default Group