import {GUI} from 'dat.gui'
import {mainCubeMaterial} from '../assets/helloElem'
import {Camera} from '../script'
import Cubies from '../assets/cube'
import gsap from 'gsap'

const parameters ={
   cubeColor:'#ff0000',
   spin:()=>{
      console.log('spin')
      gsap.to(Cubies.rotation,{duration:2,z:Cubies.rotation.z+5})
   },
   resetCamera:()=>{
      Camera.position.set(0,0,5)
   }

}

function SetGui ({camera, Group, material}) {

   const gui = new GUI({closed:false,width:400})

   let cameraFolder = gui.addFolder('Camera Control')
   cameraFolder.open()
   cameraFolder.add(camera.position,'x').name('camera X').max(5).min(-5).step(0.01)
   cameraFolder.add(parameters,'resetCamera').name('reset Camera')

   const objectFolder = gui.addFolder('Object Control')
   objectFolder.addColor(parameters,'cubeColor').name('main cube Color').onChange(()=>{
      mainCubeMaterial.setValues({color:parameters.cubeColor})
   })
   objectFolder.add(Group,'visible').name('grouped Gemoetry').setValue(false)
   objectFolder.add(parameters,'spin').name('spin object')

return gui
}

export default SetGui