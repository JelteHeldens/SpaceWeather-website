import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';

// ========== SCENE SETUP ==========
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
var welcomeText = true;
var buttonOFF = true;
var planetDiv = document.getElementById("planet");

// ========== CAMERA POSITION ==========
const homeX = 0.64;
const homeY = 12;
const homeZ = 32.38;
const targetX = 19.84;
const targetY = 3.59;
const targetZ = 10.9;

camera.position.set(homeX,homeY,homeZ);
controls.target.set(targetX,targetY,targetZ);

function resetCamera(){
	homeButton.innerHTML = ``;
	planetDiv.innerHTML =``;
	buttonOFF = true;
	camera.position.set(homeX,homeY,homeZ);
	controls.target.set(targetX,targetY,targetZ);
}

// ========== CELESTIALS ==========
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
	arc.material.opacity = 0.04;
	arc.rotation.set(Math.PI / 2, 0, 0);

	return arc;
}

//	========== PLANETEN ==========
//	sizes (diameter/2): https://www.jpl.nasa.gov/_edu/pdfs/scaless_reference.pdf
//	distances: https://www.jpl.nasa.gov/_edu/pdfs/scaless_reference.pdf

const planets = new THREE.Group();
//	MERCURIUS: source: https://www.solarsystemscope.com/textures/
const mercurius = createPlanet('mercury', 2439, 57);
mercurius.name = "MERCURY";
planets.add(mercurius);
const mercuriusArc = createOrbit(57);
planets.add(mercurius);
scene.add( mercuriusArc );

//	VENUS: source: https://www.solarsystemscope.com/textures/
const venus = createPlanet('venus', 6051, 108);
venus.name = "VENUS";
planets.add(venus);
const venusArc = createOrbit(108);
scene.add( venusArc );

//	AARDE: source: https://www.solarsystemscope.com/textures/
const earth = createPlanet('earth', 6371, 149);
earth.name = "EARTH";
planets.add(earth);
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
mars.name = "MARS";
planets.add(mars);
const marsArc = createOrbit(228);
scene.add( marsArc );

//	JUPITER: source: https://www.solarsystemscope.com/textures/
const jupiter = createPlanet('jupyter', 69911, 780);
jupiter.name = "JUPITER";
planets.add(jupiter);
const jupiterArc = createOrbit(780);
scene.add( jupiterArc );

//	SATURNUS: source: https://www.solarsystemscope.com/textures/
const saturnus = createPlanet('saturn', 58232, 1437);
saturnus.name = "SATURN";
planets.add(saturnus);
const saturnusArc = createOrbit(1437);
scene.add( saturnusArc );

//const saturnusRingTexture = new THREE.TextureLoader().load('/img/celestials/saturnRing.png');
const saturnusRingGeometry = new THREE.RingGeometry( (136775/20000)+6, (136775/20000), 228 ); 
var saturnusRingMaterial = new THREE.ShaderMaterial({
  uniforms: {
    color1: {
      value: new THREE.Color().setHex(0xfde4bc)
    },
    color2: {
      value: new THREE.Color().setHex(0xE0AE62)
    }
  },
  vertexShader: `
    varying vec2 vUv;

    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
    }
  `,
  fragmentShader: `
    uniform vec3 color1;
    uniform vec3 color2;
  
    varying vec2 vUv;
    
    void main() {
      
      gl_FragColor = vec4(mix(color1, color2, vUv.y), 1.0);
    }
  `,
  side: THREE.DoubleSide
});
const saturnusRing = new THREE.Mesh( saturnusRingGeometry, saturnusRingMaterial );
saturnusRing.rotation.set(Math.PI / 2, Math.PI / 10, 0);
saturnusRing.position.set( 1437/10, 0, 0 );
planets.add(saturnusRing);

//	URANUS: source: https://www.solarsystemscope.com/textures/
const uranus = createPlanet('uranus', 25362, 2871);
uranus.name = "URANUS";
planets.add(uranus);
const uranusArc = createOrbit(2871);
scene.add( uranusArc );

