import * as THREE from 'three'

const Cubies = new THREE.Group()

let cube1 = new THREE.Mesh(
   new THREE.BoxGeometry(0.2,0.2,0.2),
   new THREE.MeshBasicMaterial({color:'cyan'})
)
cube1.position.set(-1,1,0)

let cube2 = new THREE.Mesh(
   new THREE.BoxGeometry(0.2,0.2,0.2),
   new THREE.MeshBasicMaterial({color:'cyan'})
)
cube2.position.set(-1,-1,0)
 

Cubies.add(cube1)
Cubies.add(cube2)

export default Cubies
