import React, { useState } from "react";
import "./App.css";
import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  getAuth,
  signInWithPopup,
  signOut,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

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
  const [newUser, setNewUser] = useState(false);
  const [user, setUser] = useState({
    isSignIn: false,
    name: "",
    email: "",
    password: "",
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
          success: true,
        };
        setUser(signedOutUser);
      })
      .catch(error => {
        // An error happened.
      });
  };
  const handleBlur = event => {
    let isFormValid = true;
    if (event.target.name === "email") {
      isFormValid = /\S+@\S+\.\S+/.test(event.target.value);
    }
    if (event.target.name === "password") {
      const isPasswordValid =
        /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(
          event.target.value
        );
      isFormValid = isPasswordValid;
    }
    if (isFormValid) {
      const newUserInfo = { ...user };
      newUserInfo[event.target.name] = event.target.value;
      setUser(newUserInfo);
    }
  };
  const handleSubmit = event => {
    if (newUser && user.email && user.password) {
      const auth = getAuth();
      createUserWithEmailAndPassword(auth, user.email, user.password)
        .then(res => {
          const newUserInfo = { ...user };
          newUserInfo.error = "";
          newUserInfo.success = true;
          setUser(newUserInfo);
          updateUserName(user.name);
        })
        .catch(error => {
          const newUserInfo = { ...user };
          newUserInfo.error = error.message;
          newUserInfo.success = false;
          setUser(newUserInfo);
        });
    }
    if (!newUser && user.email && user.password) {
      const auth = getAuth();
      signInWithEmailAndPassword(auth, user.email, user.password)
        .then(res => {
          const newUserInfo = { ...user };
          newUserInfo.error = "";
          newUserInfo.success = true;
          setUser(newUserInfo);
          console.log("sign in user", res.user);
        })
        .catch(error => {
          const newUserInfo = { ...user };
          newUserInfo.error = error.message;
          newUserInfo.success = false;
          setUser(newUserInfo);
        });
    }
    event.preventDefault();
  };

  function updateUserName(name) {
    const auth = getAuth();
    updateProfile(auth.currentUser, {
      displayName: name,
    })
      .then(() => {
        console.log("User Updated Successfully");
      })
      .catch(error => {
        console.log(error);
      });
  }

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

      <input
        type="checkbox"
        onChange={() => setNewUser(!newUser)}
        name="newUser"
      />
      <label htmlFor="newUser">New User SignIn</label>
      <form onSubmit={handleSubmit}>
        {newUser && (
          <input
            onBlur={handleBlur}
            type="name"
            name="name"
            placeholder="Your Name"
            required
          />
        )}

        <br />
        <input
          type="text"
          name="email"
          onBlur={handleBlur}
          placeholder="Enter Your Email"
          required
        />
        <br />
        <input
          type="password"
          name="password"
          onBlur={handleBlur}
          placeholder="Enter Your Password"
          required
        />
        <br />
        <input type="submit" value={newUser ? "Sign Up" : "Log In"} />
      </form>
      <p style={{ color: "red" }}>{user.error}</p>
      {user.success && (
        <p style={{ color: "white" }}>
          User {newUser ? "register" : "LogIn"} successfuly
        </p>
      )}
    </div>
  );
}

export default App;
