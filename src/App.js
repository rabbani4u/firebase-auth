import React from "react";
import "./App.css";
import { initializeApp } from "firebase/app";

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyCYlEWkWngXs1GeMAmEyiI4GjYKwvad7rI",
  authDomain: "ema-jhon-simple-be3f1.firebaseapp.com",
  projectId: "ema-jhon-simple-be3f1",
  storageBucket: "ema-jhon-simple-be3f1.appspot.com",
  messagingSenderId: "469552364960",
  appId: "1:469552364960:web:20912b251eaa3e1923f8c5",
};

const app = initializeApp(firebaseConfig);

function App() {
  return <div></div>;
}

export default App;