//	NEPTUNUS: source: https://www.solarsystemscope.com/textures/
const neptunus = createPlanet('neptune', 24622, 4530);
neptunus.name = "NEPTUNE";
planets.add(neptunus);
const neptunusArc = createOrbit(4530);
scene.add( neptunusArc );


scene.add(planets);

// ========== STARS + SUN ==========
//	STARS
addStars(800);

//	SUN
const sunGeometry = new THREE.SphereGeometry( 695700/200000, 64, 64 ); 
const sunMaterial = new THREE.MeshBasicMaterial( { map: new THREE.TextureLoader().load('/img/celestials/sun.jpg') } ); 
const sun = new THREE.Mesh( sunGeometry, sunMaterial);
sun.name = "SUN";
scene.add( sun );


// ========== LIGHTING ==========
// 		const ambientLight = new THREE.AmbientLight(0xffffff);
// 		scene.add(ambientLight);

const sunLight = new THREE.PointLight( 0xffffff, 2, 0, 0 );
sunLight.position.set( 0, 0, 0 );
scene.add( sunLight );
const sunLightHelper = new THREE.PointLightHelper( sunLight, 0.1 );
scene.add( sunLightHelper );

// ========== RAYCASTING ==========

const raycaster = new THREE.Raycaster();

document.addEventListener('mousedown', onMouseDown);

function onMouseDown(event) {
	if(welcomeText){
		document.getElementById("welcomeLayer").innerHTML = ``;
		welcomeText = false;
	}
	const coords = new THREE.Vector2((event.clientX/renderer.domElement.clientWidth)*2-1,-((event.clientY/renderer.domElement.clientHeight)*2-1));

	raycaster.setFromCamera(coords, camera);

	const intersections = raycaster.intersectObjects(scene.children, true);
	if (intersections.length > 0 && buttonOFF) {
		const selectedObject = intersections[0].object;
		
		//	Camera wijzigen van locatie en target
		controls.target.set(selectedObject.position.x+selectedObject.geometry.parameters.radius/1.8, selectedObject.position.y, selectedObject.position.z+selectedObject.geometry.parameters.radius/1.4);
		camera.position.set(
		selectedObject.position.x-selectedObject.geometry.parameters.radius*1.2,
		selectedObject.position.y+selectedObject.geometry.parameters.radius/1.5,
		selectedObject.position.z+selectedObject.geometry.parameters.radius*1.2);
		
		//	UPDATE HTML:
		var homeButton = document.getElementById("homeButton");
		homeButton.innerHTML = `<button class="homeButton"><</button>`;
		document.getElementById("planet").innerHTML = `<div id="planetWeather">
				<div id="planetTitle"><h1>`+selectedObject.name+` WEATHER</h1></div>
				<div id="planetDescription"></div>
			</div>`;
		buttonOFF = false;
		homeButton.addEventListener("click", resetCamera);
		
		if (selectedObject.name == 'MARS'){
			getAPIurl();
		}
		else if (selectedObject.name == 'SUN'){
			document.getElementById("planetDescription").innerHTML =`<a>Very hot.</a><br><br><br><a id='bottomText'>*No existing API available.</a><br>`;
		}
		else if (selectedObject.name == 'MERCURY'){
			document.getElementById("planetDescription").innerHTML =`<a>Average temperature ~167°C</a><br><br>
			<a>Mercury is our closest planet to the sun.<br>It has no atmosphere, so temperatures vary between 430°C and -180°C </a><br><br>
			<br><a id='bottomText'>*No existing API available.</a><br>`;
		}
		else if (selectedObject.name == 'VENUS'){
			document.getElementById("planetDescription").innerHTML =`<a>Average temperature ~464°C</a><br><br>
			<a>Venus is the hottest planet in our solar system.<br>Its dense atmosphere acts as a greenhouse </a><br><br>
			<br><a id='bottomText'>*No existing API available.</a><br>`;
		}
		else if (selectedObject.name == 'EARTH'){
			document.getElementById("planetDescription").innerHTML =`<a>Average temperature ~15°C</a><br><br>
			<a>Many weather API's exist to gather temperatures on earth,<br> but i want to put our other planets in the spotlight :)</a><br><br>
			<br><a id='bottomText'>*API's exist, earth is not the focus here.</a><br>`;
		}
		else if (selectedObject.name == 'JUPITER'){
			document.getElementById("planetDescription").innerHTML =`<a>Average temperature ~-110°C</a><br><br>
			<a>Fun fact:<br>Jupiter has the shortest day in the solar system at 10 hours.</a><br><br>
			<br><a id='bottomText'>*No existing API available.</a><br>`;
		}
		else if (selectedObject.name == 'SATURN'){
			document.getElementById("planetDescription").innerHTML =`<a>Average temperature ~-140°C</a><br><br>
			<a>Fun fact:<br>Saturn has a hexagon-shaped north pole.</a><br><br>
			<br><a id='bottomText'>*No existing API available.</a><br>`;
		}
		else if (selectedObject.name == 'URANUS'){
			document.getElementById("planetDescription").innerHTML =`<a>Average temperature ~-195°C</a><br><br>
			<a>Fun fact:<br>Uranus rotates at a nearly 90-degree angle from the plane of its orbit.</a><br><br>
			<br><a id='bottomText'>*No existing API available.</a><br>`;
		}
		else if (selectedObject.name == 'NEPTUNE'){
			document.getElementById("planetDescription").innerHTML =`<a>Average temperature ~-200°C</a><br><br>
			<a>Fun fact:<br>In 2011, Neptune completed its first 165-year orbit of the Sun since its discovery.</a><br><br>
			<br><a id='bottomText'>*No existing API available.</a><br>`;
		}
	}
}

