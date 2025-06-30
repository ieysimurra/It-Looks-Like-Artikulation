let currentLanguage = 'en'; // Default language

let layers = ["Layer 1", "Layer 2", "Layer 3"];
let layerHeight;
let labelWidth = 100;
let controlPanelHeight = 50;
let playheadX = labelWidth;
let playing = false;
let looping = false;
let drawMode = true;
let tempoSlider;
let tempoDisplay;
let playheadSpeed = 1; // Default speed
let loopButton;
let shapes = [[], [], []];
let minFreqSliders = [];
let maxFreqSliders = [];
let freqDisplays = [];
let waveformSelectors = [];
let amplitudeToggles = [];
let panningToggles = [];
let reverbToggles = [];
let amplitudeSliders = []; // Added amplitudeSliders array
let panningSliders = []; // Added panningSliders array
let reverbSliders = []; // Added reverbSliders array
let distortionToggles = []; 
let distortionSliders = [];
let clearMode = false;
let clearButton;
let clearAllButton;
let drawButton;
let draggingShape = null;

let mediaRecorder;
let chunks = [];
let recordingButton, stopRecordingButton;
let isRecording = false; // Global variable to track the recording state
let isAudioRecording = false; // Variable to track the audio recording state
let audioRecordingButton;
let audioChunks = []; // Array to store audio data chunks
let audioRecorder;
let interactionLog = []; // Log to store all user interactions

function setup() {
  createCanvas(windowWidth, windowHeight);
  layerHeight = (height - controlPanelHeight) / layers.length;
  createControlPanel();

  // Create the sliders and selectors for each layer
  for (let i = 0; i < layers.length; i++) {
    minFreqSliders[i] = createSlider(60, 6000, 60, 1);
    maxFreqSliders[i] = createSlider(60, 6000, 6000, 1);
    freqDisplays[i] = createDiv();
    waveformSelectors[i] = createSelect();
    waveformSelectors[i].option('sine');
    waveformSelectors[i].option('triangle');
    waveformSelectors[i].option('sawtooth');
    waveformSelectors[i].option('square');
    waveformSelectors[i].selected('sine');
    
    amplitudeSliders[i] = [];
    panningSliders[i] = [];
    reverbSliders[i] = [];
    distortionSliders[i] = [];

    amplitudeToggles[i] = createButton('Amplitude');
    amplitudeToggles[i].mousePressed(() => toggleSliders(i, 'amplitude'));
    
    panningToggles[i] = createButton('Panning');
    panningToggles[i].mousePressed(() => toggleSliders(i, 'panning'));
    
    reverbToggles[i] = createButton('Reverb');
    reverbToggles[i].mousePressed(() => toggleSliders(i, 'reverb'));
    
    distortionToggles[i] = createButton('Distortion');
    distortionToggles[i].mousePressed(() => toggleSliders(i, 'distortion'));
  }

  // Create the recording button for video
  recordingButton = createButton('Start Video Record');
  recordingButton.position(0, 35);
  recordingButton.mousePressed(toggleRecording);

  // Create the recording button for audio
  audioRecordingButton = createButton('Start Audio Record');
  audioRecordingButton.position(135, 35);
  audioRecordingButton.mousePressed(toggleAudioRecording);
}

function toggleRecording() {
  if (isRecording) {
    stopRecording();
    recordingButton.html('Start Video Record');
    recordingButton.style('background-color', '');
  } else {
    startRecording();
    recordingButton.html('Stop Video Record');
    recordingButton.style('background-color', '#FF5733');
  }
  isRecording = !isRecording;
}

function startRecording() {
  // Get the stream from the canvas
  let canvasStream = document.querySelector('canvas').captureStream(30);  // 30 FPS

  // For the audio stream using Tone.js
  let dest = Tone.context.createMediaStreamDestination();
  Tone.Master.connect(dest);
  let audioStream = dest.stream;

  // Combine video and audio streams
  let tracks = [...canvasStream.getTracks(), ...audioStream.getTracks()];
  let combinedStream = new MediaStream(tracks);
  mediaRecorder = new MediaRecorder(combinedStream);

  mediaRecorder.ondataavailable = (event) => {
    chunks.push(event.data);
  };

  mediaRecorder.onstop = (event) => {
    const blob = new Blob(chunks, { type: "video/webm" });
    chunks = [];
    const videoURL = window.URL.createObjectURL(blob);
    const downloadLink = createA(videoURL, 'Video', '_blank');
    downloadLink.download = 'video_interaction.webm';
    downloadLink.position(windowWidth * 0.4, 35);

    let anchor = document.createElement('a');
    anchor.href = window.URL.createObjectURL(blob);
    anchor.download = 'recording.webm';
    anchor.click();
  };

  mediaRecorder.start();
  logAction('Video recording started');
}

