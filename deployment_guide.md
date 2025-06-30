# 🚀 Deployment Guide

This guide covers various deployment options for the Interactive Sound Shapes Playground, from simple static hosting to advanced cloud deployments.

## 📋 Table of Contents

- [Prerequisites](#prerequisites)
- [Static Hosting](#static-hosting)
- [CDN Deployment](#cdn-deployment)
- [Cloud Platforms](#cloud-platforms)
- [Docker Deployment](#docker-deployment)
- [Performance Optimization](#performance-optimization)
- [Security Considerations](#security-considerations)
- [Monitoring and Analytics](#monitoring-and-analytics)
- [Troubleshooting](#troubleshooting)

## ✅ Prerequisites

### Browser Requirements
- **Web Audio API** support (Chrome 34+, Firefox 25+, Safari 14.1+)
- **MediaRecorder API** for recording features (Chrome 47+, Firefox 29+)
- **ES6+ JavaScript** support
- **Canvas API** with adequate performance

### Development Tools
- Git for version control
- Node.js (for development servers and build tools)
- Modern text editor or IDE

### Files to Deploy
```
interactive-sound-shapes/
├── index.html              # Main entry point
├── sketch.js               # Application logic
├── style.css               # Styling
├── instructions_en.html    # English instructions
├── instructions_pt.html    # Portuguese instructions
├── assets/                 # Static assets (if any)
└── docs/                   # Documentation (optional)
```

## 🌐 Static Hosting

### GitHub Pages

#### Method 1: GitHub Actions (Recommended)
```yaml
# .github/workflows/deploy.yml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
    
    - name: Deploy to GitHub Pages
      uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./
```

#### Method 2: Direct Branch Deploy
1. Go to repository Settings → Pages
2. Select source branch (main or gh-pages)
3. Select folder (/ root or /docs)
4. Save and wait for deployment

#### Custom Domain Setup
```
# CNAME file in repository root
your-domain.com
```

### Netlify

#### Drag and Drop Deploy
1. Visit [netlify.com](https://netlify.com)
2. Drag project folder to deploy area
3. Get instant URL

#### Git Integration
```yaml
# netlify.toml
[build]
  publish = "."
  command = "echo 'Static site - no build needed'"

[build.environment]
  NODE_VERSION = "18"

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "SAMEORIGIN"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"

[[headers]]
  for = "/assets/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000"
```

### Vercel

#### Deployment Configuration
```json
{
  "version": 2,
  "name": "interactive-sound-shapes",
  "builds": [
    {
      "src": "**/*",
      "use": "@vercel/static"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/$1"
    }
  ],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "Cross-Origin-Opener-Policy",
          "value": "same-origin"
        },
        {
          "key": "Cross-Origin-Embedder-Policy",
          "value": "require-corp"
        }
      ]
    }
  ]
}
```

### Firebase Hosting

#### Setup
```bash
npm install -g firebase-tools
firebase login
firebase init hosting
firebase deploy
```

#### Configuration
```json
{
  "hosting": {
    "public": ".",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**",
      "docs/**",
      "README.md"
    ],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ],
    "headers": [
      {
        "source": "**/*.@(js|css)",
        "headers": [
          {
            "key": "Cache-Control",
            "value": "max-age=31536000"
          }
        ]
      }
    ]
  }
}
```

## 📡 CDN Deployment

### Cloudflare Pages

#### Git Integration
1. Connect GitHub repository
2. Set build settings:
   - Build command: `echo "Static site"`
   - Build output directory: `/`
3. Deploy

#### Performance Optimization
```javascript
// Add to head of index.html for better CDN performance
<link rel="preload" href="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.4.0/p5.js" as="script">
<link rel="preload" href="https://cdnjs.cloudflare.com/ajax/libs/tone/14.8.35/Tone.min.js" as="script">
```

### AWS CloudFront

#### S3 + CloudFront Setup
```bash
# Create S3 bucket
aws s3 mb s3://your-bucket-name

# Upload files
aws s3 sync . s3://your-bucket-name --exclude ".*" --exclude "docs/*"

# Create CloudFront distribution (via AWS Console)
```

#### CloudFront Configuration
```json
{
  "Origins": [
    {
      "DomainName": "your-bucket-name.s3.amazonaws.com",
      "Id": "S3-interactive-sound-shapes",
      "S3OriginConfig": {
        "OriginAccessIdentity": ""
      }
    }
  ],
  "DefaultCacheBehavior": {
    "TargetOriginId": "S3-interactive-sound-shapes",
    "ViewerProtocolPolicy": "redirect-to-https",
    "Compress": true,
    "TTL": {
      "DefaultTTL": 86400,
      "MaxTTL": 31536000
    }
  }
}
```

## ☁️ Cloud Platforms

### Railway

#### Deployment
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login and deploy
railway login
railway init
railway up
```

#### Configuration
```dockerfile
# Dockerfile (optional for static hosting)
FROM nginx:alpine

COPY . /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

### Heroku (with Express.js)

#### Server Setup
```javascript
// server.js
const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files
app.use(express.static('.'));

// Security headers
app.use((req, res, next) => {
  res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
  res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
  next();
});

// Route all requests to index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

#### Package.json
```json
{
  "name": "interactive-sound-shapes",
  "version": "1.0.0",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  },
  "dependencies": {
    "express": "^4.18.2"
  },
  "engines": {
    "node": ">=14.0.0"
  }
}
```

#### Procfile
```
web: node server.js
```

## 🐳 Docker Deployment

### Dockerfile
```dockerfile
FROM nginx:alpine

# Copy application files
COPY . /usr/share/nginx/html

# Copy custom nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 80
EXPOSE 80

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost/ || exit 1

CMD ["nginx", "-g", "daemon off;"]
```

### Nginx Configuration
```nginx
# nginx.conf
events {
    worker_connections 1024;
}

http {
    include       /etc/nginx/mime.types;
    default_type  application/octet-stream;

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types
        text/plain
        text/css
        text/xml
        text/javascript
        application/javascript
        application/xml+rss
        application/json;

    server {
        listen 80;
        server_name localhost;
        root /usr/share/nginx/html;
        index index.html;

        # Security headers
        add_header Cross-Origin-Opener-Policy same-origin;
        add_header Cross-Origin-Embedder-Policy require-corp;
        add_header X-Frame-Options SAMEORIGIN;
        add_header X-Content-Type-Options nosniff;

        # Cache static assets
        location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
            expires 1y;
            add_header Cache-Control "public, immutable";
        }

        # Handle all routes
        location / {
            try_files $uri $uri/ /index.html;
        }
    }
}
```

### Docker Compose
```yaml
# docker-compose.yml
version: '3.8'

services:
  interactive-sound-shapes:
    build: .
    ports:
      - "80:80"
    restart: unless-stopped
    
  # Optional: Add reverse proxy
  nginx-proxy:
    image: nginx:alpine
    ports:
      - "443:443"
    volumes:
      - ./ssl:/etc/nginx/ssl
      - ./proxy.conf:/etc/nginx/nginx.conf
    depends_on:
      - interactive-sound-shapes
```

### Deployment Commands
```bash
# Build and run locally
docker build -t interactive-sound-shapes .
docker run -p 8080:80 interactive-sound-shapes

# Using docker-compose
docker-compose up -d

# Deploy to production
docker build -t interactive-sound-shapes .
docker tag interactive-sound-shapes your-registry/interactive-sound-shapes:latest
docker push your-registry/interactive-sound-shapes:latest
```

## ⚡ Performance Optimization

### Asset Optimization

#### JavaScript Minification
```html
<!-- Production: Use minified versions -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.4.0/p5.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/tone/14.8.35/Tone.min.js"></script>
```

#### Resource Preloading
```html
<head>
  <!-- Preload critical resources -->
  <link rel="preload" href="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.4.0/p5.min.js" as="script">
  <link rel="preload" href="https://cdnjs.cloudflare.com/ajax/libs/tone/14.8.35/Tone.min.js" as="script">
  
  <!-- DNS prefetch for external domains -->
  <link rel="dns-prefetch" href="//cdnjs.cloudflare.com">
</head>
```

### Caching Strategy
```javascript
// Service Worker for offline capability (optional)
// sw.js
const CACHE_NAME = 'interactive-sound-shapes-v1';
const urlsToCache = [
  '/',
  '/sketch.js',
  '/style.css',
  '/instructions_en.html',
  '/instructions_pt.html'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        return response || fetch(event.request);
      })
  );
});
```

## 🔒 Security Considerations

### Content Security Policy
```html
<meta http-equiv="Content-Security-Policy" content="
  default-src 'self';
  script-src 'self' 'unsafe-inline' https://cdnjs.cloudflare.com;
  style-src 'self' 'unsafe-inline';
  media-src 'self' blob:;
  connect-src 'self';
  img-src 'self' data: blob:;
">
```

### HTTPS Enforcement
```javascript
// Redirect to HTTPS in production
if (location.protocol !== 'https:' && location.hostname !== 'localhost') {
  location.replace('https:' + window.location.href.substring(window.location.protocol.length));
}
```

### Environment Variables
```bash
# .env file for sensitive configuration
NODE_ENV=production
DOMAIN=your-domain.com
SSL_CERT_PATH=/path/to/cert
SSL_KEY_PATH=/path/to/key
```

## 📊 Monitoring and Analytics

### Google Analytics Integration
```html
<!-- Global site tag (gtag.js) - Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_TRACKING_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_TRACKING_ID');
</script>
```

### Error Tracking
```javascript
// Basic error tracking
window.addEventListener('error', (event) => {
  // Send error to monitoring service
  console.error('Global error:', event.error);
  
  // Optional: Send to error tracking service
  // trackError(event.error);
});

// Audio context error handling
window.addEventListener('unhandledrejection', (event) => {
  if (event.reason.name === 'NotAllowedError') {
    console.log('Audio context requires user interaction');
  }
});
```

### Performance Monitoring
```javascript
// Performance monitoring
function trackPerformance() {
  if ('performance' in window) {
    window.addEventListener('load', () => {
      const perfData = performance.getEntriesByType('navigation')[0];
      console.log('Page load time:', perfData.loadEventEnd - perfData.loadEventStart);
      
      // Track to analytics
      gtag('event', 'timing_complete', {
        name: 'load',
        value: Math.round(perfData.loadEventEnd - perfData.loadEventStart)
      });
    });
  }
}
```

## 🛠️ Troubleshooting

### Common Issues

#### Audio Context Issues
```javascript
// Handle audio context suspended state
function ensureAudioContext() {
  if (Tone.context.state === 'suspended') {
    Tone.context.resume().then(() => {
      console.log('Audio context resumed');
    });
  }
}

// Add to user interaction handler
document.addEventListener('click', ensureAudioContext, { once: true });
```

#### CORS Issues
```javascript
// For development server
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
```

#### Mobile Performance
```javascript
// Detect mobile and adjust settings
function isMobile() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

if (isMobile()) {
  // Reduce audio voices
  // Simplify visual effects
  console.log('Mobile optimizations enabled');
}
```

### Debugging Tools

#### Development Server
```javascript
// Simple development server with live reload
const express = require('express');
const livereload = require('livereload');
const connectLiveReload = require('connect-livereload');

const app = express();
const liveReloadServer = livereload.createServer();

app.use(connectLiveReload());
app.use(express.static('.'));

liveReloadServer.watch(__dirname);

app.listen(3000, () => {
  console.log('Development server running on http://localhost:3000');
});
```

#### Log Analysis
```bash
# Analyze web server logs
tail -f /var/log/nginx/access.log | grep "interactive-sound-shapes"

# Monitor performance
curl -w "@curl-format.txt" -o /dev/null -s "https://your-domain.com"
```

### Health Checks
```javascript
// Basic health check endpoint (if using server)
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    version: process.env.npm_package_version
  });
});
```

## 📈 Scaling Considerations

### CDN Configuration
- Enable compression (gzip/brotli)
- Set appropriate cache headers
- Use HTTP/2 push for critical resources
- Implement image optimization

### Load Balancing
```yaml
# docker-compose for load balancing
version: '3.8'

services:
  app:
    build: .
    deploy:
      replicas: 3
    
  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
    volumes:
      - ./nginx-lb.conf:/etc/nginx/nginx.conf
    depends_on:
      - app
```

This deployment guide covers most common scenarios for hosting the Interactive Sound Shapes Playground. Choose the option that best fits your technical requirements and budget constraints.