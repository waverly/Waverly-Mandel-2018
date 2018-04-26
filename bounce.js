var LightControls = (function LightControls() {

    var config = {
      spotLight: {
        color: new THREE.Color().setHSL(0 / 360, 0.0, 1.0),
        intensity: 1.7,
        bias: 0,
        angle: 45,
        exponent: 10.0,
        distance: 1000,
        shadowCamFOV: 60,
        shadowCamNear: 0.1,
        shadowCamFar: 200
      },
      dLight: {
        color: new THREE.Color().setHSL(302 / 360, 1.0, .50),
        distance: 0,
        intensity: 0.5,
        shadowCamFOV: 30,
        shadowCamNear: 0.1,
        shadowCamFar: 200,
        shadowMapSizeFactor: 4
      }
    };

    return {

      spotLightColorHex: '#' + config.spotLight.color.getHexString(),
      spotLightIntensity: config.spotLight.intensity,
      spotLightDisabled: true,
      spotLightBias: config.spotLight.bias,
      spotLightDistance: config.spotLight.distance,
      spotLightAngle: config.spotLight.angle,
      spotLightExponent: config.spotLight.exponent,
      spotLightOnlyShadow: false,
      spotLightDebug: false,
      spotLightShadowCamNear: config.spotLight.shadowCamNear,
      spotLightShadowCamFar: config.spotLight.shadowCamFar,
      spotLightShadowCamFOV: config.spotLight.shadowCamFOV,
      spotLightTargetTag: '',

      dLightHex: '#' + config.dLight.color.getHexString(),
      dLightDistance: config.dLight.distance,
      dLightIntensity: config.dLight.intensity,
      dLightShadowCamNear: config.dLight.shadowCamNear,
      dLightShadowCamFar: config.dLight.shadowCamFar,
      dLightShadowCamFOV: config.dLight.shadowCamFOV,
      dLightShadowMapSizeFactor: config.dLight.shadowMapSizeFactor
    };
  })(),

  AnimationControls = (function() {
    return {
      rotationSpeed: 1,
      bouncingSpeed: 1,
      archingSpeed: 1
    };
  })();

// Initial DOM references
var sceneContainerElem = document.querySelector('#sceneContainer'),
  canvasElems = sceneContainerElem.querySelectorAll('canvas'),
  errorReportElem = document.querySelector('#errorReport'),
  statsInfoContainer = document.querySelector('.stats-info-container'),
  guiContainer = document.querySelector('.gui-container'),

  // Core Three JS objects
  camera,
  scene,
  renderer,
  //cameraControls,
  //viewControls,
  lightControls,
  animationControls,
  clock = new THREE.Clock(),
  stats = initStats(),

  DEFAULT_FRAME_RATE = 30,

  timelines = {},
  ANIMATION_DURATION_MULTIPLIER = 1,

  // Tags for finding objects on the scene
  TAG__GROUND_PLANE = 'ground-plane',
  TAG__AXES = 'axes',
  TAG__GRID_XZ = 'gridXZ',
  TAG__GRID_YZ = 'gridYZ',
  TAG__GRID_XY = 'gridXY',
  TAG__CUBE = 'Cube',
  TAG__BOUNCING_SPHERE = 'Bouncing Sphere',
  TAG__ARCHING_SPHERE = 'Arching Sphere',
  TAG__POINT_LIGHT_SPHERE = 'Point Light Sphere',

  spotLightTargetTags = [TAG__GROUND_PLANE, TAG__CUBE, TAG__BOUNCING_SPHERE, TAG__ARCHING_SPHERE],

  // Lights
  spotLight,
  dLight,
  hemisphereLight,

  baseMaterials = {},
  baseShaderMaterials = {},
  baseGeometries = {},
  baseTextures = {},
  baseShaders = {},

  baseColors = {
    cube: {
      diffuse: new THREE.Color().setHSL(34 / 360, 1.0, 0.5)
    },
    bouncingSphere: {
      diffuse: new THREE.Color().setHSL(180 / 360, 1.0, .6)
    },
    archingSphere: {
      diffuse: new THREE.Color().setHSL(144 / 360, 1.0, .5)
    },
    pointLightSphere: {
      diffuse: new THREE.Color().setHSL(35 / 360, 0.58, 0.55)
    },
    groundPlane: {
      diffuse: new THREE.Color().setHSL(0 / 360, 0.0, 1.0)
    }
  },

  config = {};

/////////////////// ANIMATION FUNCTIONS //////////////////

