import * as THREE from 'three'
import { VRButton } from 'three/addons/webxr/VRButton.js';
import { BoxLineGeometry } from 'three/addons/geometries/BoxLineGeometry.js';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x505050);
scene.fog = new THREE.Fog(0x2a3b4c, 0, 30); // fog effect

//create camera
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight
);

//create renderer
const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement)

//create geometry
const geometry = new THREE.BoxGeometry(1, 1, 1);
//create material
const material = new THREE.MeshLambertMaterial();
//create mesh
const cube = new THREE.Mesh(geometry, material);
cube.position.y = 1;
cube.position.z = -5;

scene.add(cube);

//create plane;
// const helper = new THREE.GridHelper( 20, 30, 'skyblue', 'skyblue');
// scene.add( helper );

// Adding lights
const directionalLight = new THREE.DirectionalLight( 0xffffff, 5.0 );
scene.add( directionalLight );

const ambientLight = new THREE.AmbientLight( 0xffffff, 0.5 );
//scene.add( ambientLight );

const pointLightYellow = new THREE.PointLight( 0xd9f512, 5, 3 );
pointLightYellow.position.set( 0.6, 0, -5.0 );
scene.add( pointLightYellow );

const pointLightGreen = new THREE.PointLight( 0x02FA70, 5, 3 );
pointLightGreen.position.set( -0.6, 0, -5.0 );
scene.add( pointLightGreen );

// Helpers
//const sphereSize = 1;
//const pointLightHelper = new THREE.PointLightHelper( pointLightYellow, sphereSize );
//scene.add( pointLightHelper );

// Create room
const room = new THREE.LineSegments(
  new BoxLineGeometry( 8, 8, 8, 10, 10, 10 ),
  new THREE.LineBasicMaterial( { color: 0x808080 } )
);

room.geometry.translate( 0, 3, -2.5 );
scene.add( room );

camera.position.y = 2;

// Add texture
const loader = new THREE.TextureLoader()
loader.load('../assets/texture.jpg', texture => {
  material.map = texture;
  animate();
});

// Create VRButton 
document.body.appendChild( VRButton.createButton( renderer ) );
// Enable XR render
renderer.xr.enabled = true;

// Animation
const animate = () => {
  renderer.setAnimationLoop(animate); //repetitive cycle to repeat animation for WebXR projects
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  //cube.rotation.z += 0.01;
  renderer.render(scene, camera);
}
