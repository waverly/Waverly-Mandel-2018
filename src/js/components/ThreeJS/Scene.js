import ReactDOM from 'react-dom';
import React, { Component } from 'react'
import { Easing, Tween, autoPlay } from 'es6-tween'
import * as THREE from 'three'
import MarbleTexture from "Static/marble.jpg";
import Checkerboard from "Static/checkerboard.jpg";
import RedCheckerboard from "Static/redcheckers.png"
import Concrete from 'Static/concrete.jpg'

const OrbitControls = require('three-orbit-controls')(THREE)

class Scene extends Component {
  constructor(props) {
    super(props)
    this.start = this.start.bind(this)
    this.stop = this.stop.bind(this)
    this.animate = this.animate.bind(this)
    this.getPlane = this.getPlane.bind(this)
    this.getSphere = this.getSphere.bind(this)
    this.getSpotLight = this.getSpotLight.bind(this)
    this.onWindowResize = this.onWindowResize.bind(this)
    this.getMatierla = this.getMaterial.bind(this)
  }

  onWindowResize(){
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize( window.innerWidth, window.innerHeight );
  }

  componentDidMount() {
    window.addEventListener("resize", this.onWindowResize);
    const width = this.mount.clientWidth
    const height = this.mount.clientHeight
    const scene = new THREE.Scene()


    // colored ball
    // const material = new THREE.MeshLambertMaterial({ color: '#433F81' })
    // textured ball
    const texture = new THREE.TextureLoader().load( RedCheckerboard );
    const material = new THREE.MeshStandardMaterial( { map: texture } );
    material.roughnessMap = new THREE.TextureLoader().load( Concrete );
    material.bumpMap = new THREE.TextureLoader().load( Concrete );
    material.bumpScale = 0;
    material.roughness = .1;

    // create sphere and elevate it above the plane
    const sphere = this.getSphere(material, 5, 24);
    sphere.position.y = sphere.geometry.parameters.radius * 2;
    sphere.name = "mainSphere";

    const spotLight = this.getSpotLight(6);
    spotLight.position.set( 100, 100, 50 );
    spotLight.angle = Math.PI / 2;
    spotLight.penumbra = 0.9;

    const directionalLight = this.getDirectionalLight(2);
    directionalLight.position.y = 4;

    var geoFloor = new THREE.BoxBufferGeometry( 2000, 0.1, 2000 );
		var matStdFloor = new THREE.MeshStandardMaterial( { color: '#F86738', transparent: true, opacity: 0.5, roughness: 0, metalness: 0 } );
		var mshStdFloor = new THREE.Mesh( geoFloor, matStdFloor );
		scene.add( mshStdFloor );

    // CAMERA
    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth/window.innerHeight,
      1,
      1000
    );

    camera.position.set( 0, 20, 35 );

    scene.add(camera)
    scene.add(sphere)
    // scene.add(plane)
    // scene.add(spotLight);
    scene.add(directionalLight);

    // RENDERER
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setClearColor( 0x000000, 0 );
    renderer.setSize(width, height)
    renderer.shadowMap.enabled = true;

    // controls
    const controls = new OrbitControls(camera, renderer.domElement);

    this.controls = controls
    this.scene = scene
    this.camera = camera
    this.renderer = renderer
    this.material = material
    this.sphere = sphere
    this.directionalLight = directionalLight;
    this.spotLight = spotLight

    this.mount.appendChild(this.renderer.domElement)
    this.start()
  }

  getMaterial(type, color) {
    let selectedMaterial;
    const materialOptions = {
      color: color === undefined ? 'rgb(255, 255, 255)' : color,
    };

    switch (type) {
      case 'basic':
        selectedMaterial = new THREE.MeshBasicMaterial(materialOptions);
        break;
      case 'lambert':
        selectedMaterial = new THREE.MeshLambertMaterial(materialOptions);
        break;
      case 'phong':
        selectedMaterial = new THREE.MeshPhongMaterial(materialOptions);
        break;
      case 'standard':
        selectedMaterial = new THREE.MeshStandardMaterial(materialOptions);
        break;
      default:
        selectedMaterial = new THREE.MeshBasicMaterial(materialOptions);
        break;
    }

    return selectedMaterial;
  }

  getSphere(material, size, segments) {
  	var geometry = new THREE.SphereGeometry(size, segments, segments);
  	var obj = new THREE.Mesh(geometry, material);
  	obj.castShadow = true;

  	return obj;
  }

  getSpotLight(intensity) {
  	const light = new THREE.SpotLight(0xffffff, intensity);
  	light.castShadow = true;
  	return light;
  }

  getDirectionalLight(intensity) {
    const light = new THREE.DirectionalLight(0xffffff, intensity);
    light.castShadow = true;
    return light;
  }

  getPointLight(intensity) {
    const light = new THREE.PointLight(0xffffff, intensity);
    light.castShadow = true;
    return light;
  }

  getPlane(size) {
  	var geometry = new THREE.PlaneBufferGeometry( size, size );
    const material = new THREE.MeshPhongMaterial({
    		color: 'rgb(255, 0, 0)',
        transparent: true,
        opacity: 0,
    		side: THREE.DoubleSide
    	});
    const mesh = new THREE.Mesh(
  		geometry,
  		material
  	);
    mesh.receiveShadow = true;
  	return mesh;
  }

  componentWillUnmount() {
    this.stop()
    this.mount.removeChild(this.renderer.domElement)
  }

  start() {
    if (!this.frameId) {
      this.frameId = requestAnimationFrame(this.animate)
    }
  }

  stop() {
    cancelAnimationFrame(this.frameId)
  }

  animate() {

    var t = ( Date.now() / 2000 );
    // move light in circle around center
    // change light height with sine curve
    var r = 15.0;
    var lx = r * Math.cos( t );
    var lz = r * Math.sin( t );
    var ly = 5.0 + 5.0 * Math.sin( t / 3.0 );
    this.directionalLight.position.set( lx, ly, lz );
    this.directionalLight.lookAt( origin );

    this.sphere.rotation.y += .008;

    this.renderScene()
    this.frameId = window.requestAnimationFrame(this.animate)
  }

  renderScene() {
    this.renderer.render(this.scene, this.camera)
  }

  render() {
    const width = window.innerWidth;
    const height = window.innerHeight;

    return (
      <div
        style={{ width: width, height: height, position: 'absolute', zIndex: 100 }}
        ref={(mount) => { this.mount = mount }}
      />
    )
  }
}

export default Scene
