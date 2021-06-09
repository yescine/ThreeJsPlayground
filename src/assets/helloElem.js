import * as THREE from 'three'

const cubePrimary = new THREE.BoxBufferGeometry(1,1,1),
 materialPrimary = new THREE.MeshBasicMaterial({color:'#ff0000'}),
 mesh = new THREE.Mesh(cubePrimary,materialPrimary)

 // transform position
 mesh.rotateY(45)
 mesh.position.set(2,1,0)
 mesh.scale.set(0.5,0.5,0.5)

export const mainCubeMaterial= materialPrimary
export default mesh