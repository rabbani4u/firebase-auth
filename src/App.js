import React, { useState } from "react";
import "./App.css";
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider } from "firebase/auth";
import { getAuth, signInWithPopup } from "firebase/auth";
import { signOut } from "firebase/auth";

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
  const [user, setUser] = useState({
    isSignIn: false,
    name: "",
    email: "",
    photo: "",
  });
  const provider = new GoogleAuthProvider();

  const myStyle = {
    color: "white",
    backgroundColor: "DodgerBlue",
    padding: "10px",
    fontFamily: "Arial",
  };
  const handleSignIn = () => {
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then(result => {
        const { displayName, photoURL, email } = result.user;
        const signedInUser = {
          isSignIn: true,
          name: displayName,
          email: email,
          photo: photoURL,
        };
        setUser(signedInUser);
        console.log(result);
      })
      .catch(err => {
        console.log(err);
        console.log(err.message);
      });
  };
  const handleSignOut = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        const signedOutUser = {
          isSignIn: false,
          name: "",
          email: "",
          photo: "",
        };
        setUser(signedOutUser);
      })
      .catch(error => {
        // An error happened.
      });
  };

  return (
    <div className="App">
      {user.isSignIn ? (
        <button onClick={handleSignOut} style={myStyle}>
          Sign Out
        </button>
      ) : (
        <button onClick={handleSignIn} style={myStyle}>
          Sign In
        </button>
      )}
      {user.isSignIn && (
        <div>
          <p>Welcome, {user.name}</p>
          <p>Your email {user.email}</p>
          <img src={user.photo} alt="" />
        </div>
      )}
    </div>
  );
}

export default App;
