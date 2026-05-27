import { HDRLoader } from 'three/examples/jsm/Addons.js';
import * as THREE from 'three/webgpu'


export function getEnvMap(){
  const loader = new HDRLoader();
  const hdr = import.meta.env.BASE_URL + 'img/hdr/potsdamer_platz_1k.hdr'
  const envMap = loader.load( hdr );
  envMap.mapping = THREE.EquirectangularReflectionMapping;

  return envMap
}


export function getEnvMap2(){
  console.log(import.meta.env.BASE_URL);
  const path = import.meta.env.BASE_URL + 'img/skybox/sky_98_cubemap_2k/'
  const loader = new THREE.CubeTextureLoader().setPath( path );
  const cubeTexture = loader.load( [
    'px.png', 'nx.png', 'py.png', 'ny.png', 'pz.png', 'nz.png'
  ] );
  return cubeTexture
}