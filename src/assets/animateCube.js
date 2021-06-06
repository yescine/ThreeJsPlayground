import * as THREE from 'three'

const cubePrimary = new THREE.BoxGeometry(1,1,1),
 materialPrimary = new THREE.MeshBasicMaterial({color:'#ff1155',wireframe:true}),
 mesh = new THREE.Mesh(cubePrimary,materialPrimary)
mesh.scale.set(0.3,0.3,0.3)

 export default mesh