function stopRecording() {
  if (mediaRecorder) {
    mediaRecorder.stop();
  }
  logAction('Video recording stopped');
  saveLogData();
}

function toggleAudioRecording() {
  if (isAudioRecording) {
    stopAudioRecording();
    audioRecordingButton.html('Start Audio Record');
  } else {
    startAudioRecording();
    audioRecordingButton.html('Stop Audio Record');
  }
  isAudioRecording = !isAudioRecording;
}

function startAudioRecording() {
  let dest = Tone.context.createMediaStreamDestination();
  Tone.Master.connect(dest);
  let audioStream = dest.stream;

  audioRecorder = new MediaRecorder(audioStream);

  audioRecorder.ondataavailable = (event) => {
    audioChunks.push(event.data);
  };

  audioRecorder.onstop = (event) => {
    const blob = new Blob(audioChunks, { type: "audio/webm" });
    audioChunks = [];
    const audioURL = window.URL.createObjectURL(blob);
    const downloadLink = createA(audioURL, 'Audio', '_blank');
    downloadLink.download = 'audio_recording.webm';
    downloadLink.position(windowWidth * 0.55, 35);

    let anchor = document.createElement('a');
    anchor.href = window.URL.createObjectURL(blob);
    anchor.download = 'recording.ogx';
    anchor.click();
  };

  audioRecorder.start();
  logAction('Audio recording started');
}

function stopAudioRecording() {
  if (audioRecorder) {
    audioRecorder.stop();
  }
  logAction('Audio recording stopped');
  saveLogData();
}

function saveLogData() {
  let csvContent = "data:text/csv;charset=utf-8,";
  csvContent += "timestamp,event,shapeType,shapeSize,shapeHue\n";

  interactionLog.forEach(entry => {
    csvContent += `${entry.timestamp},${entry.event},${entry.shapeType},${entry.shapeSize},${entry.shapeHue}\n`;
  });

  let encodedUri = encodeURI(csvContent);
  let link = createA(encodedUri, 'Log', '_blank');
  link.download = "interaction_log.csv";
  link.position(windowWidth * 0.47, 35);
}

function logAction(action) {
  let event = {
    timestamp: new Date().toISOString(),
    event: action,
    shapeType: null,  // Update with actual shapeType if relevant
    shapeSize: null,  // Update with actual shapeSize if relevant
    shapeHue: null    // Update with actual shapeHue if relevant
  };
  interactionLog.push(event);
}