function spinCube() {
  var spinTl = new TimelineMax({
      repeat: -1
    }),

    spinCube = function() {
      return TweenMax.to(
        scene.getObjectByName(TAG__CUBE).rotation,
        ANIMATION_DURATION_MULTIPLIER * 10, {
          x: 2 * Math.PI,
          y: 2 * Math.PI,
          z: 2 * Math.PI,
          ease: Power0.easeNone
        }
      );
    };
  spinTl.add(spinCube());
  return spinTl;
}

function bounceCube() {
  var bounceTl = new TimelineMax({
      repeat: -1
    }),
    downDuration = ANIMATION_DURATION_MULTIPLIER * .4,
    upDuration = downDuration * 1.2,
    mesh = scene.getObjectByName(TAG__BOUNCING_SPHERE),

    squishIn = function() {
      return TweenMax.to(
        mesh.scale,
        upDuration, {
          y: '1.2',
          ease: Power4.easeInOut
        }
      );
    },
    squishOut = function() {
      return TweenMax.to(
        mesh.scale,
        downDuration, {
          y: '0.8',
          ease: Power4.easeInOut
        }
      );
    },
    bounceUp = function() {
      return TweenMax.to(
        mesh.position,
        upDuration, {
          y: '+=10',
          ease: Power1.easeOut
        }
      );
    },
    bounceDown = function() {
      return TweenMax.to(
        scene.getObjectByName(TAG__BOUNCING_SPHERE).position,
        downDuration, {
          y: '-=10',
          ease: Sine.easeIn
        }
      );
    };

  bounceTl.add(bounceUp());
  bounceTl.add(squishOut(), '-=' + upDuration);
  bounceTl.add(bounceDown());
  bounceTl.add(squishIn(), '-=' + downDuration);
  return bounceTl;
}

function arcSphere() {
  var arcTl = new TimelineMax({
      repeat: -1,
      yoyo: true
    }),
    mesh = scene.getObjectByName(TAG__ARCHING_SPHERE),
    arcDuration = ANIMATION_DURATION_MULTIPLIER * 0.8,
    zStart = -1 * (config.archingSphere.dimensions.diameter * 3),
    zEnd = -zStart,
    zDist = Math.abs(zStart - zEnd), // semi-major axis distance

    yDist = zDist / 2, // semi-minor axis distance

    arcPath = [{
      z: zStart,
      y: config.archingSphere.position.y
    }, {
      z: zStart + (zDist * 0.25),
      y: yDist
    }, {
      z: zStart + (zDist * 0.75),
      y: yDist
    }, {
      z: zEnd,
      y: config.archingSphere.position.y
    }],

    arcTween = function() {
      return TweenMax.to(
        mesh.position,
        arcDuration, {
          bezier: {
            type: 'cubic',
            values: arcPath,
            //autoRotate: true,
            ease: Power3.easeOut
          }
        }
      );
    };
  arcTl.add(arcTween());
  return arcTl;
}

function initAnimations() {
  var masterTL = new TimelineMax(),
    cubeTL = spinCube(),
    bounceTL = bounceCube(),
    arcTL = arcSphere();

  //masterTL.add([cubeTL, bounceTL, arcTL, pointLightOrbitTL]);
  masterTL.add([cubeTL, bounceTL, arcTL]);

  // Store references for updates (Another option might be adding these to the mesh reference
  timelines.master = masterTL;
  timelines.cube = cubeTL;
  timelines.bouncingSphere = bounceTL;
  timelines.archingSphere = arcTL;
}

function updateCubeSpeed(newScale) {
  timelines.cube.timeScale(newScale);
}

function updateBouncingSphere(newScale) {
  timelines.bouncingSphere.timeScale(newScale);
}

function updateArchingSphere(newScale) {
  timelines.archingSphere.timeScale(newScale);
}

function configureObjects() {

  config.cube = {
    dimensions: {
      width: 4,
      height: 4,
      depth: 4
    },
    castShadow: true,
    receiveShadow: true
  };
  config.bouncingSphere = {
    dimensions: {
      diameter: 8
    },
    numSegments: {
      width: 32,
      height: 32
    },
    castShadow: true,
    receiveShadow: true
  };
  config.archingSphere = {
    dimensions: {
      diameter: 8
    },
    numSegments: {
      width: 32,
      height: 32
    },
    castShadow: true,
    receiveShadow: true
  };
  config.pointLightSphere = {
    dimensions: {
      diameter: config.archingSphere.dimensions.diameter / 4
    }
  };
  config.groundPlane = {
    dimensions: {
      width: 1000,
      height: 200
    },
    numSegments: {
      width: 100,
      height: 100
    }
  };

  initObjectOrientation();
}

