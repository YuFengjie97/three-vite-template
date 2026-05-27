import {renderer, scene, camera} from '@/world/scene'
import * as THREE from 'three/webgpu'
import {pass, uniform} from 'three/tsl'
import { bloom } from 'three/examples/jsm/tsl/display/BloomNode.js';
import { pane } from '@/utils/pane';

export function getRenderPipeline() {

  const renderPipeline = new THREE.RenderPipeline(renderer);
  const scenePass = pass(scene, camera);
  const scenePassColor = scenePass.getTextureNode("output");
  const bloomPass = bloom(scenePassColor, .3, .2, .8);
  renderPipeline.outputNode = scenePassColor.add(bloomPass);

  
  // const f = pane!.addFolder({title: 'bloom', expanded: false})
  // f!.addBinding(bloomPass.strength, 'value', {label: 'strength', min: 0, max:1})
  // f!.addBinding(bloomPass.radius, 'value', {label: 'radius', min: 0, max:1})
  // f!.addBinding(bloomPass.threshold, 'value', {label: 'threshold', min: 0, max:1})


  return {renderPipeline}
}