function draw() {
  background(220);
  drawControlPanel();

  // Draw layer labels, frequency sliders, and waveform selectors
  for (let i = 0; i < layers.length; i++) {
    fill(192);
    rect(0, controlPanelHeight + i * layerHeight, labelWidth, layerHeight);

    // Position sliders and selectors within track layer area
    minFreqSliders[i].position(10, controlPanelHeight + i * layerHeight + 10);
    maxFreqSliders[i].position(10, controlPanelHeight + i * layerHeight + 30);
    minFreqSliders[i].style('width', '80px'); // Adjust the width of the frequency slider
    maxFreqSliders[i].style('width', '80px'); // Adjust the width of the frequency slider
    waveformSelectors[i].position(10, controlPanelHeight + i * layerHeight + 90);
    freqDisplays[i].position(10, controlPanelHeight + i * layerHeight + 50);
    freqDisplays[i].html(`Min: ${minFreqSliders[i].value()} Hz<br>Max: ${maxFreqSliders[i].value()} Hz`);

    amplitudeToggles[i].position(10, controlPanelHeight + i * layerHeight + 125);
    panningToggles[i].position(10, controlPanelHeight + i * layerHeight + 150); // Positioning panning toggle below amplitude toggle
    reverbToggles[i].position(10, controlPanelHeight + i * layerHeight + 175); // Positioning reverb toggle below panning toggle
    distortionToggles[i].position(10, controlPanelHeight + i * layerHeight + 200); // Positioning distortion toggle below reverb toggle
  }

  // Draw interaction areas and shapes
  for (let i = 0; i < layers.length; i++) {
    stroke(0);
    line(labelWidth, controlPanelHeight + i * layerHeight, width, controlPanelHeight + i * layerHeight);

    for (let shape of shapes[i]) {
      drawShape(shape);
    }
  }
  line(labelWidth, controlPanelHeight + layers.length * layerHeight, width, controlPanelHeight + layers.length * layerHeight);

  // Draw playhead
  if (playing) {
    stroke(255, 0, 0);
    line(playheadX, controlPanelHeight, playheadX, height);
    playheadX += playheadSpeed;
    if (playheadX > width || playheadX < labelWidth) {
      if (looping) {
        playheadX = playheadX > width ? labelWidth : width;
      } else {
        playheadX = playheadX > width ? labelWidth : width;
        playing = false;
      }
    }
    checkPlayheadCollisions();
  } else {
    stroke(255, 0, 0);
    line(playheadX, controlPanelHeight, playheadX, height);
  }

  // Draw currently dragging shape
  if (draggingShape) {
    drawShape(draggingShape);
  }
}

function mousePressed() {
  if (drawMode && mouseX > labelWidth && mouseX < width && mouseY > controlPanelHeight) {
    let layerIndex = floor((mouseY - controlPanelHeight) / layerHeight);
    if (layerIndex >= 0 && layerIndex < layers.length) {
      if (clearMode) {
        shapes[layerIndex] = shapes[layerIndex].filter(shape => dist(mouseX, mouseY, shape.x, shape.y) > 5);
      } else {
        let xPos = constrain(mouseX, labelWidth, width);
        let yPos = constrain(mouseY, controlPanelHeight + layerIndex * layerHeight, controlPanelHeight + (layerIndex + 1) * layerHeight);
        let minFreq = minFreqSliders[layerIndex].value();
        let maxFreq = maxFreqSliders[layerIndex].value();
        let freq = map(yPos, controlPanelHeight + layerIndex * layerHeight, controlPanelHeight + (layerIndex + 1) * layerHeight, maxFreq, minFreq);
        let waveform = waveformSelectors[layerIndex].value();
        draggingShape = {x: xPos, y: yPos, freq: freq, waveform: waveform, width: 0, playing: false, endY: yPos, amplitude: 1.0, panning: 0.0, reverb: 0.5, curve: [{x: xPos, y: yPos}]};
      }
    }
  }
}

function mouseDragged() {
  if (draggingShape) {
    draggingShape.width = constrain(mouseX, labelWidth, width) - draggingShape.x;
    draggingShape.endY = constrain(mouseY, controlPanelHeight + floor((draggingShape.y - controlPanelHeight) / layerHeight) * layerHeight, controlPanelHeight + (floor((draggingShape.y - controlPanelHeight) / layerHeight) + 1) * layerHeight);
    draggingShape.curve.push({x: mouseX, y: mouseY});
  }
}

function mouseReleased() {
  if (draggingShape) {
    let layerIndex = floor((draggingShape.y - controlPanelHeight) / layerHeight);
    shapes[layerIndex].push(draggingShape);
    createAmplitudeSlider(draggingShape, layerIndex);
    createPanningSlider(draggingShape, layerIndex);
    createReverbSlider(draggingShape, layerIndex);
    createDistortionSlider(draggingShape, layerIndex);
    draggingShape = null;
  }
}

function createAmplitudeSlider(shape, layerIndex) {
  let yPos = shape.y - 80;
  let slider = createSlider(0, 1, shape.amplitude, 0.01);
  slider.position(shape.x, yPos); // Adjust position
  slider.style('width', `${shape.width}px`); // Set width of the slider equal to shape's width
  slider.style('background-color', '#ff6666'); // Set slider color
  slider.input(() => shape.amplitude = slider.value());
  shape.amplitudeSlider = slider;
  amplitudeSliders[layerIndex].push(slider); // Add slider to the array
}