/**
 * Define any initial object positions and transforms
 */
function initObjectOrientation() {

  config.cube.position = {
    x: -config.cube.dimensions.width / 2,
    y: 3,
    z: 0
  };
  config.bouncingSphere.position = {
    x: 20,
    y: config.bouncingSphere.dimensions.diameter / 2,
    z: 2
  };
  config.archingSphere.position = {
    x: (config.cube.position.x - config.bouncingSphere.position.x) / 2,
    y: config.bouncingSphere.position.y,
    z: 0
  };
  config.pointLightSphere.position = {
    x: 3,
    y: config.pointLightSphere.dimensions.diameter, // raised above plane by 1/2 diameter length
    z: 3
  };
}

function initControls() {
  lightControls = Object.create(LightControls);
  animationControls = Object.create(AnimationControls);
}

/*function initTexturesAndShaders() {
    var grassTexture = THREE.ImageUtils.loadTexture('./img/grasslight-big.jpg');
    grassTexture.wrapS = grassTexture.wrapT = THREE.RepeatWrapping;
    grassTexture.repeat.set(4, 4);
    baseTextures.groundPlane = grassTexture;
}*/

function initMaterialsAndGeometries() {

  ////////////////////////// ground plane //////////////////////////
  baseGeometries.groundPlane = new THREE.PlaneGeometry(
    config.groundPlane.dimensions.width,
    config.groundPlane.dimensions.height,
    config.groundPlane.numSegments.width,
    config.groundPlane.numSegments.height
  );
  baseMaterials.groundPlane = new THREE.MeshLambertMaterial({
    color: baseColors.groundPlane.diffuse
  });

  ////////////////////////// cube //////////////////////////
  baseMaterials.cube = new THREE.MeshLambertMaterial({
    color: baseColors.cube.diffuse
  });
  baseGeometries.cube = new THREE.BoxGeometry(
    config.cube.dimensions.width,
    config.cube.dimensions.height,
    config.cube.dimensions.depth
  );

  ////////////////////////// bouncingSphere //////////////////////////
  baseMaterials.bouncingSphere = new THREE.MeshLambertMaterial({
    color: baseColors.bouncingSphere.diffuse
  });
  baseGeometries.bouncingSphere = new THREE.SphereGeometry(
    config.bouncingSphere.dimensions.diameter / 2,
    config.bouncingSphere.numSegments.width,
    config.bouncingSphere.numSegments.height
  );

  ////////////////////////// arching Sphere //////////////////////////
  baseMaterials.archingSphere = new THREE.MeshLambertMaterial({
    color: baseColors.archingSphere.diffuse
  });

  ////////////////////////// PointLight Sphere //////////////////////////
  baseMaterials.pointLightSphere = new THREE.MeshBasicMaterial({
    color: baseColors.pointLightSphere.diffuse
  });
  baseGeometries.pointLightSphere = new THREE.SphereGeometry(
    config.pointLightSphere.dimensions.diameter / 2,
    32,
    32
  );
}

