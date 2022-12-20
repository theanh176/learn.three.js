import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "dat.gui";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js";

import negx from "../images2/negx.jpg";
import negy from "../images2/negy.jpg";
import negz from "../images2/negz.jpg";
import posx from "../images2/posx.jpg";
import posy from "../images2/posy.jpg";
import posz from "../images2/posz.jpg";
import univ from "../images/univ_black.jpg";

//renderer
const renderer = new THREE.WebGLRenderer();

renderer.shadowMap.enabled = true;

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

//scene
const scene = new THREE.Scene();

//camera
const camera = new THREE.PerspectiveCamera(
	70,
	window.innerWidth / window.innerHeight,
	0.1,
	1000
);

const orbit = new OrbitControls(camera, renderer.domElement);

const axesHelper = new THREE.AxesHelper(30);
scene.add(axesHelper);

camera.position.set(-5, 0, 0);

// camera speed and slow motion
orbit.enableZoom = false;
orbit.rotateSpeed = 0.4;

// view camera mouse move and click mouse move camera follow mouse move 


orbit.update();

const boxGeometry = new THREE.BoxGeometry();
const boxMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const box = new THREE.Mesh(boxGeometry, boxMaterial);
// scene.add(box);

const planeGeometry = new THREE.PlaneGeometry(30, 30);
const planeMaterial = new THREE.MeshStandardMaterial({
	color: 0xffff00,
	side: THREE.DoubleSide,
});
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.rotation.x = -Math.PI / 2;
// scene.add(plane);
plane.receiveShadow = true;

const gridHelper = new THREE.GridHelper(30, 30);
// scene.add(gridHelper);

// Hình tròn 1
const sphereGeometry = new THREE.SphereGeometry(10, 50, 50);
const sphereMaterial = new THREE.MeshStandardMaterial({
	color: 0xff0000,
	wireframe: false,
});
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
sphere.position.set(0, 0, 0);
// scene.add(sphere);
sphere.castShadow = true;

// Hình tròn 2
const sphereMaterial2 = new THREE.MeshStandardMaterial({
	// màu vàng
	color: 0xffff00,
	wireframe: false,
});
const sphere2 = new THREE.Mesh(sphereGeometry, sphereMaterial2);
sphere2.position.set(-35, 0, 0);
scene.add(sphere2);
sphere2.castShadow = true;

// Hình tròn 3
const sphereMaterial3 = new THREE.MeshStandardMaterial({
	// Màu xanh
	color: 0x0000ff,
	wireframe: false,
});
const sphere3 = new THREE.Mesh(sphereGeometry, sphereMaterial3);
sphere3.position.set(0, 0, 35);
scene.add(sphere3);
sphere3.castShadow = true;

// Hình tròn 4
const sphere4 = new THREE.Mesh(sphereGeometry, sphereMaterial);
sphere4.position.set(0, 0, -35);
scene.add(sphere4);
sphere4.castShadow = true;

// Hình tròn 5
// const sphere5 = new THREE.Mesh(sphereGeometry, sphereMaterial);
// sphere5.position.set(35, 0, 0);
// scene.add(sphere5);
// sphere5.castShadow = true;

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

// const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
// directionalLight.position.set(-30, 50, 0);
// scene.add(directionalLight);
// directionalLight.castShadow = true;
// directionalLight.shadow.camera.bottom = -12;

// const dLightHelper = new THREE.DirectionalLightHelper(directionalLight, 5);
// scene.add(dLightHelper);

// const dLightShadowHelper = new THREE.CameraHelper(
//     directionalLight.shadow.camera
// );
// scene.add(dLightShadowHelper);

const spotLight = new THREE.SpotLight(0xffffff);
spotLight.position.set(-100, 100, 0);
scene.add(spotLight);
spotLight.castShadow = true;
spotLight.angle = 0.2;

const sLightHelper = new THREE.SpotLightHelper(spotLight);
// scene.add(sLightHelper);

// scene.fog = new THREE.Fog(0xffffff, 0, 200);
scene.fog = new THREE.FogExp2(0xffffff, 0.01);

const textureLoader = new THREE.TextureLoader();
// const texture = textureLoader.load(negx);

// renderer.setClearColor(0xffffff, 1);
const cubeTextureLoader = new THREE.CubeTextureLoader();
scene.background = cubeTextureLoader.load([posx, negx, posy, negy, posz, negz]);
// scene.background = cubeTextureLoader.load([univ, univ, univ, univ, univ, univ]);

// khi thả chuột thì màn hình sẽ trở về ban đầu
renderer.domElement.addEventListener("click", () => {
	// log vị trí camera khi click chuột
	console.log(camera.position);

	//Nhìn xanh
	if (
		-3.5 < camera.position.x < 3.5 &&
		camera.position.z < -3.5
		// ||
		// camera.position.z < -3.5 ||
		// camera.position.z > 3.5
	) {
		camera.position.set(0, 0, -5);
	}

	//Nhìn vàng
	if (-3.5 < camera.position.z < 3.5 && camera.position.x > 3.5) {
		camera.position.set(5, 0, 0);
	}

	//Nhìn đỏ
	if (-3.5 < camera.position.x < 3.5 && camera.position.z > 3.5) {
		camera.position.set(0, 0, 5);
	}

	//Nhìn hộp
	if (-3.5 < camera.position.z < 3.5 && camera.position.x < -3.5) {
		camera.position.set(-5, 0, 0);
	}
	camera.lookAt(0, 0, 0);
});