function createPanningSlider(shape, layerIndex) {
  let yPos = shape.y - 60;
  let slider = createSlider(-1, 1, shape.panning, 0.01);
  slider.position(shape.x, yPos); // Adjust position
  slider.style('width', `${shape.width}px`); // Set width of the slider equal to shape's width
  slider.style('background-color', '#6666ff'); // Set slider color
  slider.input(() => shape.panning = slider.value());
  shape.panningSlider = slider;
  panningSliders[layerIndex].push(slider); // Add slider to the array
}

function createReverbSlider(shape, layerIndex) {
  let yPos = shape.y - 40;
  let slider = createSlider(0, 1, shape.reverb, 0.01);
  slider.position(shape.x, yPos); // Adjust position
  slider.style('width', `${shape.width}px`); // Set width of the slider equal to shape's width
  slider.style('background-color', '#66ff66'); // Set slider color
  slider.input(() => shape.reverb = slider.value());
  shape.reverbSlider = slider;
  reverbSliders[layerIndex].push(slider); // Add slider to the array
}

function createDistortionSlider(shape, layerIndex) {
  let yPos = shape.y - 20; // Adjust position as needed
  let slider = createSlider(0, 1, 0, 0.01);
  slider.position(shape.x, yPos); // Adjust position
  slider.style('width', `${shape.width}px`); // Set width of the slider equal to shape's width
  slider.style('background-color', '#ff66ff'); // Set slider color
  slider.input(() => shape.distortion = slider.value());
  shape.distortionSlider = slider;
  distortionSliders[layerIndex].push(slider); // Add slider to the array
}

function createControlPanel() {
  let playButton = createButton('Play');
  playButton.position(width / 2 - 390, 10);
  playButton.mousePressed(() => playing = true);

  let pauseButton = createButton('Pause');
  pauseButton.position(width / 2 - 345, 10);
  pauseButton.mousePressed(() => playing = false);

  let stopButton = createButton('Stop');
  stopButton.position(width / 2 - 285, 10);
  stopButton.mousePressed(() => {
    playing = false;
    playheadX = labelWidth;
    stopAllSounds();
  });

  loopButton = createButton('Loop: OFF');
  loopButton.position(width / 2 - 235, 10);
  loopButton.mousePressed(toggleLoop);

  clearButton = createButton('Clear Mode: OFF');
  clearButton.position(width / 2 - 155, 10);
  clearButton.mousePressed(toggleClearMode);

  clearAllButton = createButton('Clear All');
  clearAllButton.position(width / 2 - 35, 10);
  clearAllButton.mousePressed(clearAllShapes);

  drawButton = createButton('Draw: ON');
  drawButton.position(width / 2 + 35, 10);
  drawButton.mousePressed(toggleDrawMode);

  // Adjust the tempoSlider range from -2 to 5
  tempoSlider = createSlider(-2, 2, 1, 0.1);
  tempoSlider.position(width / 2 + 120, 10);
  tempoSlider.input(updateTempo);

  tempoDisplay = createDiv(`Tempo: ${tempoSlider.value()}`);
  tempoDisplay.position(width / 2 + 120, 30);

  let instructionButton = createButton('Instructions');
  instructionButton.position(width / 2 + 310, 10);
  instructionButton.mousePressed(() => openInstructionPopup(instructionButton));
}

function openInstructionPopup(instructionButton) {
  if (currentLanguage === 'en') {
    window.open('instructions_en.html', 'Instructions', 'width=600,height=400');
    currentLanguage = 'pt';
    instructionButton.html('Instruções');
  } else if (currentLanguage === 'pt') {
    window.open('instructions_pt.html', 'Instructions', 'width=600,height=400');
    currentLanguage = 'en';
    instructionButton.html('Instructions');
  }
}

function drawControlPanel() {
  fill(192);
  rect(0, 0, width, controlPanelHeight);
}

function toggleLoop() {
  looping = !looping;
  loopButton.html(looping ? 'Loop: ON' : 'Loop: OFF');
}

function toggleClearMode() {
  clearMode = !clearMode;
  clearButton.html(clearMode ? 'Clear Mode: ON' : 'Clear Mode: OFF');
}

function toggleDrawMode() {
  drawMode = !drawMode;
  drawButton.html(drawMode ? 'Draw: ON' : 'Draw: OFF');
}

