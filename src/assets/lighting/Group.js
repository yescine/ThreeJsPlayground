import * as THREE from 'three'

const Group = new THREE.Group()

const textureLoader = new THREE.TextureLoader()
const doorColorTexture = textureLoader.load('/textures/door/color.jpg')
const doorAlphaTexture = textureLoader.load('/textures/door/alpha.jpg')
const doorHeightTexture = textureLoader.load('/textures/door/height.jpg')
const doorNormalTexture = textureLoader.load('/textures/door/normal.jpg')
const doorMetalnessTexture = textureLoader.load('/textures/door/metalness.jpg')

const matcapTexture = textureLoader.load('/textures/matcaps/1.png')
const gradientTexture = textureLoader.load('/textures/gradients/3.jpg')

// const simpleMaterial = new THREE.MeshBasicMaterial({map:doorColorTexture})
// simpleMaterial.transparent= true
// simpleMaterial.alphaMap = doorAlphaTexture

// const simpleMaterial = new THREE.MeshNormalMaterial()

const simpleMaterial = new THREE.MeshMatcapMaterial({matcap:matcapTexture})

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

const torus = new THREE.Mesh(
   new THREE.TorusBufferGeometry(0.3,0.2,16,32),
   simpleMaterial
)
torus.position.set(1.2,1,0)

Group.add(sphere,plane,torus,card)

const clock = new THREE.Clock()
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