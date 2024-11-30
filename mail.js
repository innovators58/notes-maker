// const firebaseConfig = {
//   apiKey: "AIzaSyBJsp2FF5EIzKZfJ2l1zFC96UCWaSjAQ4E",
//   authDomain: "notes-and-reminder-20e39.firebaseapp.com",
//   databaseURL: "https://notes-and-reminder-20e39-default-rtdb.firebaseio.com",
//   projectId: "notes-and-reminder-20e39",
//   storageBucket: "notes-and-reminder-20e39.firebasestorage.app",
//   messagingSenderId: "932326262728",
//   appId: "1:932326262728:web:e4fc29e6547e37bbaee2fd",
// };

// firebase.initializeApp(firebaseConfig);

// var notesloginDB = firebase.database().ref("noteslogin");

// document.getElementById("loginForm").addEventListener("Login", submitForm);

// function submitForm(e) {
//   e.preventDefault();
//   var name= getElementVal('name');
//   var email= getElementVal('email');
//   var pass=getElementVal('password');


//  saveMessages (name , email , pass);
// }

// const saveMessages=(name,email,pass) => {

//     var newform= notesloginDB.push();

//     newform.set({
//         name:name,
//         email:email,
//         pass:pass,
//     });

// }

// const getElementVal =(id) =>{

//     return document.getElementById(id).value;
// }
 
















<script type="module">
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import {
  getDatabase,
  ref,
  get,
  child,
  set
} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyB6gkkjycKF75IkIlbF83aX4uFBQ1naozU",
  authDomain: "notesproject-eb1d4.firebaseapp.com",
  databaseURL: "https://notesproject-eb1d4-default-rtdb.firebaseio.com",
  projectId: "notesproject-eb1d4",
  storageBucket: "notesproject-eb1d4.appspot.com",
  messagingSenderId: "771652433854",
  appId: "1:771652433854:web:b7a0469b695e4c60a6abef",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Login Functionality
document.getElementById("loginButton").addEventListener("click", async function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if (!name || !email || !password) {
    alert("Please fill out all fields.");
    return;
  }

  try {
    const dbRef = ref(db);
    const snapshot = await get(child(dbRef, "users/" + name));
    if (snapshot.exists()) {
      const userData = snapshot.val();

      // Validate email and password
      if (userData.email === email && userData.password === password) {
        alert("Login successful!");
        window.location.href = "login_first.html"; // Redirect to the next page
      } else {
        alert("Incorrect email or password. Please try again.");
      }
    } else {
      alert("User not found. Please sign up first.");
    }
  } catch (error) {
    console.error("Error during login:", error);
    alert("Failed to log in. Please try again later.");
  }
});

// Signup Functionality
document.getElementById("signupButton").addEventListener("click", async function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if (!name || !email || !password) {
    alert("Please fill out all fields.");
    return;
  }

  try {
    const dbRef = ref(db);
    const snapshot = await get(child(dbRef, "users/" + name));
    if (snapshot.exists()) {
      alert("User already exists. Please log in.");
    } else {
      // Save new user data
      await set(ref(db, "users/" + name), {
        name: name,
        email: email,
        password: password,
      });
      alert("Signup successful! You can now log in.");
    }
  } catch (error) {
    console.error("Error during signup:", error);
    alert("Failed to sign up. Please try again later.");
  }
});
</script>