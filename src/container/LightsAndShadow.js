import * as THREE from 'three'
import {RectAreaLightHelper} from 'three/examples/jsm/helpers/RectAreaLightHelper'
import {GUI} from 'dat.gui'

const Group = new THREE.Group()
const gui = new GUI({closed:true,width:400})

const textureLoader = new THREE.TextureLoader()
const doorColorTexture = textureLoader.load('/textures/door/color.jpg')
const simpleMaterial = new THREE.MeshStandardMaterial({})
const plane = new THREE.Mesh(
   new THREE.PlaneBufferGeometry(4,4),
   new THREE.MeshStandardMaterial({side: THREE.DoubleSide})
)
plane.rotation.x=-Math.PI/2


const sphere = new THREE.Mesh(
   new THREE.SphereBufferGeometry(0.3,16,16),
   simpleMaterial
)
sphere.position.set(0,0.4,0)

const cube = new THREE.Mesh(
   new THREE.BoxBufferGeometry(0.4,0.4,0.4),
   simpleMaterial
)
cube.position.set(-1.2,1,0)

const torus = new THREE.Mesh(
   new THREE.TorusBufferGeometry(0.3,0.2,16,32),
   simpleMaterial
)
torus.position.set(1.2,1,0)

const helperSize = 0.2
// light  
const ambientLight = new THREE.AmbientLight('#ffffff',0.1)

const pointLight = new THREE.PointLight('#ffffff',0.6,7,1);pointLight.position.set(2,3,4)
const pointLightHelper = new THREE.PointLightHelper(pointLight,helperSize)

const directionalLight = new THREE.DirectionalLight('#ba68c6',0.4);directionalLight.position.set(0,0,-4)
const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight,helperSize)

const hemisphereLight = new THREE.HemisphereLight('#3949ab','#ffab40',0.7)
const hemisphereLightHelper = new THREE.HemisphereLightHelper(hemisphereLight,helperSize)

const rectLight = new THREE.RectAreaLight(0x4e00ff,3,1.5,1.5);
const reactLightHelper = new RectAreaLightHelper(rectLight)
rectLight.position.set(0,0,2);rectLight.lookAt(torus.position);


const spotLigth = new THREE.SpotLight('#78ff00',0.5,5,Math.PI*0.1,0.1,1)
const spotLigthHelper = new THREE.SpotLightHelper(spotLigth,helperSize)
spotLigth.position.set(0,2,3);spotLigth.target.position.set(-0.75,0,0)

window.requestAnimationFrame(()=>{
   spotLigthHelper.update()
   reactLightHelper.position.copy(rectLight.position)
   reactLightHelper.quaternion.copy(rectLight.quaternion)

 })

Group.add(
   ambientLight, 
   pointLight,pointLightHelper,
   directionalLight,directionalLightHelper,
   hemisphereLight,hemisphereLightHelper,
   rectLight,reactLightHelper,
   spotLigth,spotLigth.target,spotLigthHelper
)

Group.add(plane)
Group.add(sphere,cube,torus)

// Shadow Addition
plane.receiveShadow=true
sphere.castShadow=true;sphere.receiveShadow=true

pointLight.castShadow=true
directionalLight.castShadow=true

spotLigth.castShadow=true;spotLigth.shadow.mapSize.width=1024;spotLigth.shadow.mapSize.height=1024
spotLigth.shadow.camera.near=2;spotLigth.shadow.camera.far=6; spotLigth.shadow.camera.fov=50
const spotLigthCameraHelper = new THREE.CameraHelper(spotLigth.shadow.camera)
Group.add(spotLigthCameraHelper)

const clock = new THREE.Clock()

// Gui Dat helper
gui.add(plane,'visible').name('Ground').setValue(true)
const LightFolder = gui.addFolder('Light control');LightFolder.open()
LightFolder.add(ambientLight,'intensity',0,1,0.0001).name('Ambient light')
LightFolder.add(pointLight,'visible').name('point Light').setValue(false)
LightFolder.add(directionalLight,'visible').name('Behid -z directional Light').setValue(false)
LightFolder.add(hemisphereLight,'visible').name('hemisphere Light').setValue(false)
LightFolder.add(rectLight,'visible').name('rectangle Light').setValue(true)
LightFolder.add(spotLigth  ,'visible').name('spotLigth').setValue(true)
const ShadowFolder = gui.addFolder('Shadow control');ShadowFolder.open()
ShadowFolder.add(spotLigthCameraHelper  ,'visible').name('spot Ligth Camera').setValue(false)


const tick = ()=>{
   const elapsedTime = clock.getElapsedTime()

   torus.rotation.y = 0.3*elapsedTime
   cube.rotation.y = 0.3*elapsedTime
   sphere.rotation.y = 0.3*elapsedTime

   torus.rotation.x = 0.1*elapsedTime
   cube.rotation.x = 0.1*elapsedTime
   sphere.rotation.x = 0.1*elapsedTime

   spotLigthHelper.update()
   window.requestAnimationFrame(tick)

}

tick()
export default Group