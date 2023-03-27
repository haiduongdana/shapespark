import * as THREE from 'three.min.js';
import { OrbitControls } from 'https://unpkg.com/three@0.127.0/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'https://unpkg.cthree.module.jsom/three@0.127.0/examples/jsm/loaders/GLTFLoader.js';
 
var scene, camera, renderer, cube, controls, draughts, board;
 

 
function init() {
  draughts = new Draughts();
 
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
 
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
 
  
 
  const loader = new GLTFLoader();
  loader.load( 'sofa.obj', function ( gltf ) {
    const checkerMesh = gltf.scene.children.find((child) => child.name === "Checker");
    checkerMesh.scale.set(checkerMesh.scale.x * 0.4, checkerMesh.scale.y * 0.4, checkerMesh.scale.z * 0.4);
    checkerMesh.geometry.computeBoundingBox();
    console.log(checkerMesh.geometry.boundingBox);
    checkerMesh.position.y += checkerMesh.scale.y + 0.05;
    addCheckers(checkerMesh);
  }, undefined, function ( error ) {
 
    console.error( error );
 
  } );
 
  camera.position.y = 8;
 
  camera.position.set(4.5, 5, 4.5);
  camera.lookAt(5, 0, 5);
 
  controls = new OrbitControls(camera, renderer.domElement);
 
  controls.target.set(4.5, 0, 4.5);
  controls.enablePan = false;
  controls.maxPolarAngle = Math.PI / 2;
 
  controls.enableDamping = true;
 
  window.requestAnimationFrame(animate);
}
 
function animate() {
  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(animate);
}
 
animate()
 
window.addEventListener('resize', onWindowResize);
 
window.onload = init;
