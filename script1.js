const firebaseConfig = {
  apiKey: "AIzaSyDRClxDVakAbvdj198P3PMoghD-wfWQphI",
  authDomain: "notes-maker-11046.firebaseapp.com",
  databaseURL: "https://notes-maker-11046-default-rtdb.firebaseio.com",
  projectId: "notes-maker-11046",
  storageBucket: "notes-maker-11046.firebasestorage.app",
  messagingSenderId: "466104643742",
  appId: "1:466104643742:web:4e01b00ebe399be2ee4b8f",
  measurementId: "G-4DY5GENV8T"
};

// Initialize Firebase (corrected syntax)
firebase.initializeApp(firebaseConfig);

// Reference your database (example - adjust as needed)
const dbRef = firebase.database().ref(); // For the root of the database
// OR
const cRef = firebase.database().ref("c"); // For the child node "c"