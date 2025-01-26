import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';

//Setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 50000 );
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

camera.position.setX(-15);
camera.position.setY(10);
camera.position.setZ(24);
//controls.target = new THREE.Vector3(9,1,2);
//camera.lookAt(9,1,2);

//Scene bekleding
//scene.background = new THREE.Color( 0x07000F);

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
			THREE.MathUtils.randFloat(5,1000)*random(),
			THREE.MathUtils.randFloat(5,1000)*random(),
			THREE.MathUtils.randFloat(5,1000)*random()
		);
		scene.add(star);
	}
}

function createPlanet(name, size, distance){
	const texture = new THREE.TextureLoader().load('/img/celestials/'+name+'.jpg');
	const planet = new THREE.Mesh(
		new THREE.SphereGeometry(size/10000, 64, 64),
		new THREE.MeshStandardMaterial({ map: texture})
	);
	planet.position.set( distance/10, 0, 0 );
	return planet;
}

function createOrbit(radius){
	const arcGeometry = new THREE.RingGeometry( (radius/10)+(radius/2000), (radius/10)-(radius/2000), 228 ); 
	const arcMaterial = new THREE.MeshBasicMaterial( { color: 0xBCBCBC, side: THREE.DoubleSide} );
	const arc = new THREE.Mesh( arcGeometry, arcMaterial );
	arc.material.transparent = true;
	arc.material.opacity = 0.02;
	arc.rotation.set(Math.PI / 2, 0, 0);

	return arc;
}

//	PLANETEN
//	MERCURIUS: source: https://www.solarsystemscope.com/textures/
const mercurius = createPlanet('mercury', 2439, 57);
scene.add( mercurius );
const mercuriusArc = createOrbit(57);
scene.add( mercuriusArc );

//	VENUS: source: https://www.solarsystemscope.com/textures/
const venus = createPlanet('venus', 6051, 108);
scene.add( venus );
const venusArc = createOrbit(108);
scene.add( venusArc );

//	AARDE: source: https://www.solarsystemscope.com/textures/
const earth = createPlanet('earth', 6371, 149);
scene.add( earth );
const earthArc = createOrbit(149);
scene.add( earthArc );

//	MARS: source: https://planetpixelemporium.com/mars.html# 
const marsTexture = new THREE.TextureLoader().load('/img/celestials/mars.jpg');
const marsNormal  = new THREE.TextureLoader().load('/img/celestials/mars_normal.jpg');
const mars = new THREE.Mesh(
	new THREE.SphereGeometry(3389/10000, 64, 64),
	new THREE.MeshStandardMaterial({ map: marsTexture, normalMap: marsNormal})
);
mars.position.set( 228/10, 0, 0 );
scene.add( mars );
const marsArc = createOrbit(228);
scene.add( marsArc );

//	JUPITER: source: https://www.solarsystemscope.com/textures/
const jupiter = createPlanet('jupyter', 69911, 780);
scene.add( jupiter );
const jupiterArc = createOrbit(780);
scene.add( jupiterArc );

//	SATURNUS: source: https://www.solarsystemscope.com/textures/
const saturnus = createPlanet('saturn', 58232, 1437);
scene.add( saturnus );
const saturnusArc = createOrbit(1437);
scene.add( saturnusArc );

//const saturnusRingTexture = new THREE.TextureLoader().load('/img/celestials/saturnRing.png');
const saturnusRingGeometry = new THREE.RingGeometry( (136775/20000)+6, (136775/20000), 228 ); 
//const saturnusRingMaterial = new THREE.MeshStandardMaterial({ map: saturnusRingTexture, side: THREE.DoubleSide})
const saturnusRingMaterial = new THREE.MeshBasicMaterial( { color: 0xfde4bc, side: THREE.DoubleSide } );
const saturnusRing = new THREE.Mesh( saturnusRingGeometry, saturnusRingMaterial );
saturnusRing.rotation.set(Math.PI / 2, Math.PI / 10, 0);
saturnusRing.position.set( 1437/10, 0, 0 );
scene.add( saturnusRing );

//	URANUS: source: https://www.solarsystemscope.com/textures/
const uranus = createPlanet('uranus', 25362, 2871);
scene.add( uranus );
const uranusArc = createOrbit(2871);
scene.add( uranusArc );

//	NEPTUNUS: source: https://www.solarsystemscope.com/textures/
const neptunus = createPlanet('neptune', 24622, 4530);
scene.add( neptunus );
const neptunusArc = createOrbit(4530);
scene.add( neptunusArc );

//	STARS
addStars(800);

//	SUN
const sunGeometry = new THREE.SphereGeometry( 695700/200000, 32, 32 ); 
const sunMaterial = new THREE.MeshBasicMaterial( { map: new THREE.TextureLoader().load('/img/celestials/sun.jpg') } ); 
const sun = new THREE.Mesh( sunGeometry, sunMaterial );
scene.add( sun );


//	Belichting
// 		const ambientLight = new THREE.AmbientLight(0xffffff);
// 		scene.add(ambientLight);

const sunLight = new THREE.PointLight( 0xffffff, 2, 0, 0 );
sunLight.position.set( 0, 0, 0 );
scene.add( sunLight );
const sunLightHelper = new THREE.PointLightHelper( sunLight, 0.1 );
scene.add( sunLightHelper );


//	SKYBOX
/*const skyboxLoader = new THREE.CubeTextureLoader();
skyboxLoader.setPath( '/img/skybox/' );
const textureCube = skyboxLoader.load( [
	'px.png', 'nx.png',
	'py.png', 'ny.png',
	'pz.png', 'nz.png'
] );
const skyboxMaterial = new THREE.MeshBasicMaterial( {
	color: 0xffffff,
	envMap: textureCube,
	side: THREE.BackSide
} );
const skyboxGeometry = new THREE.BoxGeometry( 10000, 10000, 10000 );
const skybox = new THREE.Mesh( skyboxGeometry, skyboxMaterial );
scene.add( skybox );*/


function animate() {
	controls.update();
	mars.rotation.y += 0.001;
	mars.rotation.x += 0.00005;
	mars.rotation.z += 0.00005;
	
	earth.rotation.y += 0.001;
	
	sun.rotation.y += 0.001;
	sun.rotation.x += 0.00005;
	sun.rotation.z += 0.00005;
	renderer.render( scene, camera );
	//console.log(camera.position.x, camera.position.y, camera.position.z);
	//console.log(mars.position.x, mars.position.y, mars.position.z)
}
renderer.setAnimationLoop( animate );


renderer.render( scene, camera );