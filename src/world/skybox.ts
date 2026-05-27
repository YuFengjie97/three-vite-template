import { HDRLoader } from 'three/examples/jsm/Addons.js';
import * as THREE from 'three/webgpu'
import hdr from '/img/hdr/potsdamer_platz_1k.hdr?url'


export function getEnvMap(){
  const loader = new HDRLoader();
  const envMap = loader.load( hdr );
  envMap.mapping = THREE.EquirectangularReflectionMapping;

  return envMap
}


export function getEnvMap2(){
  const loader = new THREE.CubeTextureLoader().setPath( '/img/skybox/sky_98_cubemap_2k/' );
  const cubeTexture = loader.load( [
    'px.png', 'nx.png', 'py.png', 'ny.png', 'pz.png', 'nz.png'
  ] );
  return cubeTexture
}