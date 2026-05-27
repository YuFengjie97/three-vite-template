import * as THREE from 'three/webgpu'
import { OrbitControls } from 'three/examples/jsm/Addons.js'
import {emitter} from '../utils/emitter'

export let scene: THREE.Scene
export let renderer: THREE.WebGPURenderer
export let camera: THREE.PerspectiveCamera
export let timer: THREE.Timer
export let control: OrbitControls

export async function initScene() {
  const container = document.querySelector('#app')
  scene = new THREE.Scene()
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, .1, 1000)

  if(!container) return


  renderer = new THREE.WebGPURenderer({ antialias: true })
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.toneMapping = THREE.NeutralToneMapping;
  container.appendChild(renderer.domElement)

  // await renderer.init()

  control = new OrbitControls(camera)
  control.enableDamping=true
  control.dampingFactor = 0.05;
  control.connect(renderer.domElement)


  timer = new THREE.Timer()

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
  })

  function animate() {
    control.update()
    timer.update()

    emitter.emit('animate', {
      delta: timer.getDelta(),
      elapsed: timer.getElapsed()
    })

    renderer.render(scene, camera)
  }

  // 使用setAnimationLoop会自动在第一帧init webgpuRender,如果是window.requestAnimationFrame() 要手动init
  renderer.setAnimationLoop(animate)
}




