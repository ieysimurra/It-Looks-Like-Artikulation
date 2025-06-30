# 🤝 Contributing to Interactive Sound Shapes Playground

First off, thank you for considering contributing to Interactive Sound Shapes Playground! It's people like you that make this project such a great tool for creative expression.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [How Can I Contribute?](#how-can-i-contribute)
- [Development Setup](#development-setup)
- [Coding Standards](#coding-standards)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)
- [Issue Guidelines](#issue-guidelines)

## 📜 Code of Conduct

This project and everyone participating in it is governed by our Code of Conduct. By participating, you are expected to uphold this code. Please report unacceptable behavior to [project email].

### Our Pledge

- **Be Respectful**: Treat everyone with respect and kindness
- **Be Inclusive**: Welcome newcomers and help them feel included
- **Be Collaborative**: Work together towards common goals
- **Be Professional**: Keep discussions focused and constructive

## 🚀 Getting Started

### Prerequisites

- Basic knowledge of JavaScript
- Familiarity with p5.js (helpful but not required)
- Understanding of Web Audio API concepts (for audio-related contributions)
- Git and GitHub knowledge

### Development Environment

1. **Fork and Clone**
```bash
git clone https://github.com/your-username/interactive-sound-shapes.git
cd interactive-sound-shapes
```

2. **Set up local server**
```bash
# Choose one method:
python -m http.server 8000
# or
npx http-server
# or
php -S localhost:8000
```

3. **Test the application**
Open `http://localhost:8000` and verify everything works correctly.

## 💡 How Can I Contribute?

### 🐛 Reporting Bugs

Before creating bug reports, please check existing issues as you might find that the problem has already been reported.

#### Bug Report Template
```markdown
**Describe the bug**
A clear and concise description of what the bug is.

**To Reproduce**
Steps to reproduce the behavior:
1. Go to '...'
2. Click on '....'
3. Scroll down to '....'
4. See error

**Expected behavior**
A clear description of what you expected to happen.

**Screenshots**
If applicable, add screenshots to help explain your problem.

**Environment:**
- OS: [e.g. Windows, macOS, Linux]
- Browser: [e.g. Chrome, Firefox, Safari]
- Version: [e.g. 22]

**Additional context**
Add any other context about the problem here.
```

### 💡 Suggesting Features

Feature suggestions are welcome! Please provide:

- **Clear description** of the feature
- **Use case scenarios** where this would be helpful
- **Mockups or examples** if applicable
- **Implementation considerations** if you have thoughts

#### Feature Request Template
```markdown
**Is your feature request related to a problem?**
A clear description of what the problem is.

**Describe the solution you'd like**
A clear description of what you want to happen.

**Describe alternatives you've considered**
A clear description of any alternative solutions considered.

**Additional context**
Add any other context or screenshots about the feature request here.
```

### 🔧 Code Contributions

Areas where we especially welcome contributions:

#### Audio Features
- New synthesis methods
- Additional audio effects
- MIDI controller support
- Audio export formats

#### Visual Features
- New shape types
- Visual effects and filters
- Animation improvements
- Accessibility features

#### User Experience
- UI/UX improvements
- Mobile responsiveness
- Performance optimizations
- Documentation improvements

#### Creative Features
- Preset saving/loading
- Collaboration features
- Live performance tools
- Educational modes

## ⚙️ Development Setup

### File Structure Understanding
```
interactive-sound-shapes/
├── index.html              # Entry point
├── sketch.js               # Main application logic
├── style.css               # Styling
├── instructions_*.html     # User instructions
├── docs/                   # Documentation
├── assets/                 # Static resources
└── tests/                  # Test files (future)
```

### Key Components to Understand

#### 1. Shape System (`sketch.js`)
- `shapes[]` array structure
- Shape creation and manipulation
- Audio parameter mapping

#### 2. Audio Engine
- Tone.js integration
- Synthesis parameter control
- Effects processing

#### 3. UI Controls
- p5.js UI elements
- Event handling
- State management

#### 4. Recording System
- MediaRecorder API usage
- Canvas capture
- Export functionality

## 📝 Coding Standards

### JavaScript Style Guide

#### General Principles
- Use meaningful variable and function names
- Write self-documenting code
- Add comments for complex logic
- Follow existing code patterns

#### Specific Rules
```javascript
// ✅ Good: Descriptive naming
function createAmplitudeSlider(shape, layerIndex) {
  // Clear purpose and parameters
}

// ❌ Bad: Unclear naming
function createAS(s, i) {
  // Unclear what this does
}

// ✅ Good: Consistent formatting
if (condition) {
  doSomething();
} else {
  doSomethingElse();
}

// ✅ Good: Use const/let appropriately
const FIXED_VALUE = 100;
let variableValue = 0;

// ❌ Bad: Using var
var oldStyle = true;
```

#### p5.js Specific Guidelines
- Use p5.js naming conventions (camelCase)
- Organize setup() and draw() functions clearly
- Document canvas coordinate systems
- Handle window resizing appropriately

#### Audio Code Guidelines
- Always handle Tone.js context properly
- Dispose of audio objects when done
- Use appropriate gain staging
- Document frequency ranges and audio parameters

### Comment Standards
```javascript
/**
 * Creates a new audio slider for shape amplitude control
 * @param {Object} shape - The shape object to control
 * @param {number} layerIndex - Index of the layer (0-2)
 * @returns {p5.Element} The created slider element
 */
function createAmplitudeSlider(shape, layerIndex) {
  // Implementation details...
}
```

## 📤 Commit Guidelines

### Commit Message Format
```
type(scope): description

[optional body]

[optional footer]
```

#### Types
- **feat**: New feature
- **fix**: Bug fix
- **docs**: Documentation changes
- **style**: Code style changes (formatting, etc.)
- **refactor**: Code refactoring
- **test**: Adding or updating tests
- **chore**: Maintenance tasks

#### Examples
```bash
feat(audio): add distortion effect to shapes
fix(ui): resolve slider positioning on mobile
docs(readme): update installation instructions
style(sketch): improve code formatting consistency
```

### Commit Best Practices
- Make atomic commits (one logical change per commit)
- Write clear, descriptive commit messages
- Test your changes before committing
- Don't commit commented-out code or debug logs

## 🔄 Pull Request Process

### Before Submitting
1. **Test thoroughly** on multiple browsers
2. **Update documentation** if needed
3. **Check for console errors**
4. **Verify no functionality is broken**

### PR Template
```markdown
## Description
Brief description of changes made.

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Code refactoring

## Testing
- [ ] Tested on Chrome
- [ ] Tested on Firefox
- [ ] Tested on Safari (if available)
- [ ] Tested on mobile devices

## Screenshots
Add screenshots if UI changes are involved.

## Checklist
- [ ] Code follows project style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] No console errors
```

### Review Process
1. **Automated checks** (if configured)
2. **Code review** by maintainers
3. **Testing verification**
4. **Documentation review**
5. **Merge approval**

## 🐛 Issue Guidelines

### Before Creating an Issue
- Search existing issues
- Check if it's already in development
- Verify it's actually a problem

### Issue Labels
- `bug`: Something isn't working
- `enhancement`: New feature or request
- `documentation`: Improvements to docs
- `good first issue`: Good for newcomers
- `help wanted`: Extra attention is needed
- `priority-high`: Critical issues
- `audio`: Audio-related issues
- `ui`: User interface issues

## 🚀 Development Workflow

### Feature Development
1. **Create issue** describing the feature
2. **Fork and branch** from main
3. **Develop and test** your feature
4. **Update documentation**
5. **Submit pull request**
6. **Address review feedback**
7. **Merge when approved**

### Bug Fixes
1. **Reproduce the bug** locally
2. **Create fix** with minimal changes
3. **Test thoroughly**
4. **Submit pull request** with clear description
5. **Link to original issue**

## 📚 Learning Resources

### p5.js Resources
- [p5.js Reference](https://p5js.org/reference/)
- [p5.js Tutorials](https://p5js.org/learn/)
- [Creative Coding with p5.js](https://www.kadenze.com/courses/introduction-to-programming-for-the-visual-arts-with-p5-js/info)

### Tone.js Resources
- [Tone.js Documentation](https://tonejs.github.io/)
- [Tone.js Examples](https://tonejs.github.io/examples/)
- [Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API)

### JavaScript Resources
- [MDN JavaScript Guide](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide)
- [Modern JavaScript Tutorial](https://javascript.info/)

## 🎉 Recognition

Contributors will be recognized in:
- README.md acknowledgments
- Release notes for significant contributions
- Special contributor badge (when implemented)

## ❓ Questions?

- **General questions**: Open a discussion or issue
- **Development questions**: Tag maintainers in issues
- **Private matters**: Email project maintainers

Thank you for contributing to Interactive Sound Shapes Playground! 🎵✨