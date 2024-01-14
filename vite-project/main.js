import * as THREE from 'three'
import "./style.css"
import gsap from "gsap"
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'

//Scene
const scene = new THREE.Scene()

//Sphere
const geometry = new THREE.SphereGeometry(3, 64, 64)

const texture = new THREE.TextureLoader().load( 'textures/design.jpg')
const material = new THREE.MeshStandardMaterial({ map: texture, side: THREE.DoubleSide })
const mesh = new THREE.Mesh(geometry, material)

scene.add(mesh)

//Sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
}

//Light
const light1 = new THREE.DirectionalLight(0xAA9986, 3, 0.1, 2)
light1.position.set(0, 10, 10)
scene.add(light1)

const light2 = new THREE.SpotLight(0xFFFFFF, 300, 50, 1.7)
light2.position.set(0, 10, 10)
scene.add(light2)

//Camera
const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 20
scene.add(camera)


//Renderer
const canvas = document.querySelector('.webgl');
const renderer = new THREE.WebGLRenderer({canvas})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(2)
renderer.render(scene, camera)

//Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
controls.enablePan = false
controls.enableZoom = false
controls.autoRotate = true
controls.autoRotateSpeed = 3
//Resize
window.addEventListener('resize', () => {
  //Update Sizes
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight
  //Update Camera
  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix()
  renderer.setSize(sizes.width, sizes.height)
})

const loop = () => {
  controls.update()
  renderer.render(scene, camera)
  window.requestAnimationFrame(loop)
}
loop()
 //Timeline
const tl = gsap.timeline({ defaults: { duration: 1 } })
tl.fromTo(mesh.scale, {z:0, x:0, y:0}, {z:1, x:1, y:1})
tl.fromTo("nav", { y: "-100%"}, { y: "0%"})
tl.fromTo('.title', {opacity: 0}, {opacity: 1 })

//Rotate
