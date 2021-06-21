import * as THREE from 'three'
import {GUI} from 'dat.gui'

const Group = new THREE.Group()
const gui = new GUI({closed:false})
const cubeTextureLoader = new THREE.CubeTextureLoader()
const textureLoader = new THREE.TextureLoader()

const doorColorTexture = textureLoader.load('/textures/door/color.jpg')
const doorAlphaTexture = textureLoader.load('/textures/door/alpha.jpg')
const doorHeightTexture = textureLoader.load('/textures/door/height.jpg')
const doorNormalTexture = textureLoader.load('/textures/door/normal.jpg')
const doorMetalnessTexture = textureLoader.load('/textures/door/metalness.jpg')
const doorAmbientOcclusionTexture = textureLoader.load('/textures/door/ambientOcclusion.jpg')

// envirement texture 
const envirementMapTexture = cubeTextureLoader.load([
   '/textures/environmentMaps/0/px.jpg',
   '/textures/environmentMaps/0/nx.jpg',
   '/textures/environmentMaps/0/py.jpg',
   '/textures/environmentMaps/0/ny.jpg',
   '/textures/environmentMaps/0/pz.jpg',
   '/textures/environmentMaps/0/nz.jpg',
])

const matcapTexture = textureLoader.load('/textures/matcaps/1.png')
const gradientTexture = textureLoader.load('/textures/gradients/3.jpg')
gradientTexture.minFilter = THREE.NearestFilter
gradientTexture.magFilter = THREE.NearestFilter
gradientTexture.generateMipmaps = false
// const simpleMaterial = new THREE.MeshBasicMaterial({map:doorColorTexture})
// simpleMaterial.transparent= true
// simpleMaterial.alphaMap = doorAlphaTexture

// const simpleMaterial = new THREE.MeshNormalMaterial()

// const simpleMaterial = new THREE.MeshMatcapMaterial({matcap:matcapTexture})
// const simpleMaterial = new THREE.MeshDepthMaterial()
// const simpleMaterial = new THREE.MeshLambertMaterial()
// const simpleMaterial = new THREE.MeshPhongMaterial()
// const simpleMaterial = new THREE.MeshToonMaterial()
// simpleMaterial.gradientMap = gradientTexture

const simpleMaterial = new THREE.MeshStandardMaterial()
simpleMaterial.envMap=envirementMapTexture


const plane = new THREE.Mesh(
   new THREE.PlaneBufferGeometry(4,4),
   new THREE.MeshBasicMaterial({side: THREE.DoubleSide})
)
plane.rotation.x=-Math.PI/2

const sphere = new THREE.Mesh(
   new THREE.SphereBufferGeometry(0.5,16,16),
   simpleMaterial
)
sphere.position.set(0,1,0)

const card = new THREE.Mesh(
   new THREE.PlaneBufferGeometry(1,1),
   simpleMaterial
)
card.position.set(-1.2,1,0)

// set ambient occlusion
card.geometry.setAttribute('uv2', new THREE.BufferAttribute(card.geometry.attributes.uv.array,2))
simpleMaterial.aoMap=doorAmbientOcclusionTexture
simpleMaterial.displacementMap=doorHeightTexture
simpleMaterial.displacementScale= 0.04
simpleMaterial.side = THREE.DoubleSide
simpleMaterial.metalnessMap = doorMetalnessTexture
simpleMaterial.normalMap = doorNormalTexture
const torus = new THREE.Mesh(
   new THREE.TorusBufferGeometry(0.3,0.2,16,32),
   simpleMaterial
)
torus.position.set(1.2,1,0)

const ambientLight = new THREE.AmbientLight('#ffffff',0.5)
const pointLight = new THREE.PointLight('#ffffff',0.6)
pointLight.position.set(2,3,4)
Group.add(ambientLight, pointLight)
Group.add(sphere,plane,torus,card)

const clock = new THREE.Clock()
const FirstF = gui.addFolder('Light and texture')
FirstF.add(simpleMaterial,'metalness').max(1).min(0).step(0.0001).setValue(0.7)
FirstF.add(simpleMaterial,'roughness').max(1).min(0).step(0.0001).setValue(0.1)

const tick = ()=>{
   const elapsedTime = clock.getElapsedTime()

   torus.rotation.y = 0.3*elapsedTime
   card.rotation.y = 0.3*elapsedTime
   sphere.rotation.y = 0.3*elapsedTime

   torus.rotation.x = 0.1*elapsedTime
   card.rotation.x = 0.1*elapsedTime
   sphere.rotation.x = 0.1*elapsedTime

   window.requestAnimationFrame(tick)

}

tick()
export default Group