// ========== MARS API CALL ==========
//	Put your own API key in API-KEY.txt :)
function getAPIurl(){
	fetch("API-KEY.txt")
	.then((res) => res.text())
	.then((text) => {
		loadMarsAPI('https://api.nasa.gov/insight_weather/?api_key='+text+'&feedtype=json&ver=1.0');
	})
	.catch((e) => console.error(e));
}

function loadMarsAPI(url){
	fetch(url)
	.then(res => res.json())
	.then(out => updateMars(out))
	.catch(err => console.log(err));
}

function updateMars(data){
	//console.log(data);
	let avSUM = 0;
	let c = 0;
	try {
		for (let key in data) {
			let av = data[key].AT.av;
			avSUM += av;
			c+=1;
			console.log(`Key: ${key}, AT average: ${av}`);
		}
	} catch (error) {
		console.warn("An error occurred, but it was ignored:", error);
	}
	document.getElementById("planetDescription").innerHTML =`<a> Average surface temperature = `+(((avSUM/c)-32)*(5/9)).toFixed(1)+`°C</a>
	<br><br><br><a id='bottomText'>*Data is gathered from Nasa InSight API.</a><br>`;
}

// ========== ANIMATION LOOP ==========

function animate() {
	controls.update();
	//	speed relative to earth, source NASA: https://spacemath.gsfc.nasa.gov/sun/4Page1.pdf
	sun.rotation.y += 0.00045;
	
	//	speeds relative to earth, source: https://www.worldatlas.com/space/how-fast-does-each-planet-spin.html
	mercurius.rotation.y += 0.000207;
	venus.rotation.y += 0.00005;
	earth.rotation.y += 0.0005;
	mars.rotation.y += 0.00049;
	jupiter.rotation.y += 0.0012;
	saturnus.rotation.y += 0.00114;
	uranus.rotation.y += 0.0007;
	neptunus.rotation.y += 0.00075;
	
	renderer.render( scene, camera );
	//console.log(camera.position.x, camera.position.y, camera.position.z);
	//console.log(mars.position.x, mars.position.y, mars.position.z)
}
renderer.setAnimationLoop( animate );

renderer.render( scene, camera );