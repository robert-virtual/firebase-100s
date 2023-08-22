import { initializeApp } from "firebase/app";
import { doc, getFirestore, onSnapshot, setDoc } from "firebase/firestore";
import {
  GoogleAuthProvider,
  getAuth,
  onAuthStateChanged,
  signInWithPopup,
} from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyB27uYhIUbLCnTRQk94QD5BykK49eVs22A",
  authDomain: "fir-100s.firebaseapp.com",
  projectId: "fir-100s",
  storageBucket: "fir-100s.appspot.com",
  messagingSenderId: "39717180902",
  appId: "1:39717180902:web:28dcdbc7f54cd22672b227",
  measurementId: "G-2Z19ES5HQV",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

// onAuthStateChanged(auth, (user) => {
//   console.log("auth changed ", user);
// });

// signInWithPopup(auth, new GoogleAuthProvider());
const firestore = getFirestore(app);
const boatRef = doc(firestore, "boats");
// setDoc(boatRef, {
//   owner: auth.currentUser.uid,
//   name: "Awesome boat",
//   length: 10,
//   color: "red",
// });

// onSnapshot(boatRef, (snapshot) => {
//   console.log("boat changed");
//   const boat = snapshot.data()
// });