function toggleSliders(layerIndex, type) {
  let toggleState = false;
  if (type === 'amplitude') {
    // Determine the current visibility state and toggle it
    if (amplitudeSliders[layerIndex].length > 0 && amplitudeSliders[layerIndex][0].style('display') === 'none') {
      toggleState = true;
    }
    // Show or hide all amplitude sliders in the layer
    for (let slider of amplitudeSliders[layerIndex]) {
      if (toggleState) {
        slider.show();
      } else {
        slider.hide();
      }
    }
    amplitudeToggles[layerIndex].style('background-color', toggleState ? '#66ff66' : '#ff6666');

  } else if (type === 'panning') {
    if (panningSliders[layerIndex].length > 0 && panningSliders[layerIndex][0].style('display') === 'none') {
      toggleState = true;
    }
    for (let slider of panningSliders[layerIndex]) {
      if (toggleState) {
        slider.show();
      } else {
        slider.hide();
      }
    }
    panningToggles[layerIndex].style('background-color', toggleState ? '#66ff66' : '#ff6666');

  } else if (type === 'reverb') {
    if (reverbSliders[layerIndex].length > 0 && reverbSliders[layerIndex][0].style('display') === 'none') {
      toggleState = true;
    }
    for (let slider of reverbSliders[layerIndex]) {
      if (toggleState) {
        slider.show();
      } else {
        slider.hide();
      }
    }
    reverbToggles[layerIndex].style('background-color', toggleState ? '#66ff66' : '#ff6666');

  } else if (type === 'distortion') {
    if (distortionSliders[layerIndex].length > 0 && distortionSliders[layerIndex][0].style('display') === 'none') {
      toggleState = true;
    }
    for (let slider of distortionSliders[layerIndex]) {
      if (toggleState) {
        slider.show();
      } else {
        slider.hide();
      }
    }
    distortionToggles[layerIndex].style('background-color', toggleState ? '#66ff66' : '#ff6666');
  }
}

function clearAllShapes() {
  for (let i = 0; i < shapes.length; i++) {
    shapes[i] = [];
    for (let slider of amplitudeSliders[i]) {
      slider.remove();
    }
    for (let slider of panningSliders[i]) {
      slider.remove();
    }
    for (let slider of reverbSliders[i]) {
      slider.remove();
    }
    for (let slider of distortionSliders[i]) {
      slider.remove();
    }
  }
}

function updateTempo() {
    // Calculate playheadSpeed based on tempo and frame rate
    playheadSpeed = (tempoSlider.value() * (width - labelWidth)) / frameRate();
    tempoDisplay.html(`Tempo: ${tempoSlider.value()}`);
}

function checkPlayheadCollisions() {
  for (let i = 0; i < shapes.length; i++) {
    for (let shape of shapes[i]) {
      if (tempoSlider.value() >= 0) {
        if (playheadX >= shape.x && playheadX <= shape.curve[shape.curve.length - 1].x && !shape.playing) {
          shape.playing = true;
          playSound(shape, i);
        } else if (shape.playing && (playheadX < shape.x || playheadX > shape.curve[shape.curve.length - 1].x)) {
          shape.playing = false;
          stopSound(shape, i);
        }
      } else {
        if (playheadX <= shape.x && playheadX >= shape.curve[shape.curve.length - 1].x && !shape.playing) {
          shape.playing = true;
          playSound(shape, i);
        } else if (shape.playing && (playheadX > shape.x || playheadX < shape.curve[shape.curve.length - 1].x)) {
          shape.playing = false;
          stopSound(shape, i);
        }
      }
    }
  }
}

