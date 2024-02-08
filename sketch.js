/* This code is a JavaScript sketch that creates an interactive simulation using webcam input for hand tracking. It begins by setting up a canvas and initializing a 2D physics engine for particle simulations. The sketch then creates an array to hold particles representing points on the screen and another array for "eyes." It also sets up springs between adjacent particles and between particles and eyes to simulate connections.

 The code initializes webcam capture with specific settings like facing mode, frame rate, and the number of hands to track. It adjusts the dimensions of the camera feed to fit the canvas while maintaining aspect ratio.*/

// addapted from the Coding Train / Daniel Shiffman and @nahuelgerth
// concept, programming a performance by marlon barrios solano

// Importing necessary modules from the Toxi library
const { VerletPhysics2D, VerletParticle2D, VerletSpring2D } = toxi.physics2d;
const { GravityBehavior } = toxi.physics2d.behaviors;
const { Vec2D, Rect } = toxi.geom;

// Declaration of variables
let physics;
let particles = [];
let eyes = [];
let springs = [];
let showSprings = false; // Flag to toggle visibility of springs

// Function to toggle spring visibility with spacebar
function keyPressed() {
  if (key == ' ') {
    showSprings = !showSprings;
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  // Initializing the physics engine and setting world bounds
  physics = new VerletPhysics2D();
  physics.setWorldBounds(new Rect(0, 0, width, height * 2));

  // Creating particles and eyes
  // Particles arranged in a grid pattern
  for (let x = 200; x <= 400; x += 50) {
    for (let y = 100; y <= 300; y += 100) {
      particles.push(new Particle(x, y));
    }
  }

  // Eyes positioned among the particles
  eyes.push(new Particle(275, 150));
  eyes.push(new Particle(325, 150));
  eyes.push(new Particle(250, 50));
  eyes.push(new Particle(350, 50));

  // Creating springs between particles and between particles and eyes
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      if (i !== j) {
        let a = particles[i];
        let b = particles[j];
        springs.push(new Spring(a, b, 0.001));
      }
    }
  }

  for (let particle of particles) {
    springs.push(new Spring(particle, eyes[0], 0.01));
    springs.push(new Spring(particle, eyes[1], 0.01));
  }

  springs.push(new Spring(eyes[0], eyes[3], 0.01));
  springs.push(new Spring(eyes[0], eyes[2], 0.01));
  springs.push(new Spring(eyes[1], eyes[2], 0.01));
  springs.push(new Spring(eyes[1], eyes[3], 0.01));

  // Setting up canvas, webcam, and angle mode
  createCanvas(windowWidth, windowHeight);
  captureWebcam();
  angleMode(DEGREES);
}

function draw() {
  capture.hide(); // Hide the webcam feed

  push();
  centerOurStuff(); // Center the webcam feed
  scale(-1, 1); // Mirror the webcam feed horizontally
  image(capture, -capture.scaledWidth, 0, capture.scaledWidth, capture.scaledHeight); // Draw the webcam feed
  scale(-1, 1); // Un-mirror the webcam feed
  pop();

  // Hand tracking
  if (mediaPipe.landmarks[0]) { // Check if hand tracking data is available
    let indexX = map(mediaPipe.landmarks[0][8].x, 1, 0, 0, capture.scaledWidth);
    let indexY = map(mediaPipe.landmarks[0][8].y, 0, 1, 0, capture.scaledHeight);
    let thumbX = map(mediaPipe.landmarks[0][4].x, 1, 0, 0, capture.scaledWidth);
    let thumbY = map(mediaPipe.landmarks[0][4].y, 0, 1, 0, capture.scaledHeight);
    
    // Locking particle to thumb position if thumb and index fingers are close
    if (dist(thumbX, thumbY, indexX, indexY) < 50) {
       particles[0].lock();
       particles[0].x = indexX;
       particles[0].y = indexY * 0.7;
       particles[0].unlock();
    }
  }

  physics.update(); // Update physics engine

  // Drawing particles, eyes, and springs
  if (showSprings) stroke(97, 160, 175);
  strokeWeight(3); 
  line(particles[1].x, particles[1].y, eyes[2].x, eyes[2].y);
  line(particles[3].x, particles[3].y, eyes[3].x, eyes[3].y);
  strokeWeight(16);
  point(eyes[2].x, eyes[2].y);
  point(eyes[3].x, eyes[3].y);

  fill(240, 108, 155);
  if (showSprings) fill(45, 197, 244, 100);
  strokeWeight(2);

  beginShape();
  for (let particle of particles) {
    vertex(particle.x, particle.y);
  }
  endShape(CLOSE);

  eyes[0].show();
  eyes[1].show();

  if (showSprings) {
    for (let spring of springs) {
      spring.show();
    }
  }
}

// Function to initialize webcam capture
function captureWebcam() {
  capture = createCapture(
    {
      audio: false,
      video: {
        facingMode: "user",
        frameRate: 60,
        numHands: 2,
      },
    },
    function (e) {
      captureEvent = e;
      console.log(captureEvent.getTracks()[0].getSettings());
      capture.srcObject = e;
      setCameraDimensions(capture);
      mediaPipe.predictWebcam(capture);
    }
  );
  capture.elt.setAttribute("playsinline", "");
}

// Function to set dimensions of the camera
function setCameraDimensions(video) {
  const vidAspectRatio = video.width / video.height;
  const canvasAspectRatio = width / height;

  if (vidAspectRatio > canvasAspectRatio) {
    video.scaledHeight = height;
    video.scaledWidth = video.scaledHeight * vidAspectRatio;
  } else {
    video.scaledWidth = width;
    video.scaledHeight = video.scaledWidth / vidAspectRatio;
  }
}

// Function to center webcam feed
function centerOurStuff() {
  translate(width / 2 - capture.scaledWidth / 2, height / 2 - capture.scaledHeight / 2);
}

// Function to handle window resizing
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  setCameraDimensions(capture);
}
