import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";

import React from "react";
import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBdu2_tb7Dv815pp7CJSN5Cx6sBUL74ipI",
  authDomain: "loginapp-4c376.firebaseapp.com",
  projectId: "loginapp-4c376",
  storageBucket: "loginapp-4c376.appspot.com",
  messagingSenderId: "60057457075",
  appId: "1:60057457075:web:aaa78099a605cf4000fbc6",
  measurementId: "G-XJV5RVY9TG",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);



const auth = getAuth();
createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in
    const user = userCredential.user;
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
  });
