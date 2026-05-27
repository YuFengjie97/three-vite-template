import './style.css'
import { initCube } from './world/cube'
import { initScene, scene, camera } from './world/scene'
import * as THREE from 'three'
import {getEnvMap, getEnvMap2} from './world/skybox'

(async() => {

  await initScene()
  camera.position.set(0,1,10)

  scene.background = new THREE.Color(0x330000)

  const axesHelper = new THREE.AxesHelper(10)
  scene.add(axesHelper)

  const envMap = getEnvMap()
  scene.environment = envMap
  scene.background = envMap
  scene.backgroundBlurriness = 0.5;
  scene.backgroundIntensity = .3;
  scene.environmentIntensity = 0.5;


  initCube()

})()