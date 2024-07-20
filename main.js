import * as T from "three";
import gsap from "gsap";
import { OrbitControls } from "three/examples/jsm/Addons.js";
import { GLTFLoader } from "three/examples/jsm/Addons.js";
import "/style.css"

const scene = new T.Scene();
const camera = new T.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
const loader = new GLTFLoader().setPath("./model/");
const renderer = new T.WebGLRenderer({ antialias: true });

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;

const controls = new OrbitControls(camera, renderer.domElement)
camera.position.set(200, 60, 0)
controls.enablePan = false;
controls.minPolarAngle = 1.2;
controls.maxPolarAngle = 1.6;
controls.update()

document.addEventListener("DOMContentLoaded", () => {
  window.start = () => {
    document.querySelector(".bg-black").classList.add("hidden")
    gsap.to(camera.position, {
      x: 35,
      y: 3,
      z: 50,
      duration: 2,
      ease: "none",
      onUpdate: function () {
        controls.target = new T.Vector3(0, 0, 0)
        controls.update()
      },
    },)
    document.body.appendChild(renderer.domElement)
  }
})

loader.load("dake01.gltf", (gltf) => {
  var mesh = gltf.scene
  mesh.position.set(0, 0, 0)
  scene.add(mesh)
})

scene.add(new T.AmbientLight(0xffffff, 1))
const pl1 = new T.PointLight(0x00ffff, 500, 0, 2)
pl1.position.set(0, 10, 0)
// scene.add(pl1)
const dl1 = new T.DirectionalLight(0xffffff, 2)
camera.add(dl1)
scene.add(camera)
// const geo1 = new T.BoxGeometry(1, 1, 1)
// const mat1 = new T.MeshStandardMaterial({ color: 0xffff00 })
// const mesh1 = new T.Mesh(geo1, mat1)
// scene.add(mesh1)

function animate() {
  requestAnimationFrame(animate)
  renderer.render(scene, camera);
  camera.updateProjectionMatrix()
  controls.update()
}
animate()