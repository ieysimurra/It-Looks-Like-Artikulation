# 🎵 Interactive Sound Shapes Playground

An interactive musical application that allows you to draw shapes that transform into sounds, creating unique soundscapes through visual interaction.

## 📖 Table of Contents

- [About the Project](#about-the-project)
- [Features](#features)
- [Demo](#demo)
- [Installation](#installation)
- [How to Use](#how-to-use)
- [Architecture](#architecture)
- [Technologies](#technologies)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## 🎯 About the Project

The **Interactive Sound Shapes Playground** is an experimental web application that explores the intersection between visual art and music. Inspired by works like György Ligeti's "Artikulation," this project allows users to create sound compositions by drawing geometric shapes on an interactive canvas.

### ✨ Features

#### 🎨 Layer System
- **3 Independent Layers**: Each layer functions as a separate musical track
- **Individual Controls**: Each layer has its own frequency and waveform controls
- **Sound Layering**: Multiple layers can play simultaneously

#### 🎛️ Sound Controls
- **4 Wave Types**: Sine, Triangle, Sawtooth, Square
- **Frequency Control**: Sliders to define minimum and maximum frequencies per layer
- **Sound Effects**:
  - 🔊 **Amplitude**: Individual volume control per shape
  - 🎚️ **Panning**: Stereo positioning
  - 🌊 **Reverb**: Reverberation effect
  - 🔥 **Distortion**: Harmonic distortion

#### 🎮 Interactive Interface
- **Draw Mode**: Draw shapes by clicking and dragging
- **Edit Mode**: Move and adjust existing shapes
- **Clear Mode**: Remove individual shapes or clear all at once
- **Playhead**: Playback line that traverses the canvas playing sounds
- **Tempo Controls**: Adjust playback speed
- **Loop**: Continuous playback

#### 📹 Recording
- **Video Recording**: Capture visual interaction with audio
- **Audio Recording**: Record only the composition's audio
- **Interaction Log**: Export interaction data as CSV

## 🚀 Demo

Access the online demonstration: [https://editor.p5js.org/ieysimurra/sketches/zaegH5Sb1](https://editor.p5js.org/ieysimurra/sketches/zaegH5Sb1)

## 🛠️ Installation

### Prerequisites
- Modern web browser with Web Audio API support
- Local web server (for development)

### Local Installation

1. **Clone the repository**
```bash
git clone https://github.com/your-username/interactive-sound-shapes.git
cd interactive-sound-shapes
```

2. **Start a local server**
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000

# Node.js (with http-server)
npx http-server
```

3. **Access in browser**
```
http://localhost:8000
```

### Dependencies
- **p5.js** v1.4.0 - Creative coding framework
- **Tone.js** v14.8.35 - Web audio library

## 📱 How to Use

### Creating Your First Composition

1. **Enable Draw Mode**: Make sure "Draw: ON" is activated
2. **Choose a Layer**: Each horizontal strip represents a layer
3. **Draw a Shape**: Click and drag to create a sound shape
4. **Adjust Parameters**: Use sliders to set frequencies and effects
5. **Play**: Click "Play" to hear your creation

### Main Controls

#### Control Panel
- **Play/Pause/Stop**: Basic playback controls
- **Loop**: Enable/disable continuous playback
- **Tempo**: Adjust playhead speed (-2x to 2x)
- **Clear Mode**: Activate mode to remove shapes
- **Draw Mode**: Toggle between drawing and editing

#### Layer Controls
- **Min/Max Frequency**: Define pitch range for the layer
- **Wave Type**: Select sound wave shape
- **Effects**: Toggles for amplitude, panning, reverb, and distortion

### Advanced Tips

#### Creating Melodies
- **Vertical Position**: Determines note pitch
- **Shape Width**: Defines sound duration
- **Curves**: Draw curves to create glissandos

#### Building Rhythms
- **Short Shapes**: Create percussive sounds
- **Spacing**: Use gaps to create rhythmic pauses
- **Multiple Layers**: Overlay different rhythms

#### Sound Effects
- **High Reverb**: Creates ethereal atmospheres
- **Distortion**: Adds aggressive character
- **Panning**: Creates spatial movement

## 🏗️ Architecture

### File Structure
```
interactive-sound-shapes/
├── index.html              # Main page
├── sketch.js               # Main application logic
├── style.css               # CSS styles
├── instructions_en.html    # English instructions
├── instructions_pt.html    # Portuguese instructions
├── docs/                   # Documentation
│   ├── API.md
│   ├── CONTRIBUTING.md
│   └── examples/
├── assets/                 # Static resources
│   └── images/
└── README.md
```

### Main Components

#### Core Classes
- **Shape**: Represents a drawn sound shape
- **Layer**: Manages a layer of shapes
- **AudioEngine**: Interface with Tone.js
- **Recorder**: Recording system

#### Data Flow
```
User Input → Shape Creation → Audio Synthesis → Visual Feedback
```

## 🔧 Technologies

### Frontend
- **p5.js**: Framework for creative art and visualization
- **Tone.js**: Audio synthesis and processing
- **HTML5 Canvas**: Graphics rendering
- **Web Audio API**: Native audio processing

### Web Features
- **MediaRecorder API**: Video/audio recording
- **Canvas Capture**: Canvas capture for video
- **File Download**: File export

## 🤝 Contributing

Contributions are very welcome! Here's how you can help:

### Types of Contribution
- 🐛 **Bug Reports**: Report found issues
- 💡 **Feature Requests**: Suggest new features
- 📚 **Documentation**: Improve documentation
- 🔧 **Code**: Contribute with code

### Contribution Process

1. **Fork the project**
2. **Create a feature branch** (`git checkout -b feature/AmazingFeature`)
3. **Commit your changes** (`git commit -m 'Add some AmazingFeature'`)
4. **Push to the branch** (`git push origin feature/AmazingFeature`)
5. **Open a Pull Request**

### Development Guidelines
- Follow JavaScript code conventions
- Add comments for complex features
- Test your changes in different browsers
- Keep documentation updated

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

### Academic Use
This project is especially suitable for:
- Digital art and electronic music courses
- Creative programming workshops
- Musical interface research
- Interactive art projects

## 📬 Contact

- **Developer**: [Your Name]
- **Email**: youremail@example.com
- **Project**: [https://github.com/your-username/interactive-sound-shapes](https://github.com/your-username/interactive-sound-shapes)

## 🙏 Acknowledgments

- György Ligeti for "Artikulation" - conceptual inspiration
- p5.js community for the incredible tool
- Tone.js for advanced audio resources
- Open source contributors

## 📚 References

- [Artikulation - György Ligeti](https://en.wikipedia.org/wiki/Artikulation_(Ligeti))
- [p5.js Documentation](https://p5js.org/reference/)
- [Tone.js Documentation](https://tonejs.github.io/)
- [Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API)

---

⭐ **If this project helped you, consider giving it a star!** ⭐