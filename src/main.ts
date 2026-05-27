import './style.css'
import { initCube } from './world/cube'
import { initScene, scene, camera } from './world/scene'
import * as THREE from 'three'
import {setEnv} from './world/env'

(async() => {
  await initScene()
  camera.position.set(0,1,10)
  scene.background = new THREE.Color(0x330000)

  const axesHelper = new THREE.AxesHelper(10)
  scene.add(axesHelper)

  setEnv()


  initCube()
})()