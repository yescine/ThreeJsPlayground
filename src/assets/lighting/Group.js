import * as THREE from 'three'

const Group = new THREE.Group()

const simpleMaterial = new THREE.MeshBasicMaterial()

const sphere = new THREE.Mesh(
   new THREE.SphereBufferGeometry(0.5,16,16),
   simpleMaterial
)
sphere.position.set(0,1,0)

const plane = new THREE.Mesh(
   new THREE.PlaneBufferGeometry(4,4),
   simpleMaterial
)
plane.rotation.x=-Math.PI/2

Group.add(sphere,plane)

export default Group