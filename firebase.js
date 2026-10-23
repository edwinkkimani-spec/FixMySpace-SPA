
import { initializeApp } from "https://www.gstatic.com/firebasejs/13.1.0/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  set,
  get,
  onValue,
} from "https://www.gstatic.com/firebasejs/13.1.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyDOhPBf7OgKz2wmKfauqkKHK2kMtoR9QiE",
  authDomain: "fixmyspace-506ca.firebaseapp.com",
  databaseURL: "https://fixmyspace-506ca-default-rtdb.firebaseio.com",
  projectId: "fixmyspace-506ca",
  storageBucket: "fixmyspace-506ca.firebasestorage.app",
  messagingSenderId: "68887324249",
  appId: "1:68887324249:web:ee86086f81a89deac27348",
  measurementId: "G-RVFPMRKXMJ",
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database, ref, push, set, get, onValue };