const box2Geometry = new THREE.BoxGeometry(15, 30, 15);
const box2Material = new THREE.MeshStandardMaterial({
	// color: 0x00ff00,
	map: textureLoader.load(negx),
});
const box2MultiMaterial = [
	new THREE.MeshStandardMaterial({ map: textureLoader.load(negx) }),
	new THREE.MeshStandardMaterial({ map: textureLoader.load(posx) }),
	new THREE.MeshStandardMaterial({ map: textureLoader.load(negy) }),
	new THREE.MeshStandardMaterial({ map: textureLoader.load(posy) }),
	new THREE.MeshStandardMaterial({ map: textureLoader.load(negz) }),
	new THREE.MeshStandardMaterial({ map: textureLoader.load(posz) }),
];

const box2 = new THREE.Mesh(box2Geometry, box2MultiMaterial);
box2.position.set(35, 0, 0);
scene.add(box2);
box2.material.map = textureLoader.load(negx);

const plane2Geometry = new THREE.PlaneGeometry(10, 10, 10, 10);
const plane2Material = new THREE.MeshStandardMaterial({
	color: 0xffff00,
	wireframe: true,
});
const plane2 = new THREE.Mesh(plane2Geometry, plane2Material);
plane2.position.set(10, 10, 15);
// scene.add(plane2);

plane2.geometry.attributes.position.array[0] -= 10 * Math.random();
plane2.geometry.attributes.position.array[1] -= 10 * Math.random();
plane2.geometry.attributes.position.array[2] -= 10 * Math.random();
const lastPoint = plane2.geometry.attributes.position.array.length - 1;
plane2.geometry.attributes.position.array[lastPoint] -= 10 * Math.random();

const sphere2Geometry = new THREE.SphereGeometry(4);

// const vShader = `
//     void main() {
//         gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
//     }
// `;

// const fShade = `
//     void main() {
//         gl_FragColor = vec4(0.5 0.5, 1.0, 1.0);
//     }
// `;

// const sphere2Material = new THREE.MeshStandardMaterial({
// 	vertexShader: document.getElementById("vertexShader").textContent,
// 	fragmentShader: document.getElementById("fragmentShader").textContent,
// });
// const sphere2 = new THREE.Mesh(sphere2Geometry, sphere2Material);
// scene.add(sphere2);

const gui = new dat.GUI();

const options = {
	sphereColor: 0xff0000,
	wireframe: false,
	speed: 0.01,
	angle: 0.8,
	penumbra: 0,
	intensity: 1,
};

// gui.addColor(options, "sphereColor").onChange((e) => {
// 	sphere.material.color.set(e);
// });

// gui.add(options, "wireframe").onChange((e) => {
// 	sphere.material.wireframe = e;
// });

gui.add(options, "speed", 0, 0.1, 0.01);
gui.add(options, "angle", 0, 1);
gui.add(options, "penumbra", 0, 1);
gui.add(options, "intensity", 0, 1);

let step = 0;

const mousePosition = new THREE.Vector2();

// window.addEventListener("mousemove", (e) => {
// 	mousePosition.x = (e.clientX / window.innerWidth) * 2 - 1;
// 	mousePosition.y = -(e.clientY / window.innerHeight) * 2 + 1;
// });

const raycaster = new THREE.Raycaster();

const sphereId = sphere.id;
box2.name = "theBox";

function animate(time) {
	box.rotation.x = time / 1000;
	box.rotation.y = time / 1000;

	// step += options.speed;
	// sphere.position.y = 10 * Math.abs(Math.sin(step));

	spotLight.angle = options.angle;
	spotLight.penumbra = options.penumbra;
	spotLight.intensity = options.intensity;
	sLightHelper.update();

	raycaster.setFromCamera(mousePosition, camera);
	const intersects = raycaster.intersectObjects(scene.children);
	// console.log(intersects);

	// for (let i = 0; i < intersects.length; i++) {
	// 	if (intersects[i].object.name === "theBox") {
	// 		// Click vào box thì hiện text
	// 		document.getElementById("text").style.display = "block";
	// 		console.log(1);
	// 	} else {
	// 		document.getElementById("text").style.display = "none";
	// 		console.log(2);
	// 	}
	// }

	// box2.rotation.x = time / 1000;
	box2.rotation.y = time / 3500;

	plane2.geometry.attributes.position.array[0] = 10 * Math.random();
	plane2.geometry.attributes.position.array[1] = 10 * Math.random();
	plane2.geometry.attributes.position.array[2] = 10 * Math.random();
	plane2.geometry.attributes.position.array[lastPoint] = 10 * Math.random();

	plane2.geometry.attributes.position.needsUpdate = true;

	renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);

window.addEventListener("resize", () => {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth, window.innerHeight);
});
