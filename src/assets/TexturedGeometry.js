import * as THREE from 'three'
import DoorTex from './door.jpg'
// const doorImage = new Image()
// doorImage.onload=()=>{
//    texture.needsUpdate=true
// }
// doorImage.src = DoorTex // '/textures/door/color.jpg'
// const texture = new THREE.Texture(doorImage)

const loadingManager = new THREE.LoadingManager()
const textureLoader = new THREE.TextureLoader(loadingManager)
const colorTexture = textureLoader.load('/textures/door/color.jpg')
const alphaTexture = textureLoader.load('/textures/door/alpha.jpg')
const heightTexture = textureLoader.load('/textures/door/height.jpg')
const normalTexture = textureLoader.load('/textures/door/normal.jpg')
const metalnessTexture = textureLoader.load('/textures/door/metalness.jpg')

// colorTexture.repeat.x=2
// colorTexture.repeat.y=3
colorTexture.generateMipmaps=true
colorTexture.center.x=0.5
colorTexture.center.y=0.5
colorTexture.rotation=Math.PI/6
colorTexture.magFilter=THREE.NearestFilter
loadingManager.onStart=()=>{
   console.log('\x1b[36m%s\x1b[0m', 'loading...');
}

const cubePrimary = new THREE.BoxBufferGeometry(1,1,1)
const meshTexture = new THREE.Mesh(
   cubePrimary,
   new THREE.MeshBasicMaterial({
      map: /*texture */ colorTexture
      // new THREE.TextureLoader(loadingManager).load(
      //    DoorTex,
      //    ()=>{
      //       console.log('...door Loaded')
      //    })
   })
)
meshTexture.position.set(-2,1,0)
export default meshTexture