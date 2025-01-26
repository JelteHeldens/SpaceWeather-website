import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';

//Setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
const renderer = new THREE.WebGLRenderer({
	canvas: document.querySelector('#canvas'),
});
renderer.setSize( window.innerWidth, window.innerHeight );
window.addEventListener( 'resize', onWindowResize, false );
function onWindowResize(){

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

}
const controls = new OrbitControls( camera, renderer.domElement );

camera.position.setZ(20);
controls.target = new THREE.Vector3(9,1,2);
//camera.lookAt(9,1,2);

//Scene bekleding
scene.background = new THREE.Color( 0x07000F);

//	sterren
function random() {
   return Math.floor(Math.random() * 2) || -1;
}
function addStars(n){
	for(let i=0; i<n; i++){
		const geometry = new THREE.SphereGeometry(THREE.MathUtils.randFloat(0,0.5), 16, 16);
		const material = new THREE.MeshStandardMaterial({color:0xffffff});
		const star = new THREE.Mesh(geometry, material);
		
		star.position.set(
			THREE.MathUtils.randFloat(5,80)*random(),
			THREE.MathUtils.randFloat(5,80)*random(),
			THREE.MathUtils.randFloat(5,80)*random()
		);
		scene.add(star);
	}
}


//	MARS: source: https://planetpixelemporium.com/mars.html# 
const marsTexture = new THREE.TextureLoader().load('/img/celestials/mars.jpg');
const marsNormal  = new THREE.TextureLoader().load('/img/celestials/mars_normal.jpg');
const mars = new THREE.Mesh(
	new THREE.SphereGeometry(10, 64, 64),
	new THREE.MeshStandardMaterial({ map: marsTexture, normalMap: marsNormal})
);

scene.add( mars );
addStars(80);


//Belichting
const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(ambientLight);

function animate() {
	controls.update();
	mars.rotation.y += 0.001;
	mars.rotation.x += 0.00005;
	mars.rotation.z += 0.00005;
	renderer.render( scene, camera );
	//console.log(camera.position.x, camera.position.y, camera.position.z);
	//console.log(mars.position.x, mars.position.y, mars.position.z)
}
renderer.setAnimationLoop( animate );


renderer.render( scene, camera );