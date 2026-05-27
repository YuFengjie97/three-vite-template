import {scene} from './scene'
import * as THREE from 'three/webgpu'
import { emitter } from '../utils/emitter'
import { Fn, mx_noise_float, mx_noise_vec3, positionLocal, smoothstep, time } from 'three/tsl'


export function initCube(){
  const geo = new THREE.BoxGeometry(5,5,5,10,10,10)
  const mat = new THREE.MeshPhysicalNodeMaterial()

  mat.roughness = .5
  mat.metalness = 1

  mat.positionNode = Fn(() => {
    const offset = mx_noise_vec3(positionLocal.mul(.2))
    const offsetStr = smoothstep(0, 1, mx_noise_float(positionLocal.mul(.2).add(time)))
    return positionLocal.add(offset.mul(offsetStr))
  })()


  const mesh = new THREE.Mesh(geo, mat)

  scene.add(mesh)

  emitter.on('animate', ({delta}) => {
    // mesh.rotation.x += delta * 2
    // mesh.rotation.y += delta * 2
  })
}