function setScene() {

  ///////////// Create scene and add lights  ///////////
  scene = new THREE.Scene();
  scene.fog = new THREE.Fog(0xAAAAAA, 0.010, 500);

  spotLight = new THREE.SpotLight(lightControls.spotLightColor);
  spotLight.position.set(-40, 60, -10);
  spotLight.castShadow = true; // IMPORTANT: If we want to use shadows during the scene AT ANY POINT, make sure this is set during init so that the shadow map has a chance to be generated
  spotLight.shadowBias = lightControls.spotLightBias;
  spotLight.shadowCameraNear = lightControls.spotLightShadowCamNear;
  spotLight.shadowCameraFar = lightControls.spotLightShadowCamFar;
  spotLight.shadowCameraFov = lightControls.spotLightShadowCamFOV;
  spotLight.distance = lightControls.spotLightDistance;
  spotLight.angle = lightControls.spotLightAngle * Math.PI / 180;
  scene.add(spotLight);

  dLight = new THREE.DirectionalLight(lightControls.dLightHex);
  dLight.position.set(30, 1000, -50);
  dLight.castShadow = true;

  dLight.distance = lightControls.dLightDistance;
  dLight.intensity = lightControls.dLightIntensity;
  dLight.shadowCameraNear = lightControls.dLightShadowCamNear;
  dLight.shadowCameraFar = lightControls.dLightShadowCamFar;
  dLight.shadowCameraLeft = -50;
  dLight.shadowCameraRight = 50;
  dLight.shadowCameraTop = config.groundPlane.dimensions.width / 2;
  dLight.shadowCameraBottom = -config.groundPlane.dimensions.width / 2;
  dLight.shadowCameraFov = lightControls.dLightShadowCamFOV;
  dLight.shadowMapWidth = lightControls.dLightShadowMapSizeFactor * 512;
  dLight.shadowMapHeight = lightControls.dLightShadowMapSizeFactor * 512;

  scene.add(dLight);

  /////////// Crank up the renderer  ///////////
  var canvasWidth = window.innerWidth,
    canvasHeight = window.innerHeight,
    canvasAspectRatio = canvasWidth / canvasHeight;

  renderer = new THREE.WebGLRenderer({
    antialias: true
  });
  renderer.gammaInput = true;
  renderer.gammaOutput = true;
  renderer.shadowMapEnabled = true;
  renderer.setSize(canvasWidth, canvasHeight);
  renderer.setClearColor(0xAAAAAA, 1.0);

  ///////////// Initialize the Camera /////////////
  camera = new THREE.PerspectiveCamera(45, canvasAspectRatio, 0.1, 1000);
  camera.position.set(-30, 40, -30);
  scene.add(camera);

  //////////////  Create some camera controls  /////////////
  //cameraControls = new THREE.OrbitControls(camera, renderer.domElement);
  camera.lookAt(scene.position);
  //cameraControls.target.set(0, 0, 0);
}

/**
 * Called to turn off shadows from a specific light during
 * the render loop. We need to quickly disable the renderer's
 * auto update status, clear the shadow map generated by the light, then
 * restore the shadowMapAutoUpdate status.
 */
function disableShadowsForLight(light) {
  renderer.shadowMapAutoUpdate = false;
  renderer.clearTarget(light.shadowMap);
  renderer.shadowMapAutoUpdate = true;
}

function createCube() {
  var cube = new THREE.Mesh(baseGeometries.cube, baseMaterials.cube);
  cube.position.set(
    config.cube.position.x,
    config.cube.position.y,
    config.cube.position.z
  );
  cube.castShadow = !!(config.cube.castShadow);
  cube.receiveShadow = !!(config.cube.receiveShadow);
  cube.name = TAG__CUBE;
  scene.add(cube);
}

function createSpheres() {

  var bouncingSphere = new THREE.Mesh(baseGeometries.bouncingSphere, baseMaterials.bouncingSphere);

  bouncingSphere.position.set(
    config.bouncingSphere.position.x,
    config.bouncingSphere.position.y,
    config.bouncingSphere.position.z
  );
  bouncingSphere.castShadow = !!(config.bouncingSphere.castShadow);
  bouncingSphere.receiveShadow = !!(config.bouncingSphere.receiveShadow);

  var archingSphere = new THREE.Mesh(baseGeometries.bouncingSphere, baseMaterials.archingSphere);
  archingSphere.position.set(
    config.archingSphere.position.x,

    config.archingSphere.position.y,
    config.archingSphere.position.z
  );
  archingSphere.castShadow = !!(config.archingSphere.castShadow);
  archingSphere.receiveShadow = !!(config.archingSphere.receiveShadow);

  bouncingSphere.name = TAG__BOUNCING_SPHERE;
  archingSphere.name = TAG__ARCHING_SPHERE;

  scene.add(bouncingSphere);
  scene.add(archingSphere);
}

function createGroundPlane() {

  var groundPlane = new THREE.Mesh(baseGeometries.groundPlane, baseMaterials.groundPlane);
  groundPlane.rotation.x = -Math.PI / 2;
  groundPlane.receiveShadow = true;
  groundPlane.castShadow = false;
  groundPlane.name = TAG__GROUND_PLANE;

  // focus the SpotLight on the ground Plane
  spotLight.target = groundPlane;

  scene.add(groundPlane);
}

function createObjects() {
  createCube();
  createSpheres();
  createGroundPlane();
}

