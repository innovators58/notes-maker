// Load face-api.js models
const MODEL_URL = '/models/weights';
Promise.all([
  faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
  faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
  faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL)
]);

// --- Authentication ---

function login() {
  const username = document.getElementById('username').value;
  const storedUsers = JSON.parse(localStorage.getItem('users') || '{}');

  if (storedUsers[username]) {
    // Successful login
    showFaceLockContainer();
  } else {
    alert('Invalid username.');
  }
}

function register() {
  const newUsername = document.getElementById('new-username').value;
  const storedUsers = JSON.parse(localStorage.getItem('users') || '{}');

  if (storedUsers[newUsername]) {
    alert('Username already exists.');
  } else {
    storedUsers[newUsername] = true; // Placeholder - store user data
    localStorage.setItem('users', JSON.stringify(storedUsers));
    alert('Registered successfully!');
    showLoginContainer();
  }
}

function showLoginContainer() {
  document.getElementById('login-container').style.display = 'flex';
  document.getElementById('register-container').style.display = 'none';
  document.getElementById('face-lock-container').style.display = 'none';
}

function showRegisterContainer() {
  document.getElementById('login-container').style.display = 'none';
  document.getElementById('register-container').style.display = 'flex';
  document.getElementById('face-lock-container').style.display = 'none';
}

function showFaceLockContainer() {
  document.getElementById('login-container').style.display = 'none';
  document.getElementById('register-container').style.display = 'none';
  document.getElementById('face-lock-container').style.display = 'block';
  startVideo(); // Start video capture when face lock container is shown
}

// Call showRegisterContainer() initially to show the registration form
showRegisterContainer();

// Start video capture
function startVideo() {
  const video = document.getElementById('video');
  navigator.mediaDevices.getUserMedia({ video: {} })
    .then(stream => {
      console.log('getUserMedia successful:', stream);
      video.srcObject = stream;
    })
    .catch(err => {
      console.error('getUserMedia error:', err);
    });
}

// Detect faces, extract descriptors, and compare with stored descriptor
const video = document.getElementById('video');
video.addEventListener('play', async () => {
  const canvas = faceapi.createCanvasFromMedia(video)
  const videoContainer = document.querySelector('.video-container');
  videoContainer.append(canvas);
  const displaySize = { width: video.width, height: video.height }
  faceapi.matchDimensions(canvas, displaySize)

  setInterval(async () => {
    const detections = await faceapi
      .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
      .withFaceLandmarks()
      .withFaceDescriptors()
    const resizedDetections = faceapi.resizeResults(detections, displaySize)
    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
    faceapi.draw.drawDetections(canvas, resizedDetections)
    faceapi.draw.drawFaceLandmarks(canvas, resizedDetections)

    if (resizedDetections.length > 0) {
      const storedDescriptor = await loadFaceDescriptor();
      if (storedDescriptor) {

        const labeledDescriptors = [
          new faceapi.LabeledFaceDescriptors('authorized', [storedDescriptor]) 
        ];


        const faceMatcher = new faceapi.FaceMatcher(labeledDescriptors, 0.6);
        const bestMatch = faceMatcher.findBestMatch(resizedDetections[0].descriptor);

        const statusText = document.getElementById('lockStatus');
        if (bestMatch.label === 'authorized') {
          statusText.textContent = 'Unlocked';
          // Perform actions for unlocking (e.g., redirect to a page)
        } else {
          statusText.textContent = 'Locked';
        }
      } else {
        console.log('No face descriptor stored. Please register.');
      }
    }
  }, 100);
});

// Function to load stored face descriptor
async function loadFaceDescriptor() {
  const storedData = localStorage.getItem('faceDescriptor');
  if (storedData) {
    return JSON.parse(storedData);
  } else {
    return null;
  }
}

// Function to register face
async function registerFace() {
  const video = document.getElementById('video');
  const detections = await faceapi
    .detectSingleFace(video, new faceapi.TinyFaceDetectorOptions())
    .withFaceLandmarks()
    .withFaceDescriptor();

  if (detections) {
    const descriptor = detections.descriptor;
    // Store the descriptor in localStorage
    localStorage.setItem('faceDescriptor', JSON.stringify(descriptor));
    alert('Face registered successfully!');
  } else {
    alert('No face detected. Please try again.');
  }
}