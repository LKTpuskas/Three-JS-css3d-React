import * as THREECssRenderer from 'three-css3drenderer';
import * as THREE from 'three';
import OrbitControls from 'three-orbitcontrols';
// import TrackballControls from 'three-trackballcontrols';

// https://github.com/mrdoob/three.js/blob/master/examples/css3d_orthographic.html

// https://github.com/stemkoski/stemkoski.github.com/blob/master/Three.js/Texture-From-Canvas.html
// http://stemkoski.github.io/Three.js/Texture-From-Canvas.html


// http://workshop.chromeexperiments.com/examples/gui/#1--Basic-Usage CONTROLLER GUI

export default (container) => {
 
  console.log(container);
  // const clock = new THREE.Clock();
  const scene = new THREE.Scene();
  let canvas = document.createElement('canvas');
  // const rendererWebGL = new THREE.WebGLRenderer();
  // const scene2 = new THREE.Scene();
  const rendererCSS3D = new THREECssRenderer.CSS3DRenderer();
  
  // const aspectRatio = canvas.width / canvas.height;
  // const camera = new THREE.OrthographicCamera(frustumSize * aspectRatio / - 2, frustumSize * aspectRatio / 2, frustumSize / 2, frustumSize / - 2, 1, 1000);
  const camera = new THREE.PerspectiveCamera(10, window.innerWidth / window.innerHeight, 1, 3);
  camera.position.z = 4000;
  let controls;
  // let canvasHalfHeight;
  const table = ['Project 1', 'Project 2', 'Project 3', 'Project 4', 'Project 5'];
  const objects = []
  const targets = { table: [] }

  init();
  bindEventListeners();
  update()


  function createCanvas(document, container) {
    container.appendChild(canvas);
    return canvas;
  }
  function bindEventListeners() {
    window.onresize = resizeCanvas;
    resizeCanvas();
  }

  function resizeCanvas() {
    const canvas = createCanvas(document, container);
    canvas.style.width = '100%';
    canvas.style.height = '100%';

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    Math.round(canvas.offsetWidth / 2);
    Math.round(canvas.offsetHeight / 2);

    onWindowResize()
    
  }

  function onWindowResize() {
    const { width, height } = canvas;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    // rendererWebGL.setSize(width, height);
    rendererCSS3D.setSize(width, height);
  }


  function init() {
    let idCounter = 0
    for ( let i = 0; i < table.length; i++  ) {
      const element = document.createElement( 'div' );
      element.id = i
      console.log(idCounter)
      element.className = 'element';
      element.style.alignContent = 'center'
      element.style.backgroundColor = 'rgba(0, 84, 219,' + ( Math.random() * 0.5 + 0.5 ) + ')';
      element.style.transition = 'all 2000ms ease-in-out';
      const number = document.createElement( 'div' );
      number.className = 'number';
      number.textContent = i;
      element.appendChild( number );
      const symbol = document.createElement( 'div' );
      symbol.className = 'symbol';
      symbol.textContent = table[ i ];
      element.appendChild( symbol );
      const details = document.createElement( 'div' );
      details.className = 'details';
      details.innerHTML = table[ i + 1 ] + '<br>' + table[ i + 2 ];
      element.appendChild( details );
      const objectCSS3D = new THREECssRenderer.CSS3DObject( element );
      objectCSS3D.position.x = Math.random() * 400 - 200;
      objectCSS3D.position.y = Math.random() * 200 - 100;
      objectCSS3D.position.z = Math.random() * 300 - 100;
      scene.add( objectCSS3D );
      objects.push( objectCSS3D );
      //
      const object3D = new THREE.Object3D();
      object3D.position.x = ( i + 3 * 140 ) - 1330;
      object3D.position.y = - ( i + 4 * 180 ) + 990;
      targets.table.push( object3D );
    }
    
    // rendererCSS3D.setSize(window.innerWidth, window.innerHeight);
    // rendererCSS3D.domElement.style.position = 'absolute';
   // rendererCSS3D.domElement.style.top = 0;
   document.getElementById('wrapper').appendChild(rendererCSS3D.domElement);
   controls = new OrbitControls( camera )
   
     controls.enableZoom = false // enable orbitcontrol
 
      controls.enableZoom = false
      controls.minDistance = 2000;
      controls.maxDistance = 4000;
    
    
    /* controls = new TrackballControls(camera, rendererCSS3D.domElement);
    controls.rotateSpeed = 0.5;
    controls.minDistance = 500;
    controls.maxDistance = 20000; */
    
  }

  /**
 * Returns a random number between min (inclusive) and max (exclusive)
 */
  function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
  }

  /**
  * Returns a random integer between min (inclusive) and max (inclusive)
  * Using Math.round() will give you a non-uniform distribution!
  */
 /*  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  } */

  function newXPosition() {
    return Math.floor(getRandomArbitrary(500, -500))
  }
  
  function newYPosition() {
    return Math.floor(getRandomArbitrary(75, -75))
  }

  function newZPosition() {
    return Math.floor(getRandomArbitrary(75, -75))
  }

  function setPosition(targets, index, posX, posY, posZ) {
    return { ...targets[index].position, id: index, x: posX, y: posY, z: posZ, clicked: false }
  }

 /*  function getDomElement(object, id) {
    return object.x <= 500 ? document.getElementById(id) : null
  } */

  let shouldContinue = true;

  function transform(targets) {

    if (shouldContinue) {

      for (let i = 0; i < targets.length; i++) {
        const posX = newXPosition()
        const posY = newYPosition()
        const posZ = newZPosition()
        let indexedObject = setPosition(targets, i, posX, posY, posZ)
        
        if (indexedObject.x <= 500) {
          const domElement = document.getElementById(indexedObject.id)
          if (domElement !== undefined) {
            domElement.style.backgroundColor = 'rgba(' + (Math.random() * 50 + 0.5) + (Math.random() * 100 + 0.5) + ',0,' + (Math.random() * 0.5 + 0.5) + ')';
            domElement.style.transform = 'translate3d(' + indexedObject.x + 'px,' + indexedObject.y + 'px,' + indexedObject.z + 'px)';
            // domElement.style.width = posZ + 'px';
            domElement.style.height = posY + 'px';
     /*        domElement.addEventListener('click', function (event) {
              console.log('index:', i, '', 'event current target:', event.currentTarget.id, 'domelement:', domElement.id)
              if (event.currentTarget.id === String(indexedObject.id)) {
                console.log(event.currentTarget.id)
                indexedObject = setPosition(targets, i, 0, 0, 0)
                domElement.style.transform = 'translate3d(' + 0 + 'px,' + 0 + 'px,' + 20 + 'px)';

                console.log(i, 'CLICKED')

                event.preventDefault()
                event.stopPropagation()
                shouldContinue = false;
              }

            }, false);
 */
          }
        }
      }
    } else {
      // domElement = null
    }
  }

  function render() {
    rendererCSS3D.render(scene, camera);
  }
  let last = 0;
  function update(timeNow) {
    const speed = 0.5
    requestAnimationFrame(update);
    // each 2 seconds call the createNewObject() function
    render()
    if (!last || timeNow - last >= speed * 1000) {
      last = timeNow;
      transform(targets.table)
      // console.log(`transform function called: ${transform(targets.table)} Time passed:${timeNow}`)

    }
  }
}