function initGUI() {

  var gui = new dat.GUI({
      autoPlace: false
    }),
    folder;

  ///////// Light Controls  /////////

  // SpotLight
  folder = gui.addFolder('Spot Light');

  folder.addColor(lightControls, 'spotLightColorHex')
    .name('SpotLight Color Hex')
    .onChange(function(val) {
      spotLight.color = new THREE.Color(val);
    });

  folder.add(lightControls, 'spotLightDisabled')
    .name('Disable SpotLight')
    .onChange(function(isSelected) {
      if (isSelected) {
        spotLight.visible = false;
        disableShadowsForLight(spotLight);
      } else {
        spotLight.visible = true;
        spotLight.castShadow = true;
      }
    });

  folder.add(lightControls, 'spotLightIntensity', 0.01, 20.0, 0.10)
    .name('SpotLight Intensity')
    .onChange(function(val) {
      spotLight.intensity = val;
    });

  folder.add(lightControls, 'spotLightBias').min(0).max(1).step(0.1)
    .name('SptLt. Bias')
    .onChange(function(val) {
      spotLight.shadowBias = val;
    });

  folder.add(lightControls, 'spotLightDistance', 0, 300, 3.0)
    .name('SptLt. Distance')
    .onChange(function(val) {
      spotLight.distance = val;
    });

  folder.add(lightControls, 'spotLightAngle', 0, 90, 1)
    .name('SptLt. Angle')
    .onChange(function(val) {
      spotLight.angle = val * Math.PI / 180;
    });

  folder.add(lightControls, 'spotLightExponent', 0, 20, 0.5)
    .name('SptLt. Exponent')
    .onChange(function(val) {
      spotLight.exponent = val;
    });

  folder.add(lightControls, 'spotLightTargetTag', spotLightTargetTags)
    .name('SptLt. Target')
    .onChange(function(tag) {
      var objMesh = scene.getObjectByName(tag);
      spotLight.target = objMesh;
    });

  folder.add(lightControls, 'spotLightOnlyShadow')
    .name('SptLt. Shadows Only')
    .onChange(function(bool) {
      spotLight.shadowOnly = bool
    });

  folder.add(lightControls, 'spotLightDebug')
    .name('Debug SpotLight')
    .onChange(function(bool) {
      spotLight.shadowCameraVisible = bool;
    });

  folder.close();

  // Directional Light
  folder = gui.addFolder('Directional Light');
  folder.addColor(lightControls, 'dLightHex')
    .name('D Lt. Color Hex')
    .onChange(function(hexVal) {
      dLight.color = new THREE.Color(hexVal);
    });

  folder.add(lightControls, 'dLightIntensity', 0.0, 30, 0.5)
    .name('D Lt. Intensity')
    .onChange(function(val) {
      dLight.intensity = val;
    });

  folder.add(lightControls, 'dLightDistance', 0, 500, 1.0)
    .name('D Lt. Distance')
    .onChange(function(val) {
      dLight.distance = val;
    });

  folder.open();

  folder = gui.addFolder('Animation Settings');
  folder.add(animationControls, 'rotationSpeed', 0, 5, 0.05).name('Rotation Speed').onChange(updateCubeSpeed);
  folder.add(animationControls, 'bouncingSpeed', 0, 5, 0.05).name('Bouncing Speed').onChange(updateBouncingSphere);
  folder.add(animationControls, 'archingSpeed', 0, 5, 0.05).name('Arching Speed').onChange(updateArchingSphere);

  //gui.close();
  guiContainer.appendChild(gui.domElement);
}

function appendToDOM() {

  if (canvasElems.length > 0) {
    sceneContainerElem.removeChild(canvasElems[0]);
  }
  sceneContainerElem.appendChild(renderer.domElement);
}

function initStats() {

  var stats = new Stats();
  stats.setMode(0);
  statsInfoContainer.appendChild(stats.domElement);
  return stats;
}

function render(usingTweenMax) {
  // If we're using TweenMax, we will have deferred to its RAF loop before getting here,
  // but otherwise, we'll want to set up the loop ourselves
  if (!usingTweenMax) {
    requestAnimationFrame(function() {
      render(false);
    });
  }
  var elapsedTime = clock.getElapsedTime(); // elapsed time since last render (doesn't keep

  //cameraControls.update();

  // tell the stats tracker that we're on a new render
  stats.update();

  renderer.render(scene, camera);
}

function init() {

  (function setup() {
    // Make sure stuff here is done first
    configureObjects();
    initControls();
    setScene();
    initMaterialsAndGeometries();
  })();

  createObjects();
  initGUI();
  appendToDOM();
  initAnimations();

  // If we're using TweenMax, defer to its RAF loop
  if (typeof TweenMax !== 'undefined') {
    TweenMax.ticker.addEventListener('tick', function() {
      render(true);
    });
  } else {
    render(false);
  }
}

window.addEventListener('load', function() {
  init();
}, false);
