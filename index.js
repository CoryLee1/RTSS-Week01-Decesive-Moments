/*
This example uses a function named "loop" to tell the renderer to render. This function will call
the  'window.requestAnimationFrame()' function to tell the browser window to continue drawing 
at 60 frames per second.  

RequestAnimationFrame: https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame

*/
document.addEventListener('DOMContentLoaded', function () {
  const aboutButton = document.querySelector('.text-wrapper-3'); // 根据实际的类名调整
  const infoCard = document.getElementById('infoCard');

  aboutButton.addEventListener('click', function () {
      infoCard.style.display = infoCard.style.display === 'none' ? 'block' : 'none';
  });

  infoCard.addEventListener('click', function () {
      infoCard.style.display = 'none';
  });
});




import * as THREE from "three";
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
// create a scene in which all other objects will exist
let scene = new THREE.Scene();
// Texture loader to load the image
let textureLoader = new THREE.TextureLoader();

// create a camera and position it in space
let aspect = window.innerWidth / window.innerHeight;
let camera = new THREE.PerspectiveCamera(75, aspect, 0.1, 1000);
camera.position.z = 5; // place the camera in space

// the renderer will actually show the camera view within our <canvas>
let renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

textureLoader.load(
  'img/anger.png', // Replace with your image path
  function (texture) {
    // Once the texture is loaded, create the plane material with this texture
    let material1 = new THREE.MeshBasicMaterial({ map: texture });
    
    // Then create the plane using the geometry and textured material
    let geometry1 = new THREE.PlaneGeometry(10, 7, 4);
    let my3DObject1 = new THREE.Mesh(geometry1, material1);

    // Add the plane to the scene
    scene.add(my3DObject1);

    // Start the animation loop
    loop();
  },
  undefined,
  function (err) {
    console.error('An error happened while loading the texture.', err);
  }
);
// create a sphere
let geometry = new THREE.SphereGeometry(0.2, 0.2, 16);

let material = new THREE.MeshBasicMaterial({ color: "blue" });

let my3DObject = new THREE.Mesh(geometry, material);
let my3DObject1 = new THREE.Mesh(geometry, material);
let my3DObject2 = new THREE.Mesh(geometry, material);
let my3DObject3 = new THREE.Mesh(geometry, material);
console.log(my3DObject.position);
my3DObject.position.set(-2.3,0.3,0.5);
my3DObject1.position.set(-2.3,1.2,0.5);
my3DObject2.position.set(-3.5,1.4,0.5);
my3DObject3.position.set(-3.5,0.9,0.5);
// and add it to the scene
scene.add(my3DObject);
scene.add(my3DObject1);
scene.add(my3DObject2);
scene.add(my3DObject3);

// Create OrbitControls to allow interactive camera movement
let controls = new OrbitControls(camera, renderer.domElement);

// Restrict the angle so the camera can't go below the plane
controls.maxPolarAngle = Math.PI / 2;
controls.minPolarAngle = Math.PI / 3; // Adjust this value as needed

// Add damping for smooth interaction
controls.enableDamping = true;
controls.dampingFactor = 0.1;
function loop() {
  // add some movement
  my3DObject.rotateY(0.01);
  my3DObject1.rotateY(0.01);
  my3DObject2.rotateY(0.01);
  my3DObject3.rotateY(0.01);
  controls.update();
  // finally, take a picture of the scene and show it in the <canvas>
  renderer.render(scene, camera);

  window.requestAnimationFrame(loop); // pass the name of your loop function into this function
}
loop();
