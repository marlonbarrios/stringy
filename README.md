# Stringy


https://github.com/marlonbarrios/stringy/assets/90220317/636b6eb4-b6a6-41dd-b9df-f8800d5b4703


Stringy is a JavaScript sketch that creates an interactive simulation using webcam input for hand tracking. Developed by [Marlon Barrios Solano](https://github.com/marlonbarrios), this project combines the power of p5.js, Toxiclibs, and MediaPipe to create a unique interactive experience.

## Live Demo
[Launch Stringy](https://marlonbarrios.github.io/stringy/)

## About
Stringy leverages the following technologies:

- [**p5.js**](https://p5js.org/): A JavaScript library for creative coding and visualization. It provides a simple yet powerful framework for creating interactive graphics and media-rich experiences in the browser.

- [**Toxiclibs**](http://haptic-data.com/toxiclibsjs/): A collection of computational design tools for processing and Java. In Stringy, Toxiclibs is used for its Verlet physics engine, which allows for realistic particle simulations and spring-based interactions.

- [**MediaPipe**](https://developers.google.com/mediapipe/solutions/vision/gesture_recognizer#get_started): An open-source framework from Google Research that provides cross-platform tools for building multimodal applied ML pipelines. In Stringy, MediaPipe is utilized for hand tracking, enabling interaction with the particle simulation based on hand movements detected by the webcam.

## Functionality
Stringy offers the following features:

- Particle Simulation: The sketch simulates particles connected by springs, creating dynamic and visually engaging patterns.
- Hand Tracking: Utilizing MediaPipe, Stringy tracks hand movements from the webcam feed. Users can interact with the particle simulation by moving their hands.
- Interactive Controls: Users can toggle the visibility of springs by pressing the spacebar, adding an extra layer of interactivity to the experience.

## Credits
Stringy is adapted from the Coding Train by Daniel Shiffman and @nahuelgerth. It extends their concepts of creative coding and interactive simulations to incorporate hand tracking technology and create an immersive experience.

---

## Code Overview
The code consists of several functions:

- `keyPressed()`: Toggles the visibility of springs with the spacebar.
- `setup()`: Initializes the canvas, physics engine, particles, eyes, and springs.
- `draw()`: Handles webcam feed, hand tracking, physics simulation, and drawing particles, eyes, and springs.
- `captureWebcam()`: Initializes webcam capture with specific settings.
- `setCameraDimensions()`: Adjusts the dimensions of the camera feed to fit the canvas.
- `centerOurStuff()`: Centers the webcam feed within the canvas.
- `windowResized()`: Handles window resizing and adjusts camera dimensions accordingly.

- ![Screenshot 2024-02-08 at 1 28 10 AM](https://github.com/marlonbarrios/stringy/assets/90220317/30b7eba8-033b-460a-8fca-dfd113a96f36)

