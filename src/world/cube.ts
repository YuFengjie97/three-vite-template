import {scene} from './scene'
import * as THREE from 'three/webgpu'
import { emitter } from '../utils/emitter'
import { Fn, mx_noise_vec3, positionLocal, time } from 'three/tsl'

let geo: THREE.BoxGeometry
let mat: THREE.MeshBasicNodeMaterial
let mesh: THREE.Mesh

export function initCube(){
  geo = new THREE.BoxGeometry()
  mat = new THREE.MeshBasicNodeMaterial()

  mat.positionNode = Fn(() => {
    const offset = mx_noise_vec3(positionLocal.add(time))
    positionLocal.addAssign(offset)
    return positionLocal
  })()


  mesh = new THREE.Mesh(geo, mat)

  scene.add(mesh)

  emitter.on('animate', ({delta}) => {
    mesh.rotation.x += delta * 2
    mesh.rotation.y += delta * 2
  })
}