function playSound(shape, layerIndex) {
    // Calculate the duration for the sound to match the playhead's travel across the shape
    let duration = (shape.width / playheadSpeed) / frameRate();

    let synth = new Tone.Synth();
    let distortion = new Tone.Distortion(shape.distortion || 0).toDestination(); // Set distortion level
    let reverb = new Tone.Reverb().connect(distortion); // Connect reverb to distortion
    let panner = new Tone.Panner().connect(reverb);
    synth.connect(panner);
    synth.oscillator.type = shape.waveform;
    synth.volume.value = map(shape.amplitude, 0, 1, -60, 0); // Set volume based on amplitude
    panner.pan.value = shape.panning; // Set panning based on the panning slider
    reverb.wet.value = shape.reverb; // Set reverb based on the reverb slider
    shape.synth = synth; // Store the synth in the shape

    let startTime = Tone.now();
    let endTime = startTime + duration;

    // Map the shape's curve points to the playhead time and frequency values
    let times = shape.curve.map(point => map(point.x, shape.x, shape.curve[shape.curve.length - 1].x, startTime, endTime));
    let freqs = shape.curve.map(point => map(point.y, controlPanelHeight + layerIndex * layerHeight, controlPanelHeight + (layerIndex + 1) * layerHeight, maxFreqSliders[layerIndex].value(), minFreqSliders[layerIndex].value()));

    // Set initial frequency
    synth.oscillator.frequency.setValueAtTime(freqs[0], startTime);

    // Schedule frequency changes along the curve
    for (let i = 1; i < times.length; i++) {
        synth.oscillator.frequency.linearRampToValueAtTime(freqs[i], times[i]);
    }

    // Trigger the sound
    synth.triggerAttack(freqs[0], startTime);

    // Stop the sound exactly when the playhead reaches the end of the shape
    Tone.Transport.scheduleOnce(() => {
        synth.triggerRelease();
    }, endTime);
}

function stopSound(shape, layerIndex) {
  if (shape.synth) {
    shape.synth.triggerRelease();
  }
}

function stopAllSounds() {
  for (let i = 0; i < shapes.length; i++) {
    for (let shape of shapes[i]) {
      stopSound(shape, i);
    }
  }
}

function drawShape(shape) {
  stroke(0);

  // Set color based on waveform
  let size = map(shape.amplitude, 0, 1, 10, 50);
  if (shape.waveform === 'sine') {
    fill(0, 0, 255); // Blue for sine
    ellipse(shape.x, shape.y, size, size);
  } else if (shape.waveform === 'triangle') {
    fill(0, 255, 0); // Green for triangle
    triangle(
      shape.x, shape.y - size / 2,
      shape.x - size / 2, shape.y + size / 2,
      shape.x + size / 2, shape.y + size / 2
    );
  } else if (shape.waveform === 'sawtooth') {
    fill(255, 0, 0); // Red for sawtooth
    beginShape();
    vertex(shape.x - size / 2, shape.y - size / 2);
    vertex(shape.x, shape.y + size / 2);
    vertex(shape.x + size / 2, shape.y - size / 2);
    endShape(CLOSE);
  } else if (shape.waveform === 'square') {
    fill(255, 165, 0); // Orange for square
    rect(shape.x - size / 2, shape.y - size / 2, size, size);
  }

  // Draw the line with thickness based on amplitude
  strokeWeight(map(shape.amplitude, 0, 1, 1, 10));
  noFill();
  beginShape();
  shape.curve.forEach(point => vertex(point.x, point.y));
  endShape();

  // Draw endpoints with consistent strokeWeight
  strokeWeight(1);
  noStroke();
  fill(0);
  ellipse(shape.x, shape.y, 5, 5);
  ellipse(shape.curve[shape.curve.length - 1].x, shape.curve[shape.curve.length - 1].y, 5, 5);

  // Draw granular effect based on reverb
  drawGranularEffect(shape);
}

function drawGranularEffect(shape) {
  let grainDensity = map(shape.reverb, 0, 1, 20, 5); // Determine the density of the granular effect based on reverb
  let grainRange = map(shape.reverb, 0, 1, 5, 20); // Range of scatter based on reverb

  stroke(100, 100, 255, 150); // Granular point color
  for (let i = 0; i < shape.curve.length - 1; i++) {
    let x1 = shape.curve[i].x;
    let y1 = shape.curve[i].y;
    let x2 = shape.curve[i + 1].x;
    let y2 = shape.curve[i + 1].y;

    let numGrains = dist(x1, y1, x2, y2) * grainDensity;
    for (let j = 0; j < numGrains; j++) {
      let t = j / numGrains;
      let x = lerp(x1, x2, t) + random(-grainRange, grainRange);
      let y = lerp(y1, y2, t) + random(-grainRange, grainRange);
      point(x, y);
    }
  }
}
