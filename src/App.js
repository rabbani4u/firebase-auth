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
  const handleChanged = event => {
    //console.log(event.target.value);
    if (event.target.name === "email") {
      const isEmailValid = /\S+@\S+\.\S+/.test(event.target.value);
      console.log(isEmailValid);
    }
    if (event.target.name === "password") {
      const isPasswordValid =
        /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(
          event.target.value
        );
      console.log(isPasswordValid);
    }
  };
  const handleSubmit = () => {};

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
      <div style={{ "margin-bottom": "20px" }}>
        <hr />
        <h2>Your Own Authentication</h2>
      </div>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="email"
          onBlur={handleChanged}
          placeholder="Enter Your Email"
          required
        />
        <br />
        <input
          type="password"
          name="password"
          onBlur={handleChanged}
          placeholder="Enter Your Password"
          required
        />
        <br />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

export default App;
