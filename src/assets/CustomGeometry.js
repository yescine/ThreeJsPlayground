import * as THREE from 'three'

const geometry = new THREE.Geometry()

geometry.vertices.push(new THREE.Vector3(0,0,0))
geometry.vertices.push(new THREE.Vector3(0,1,0))
geometry.vertices.push(new THREE.Vector3(1,0,0))

geometry.faces.push(new THREE.Face3(0,1,2))

const Triangle = new THREE.Mesh(
   geometry,
   new THREE.MeshBasicMaterial({color:'green',wireframe:true})
)

export default Triangle