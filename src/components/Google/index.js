import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";

import React from "react";
import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCMsd0TqlVtLzbcZqZhScOuydTLUAQiK7Y",
  authDomain: "bandapp-607b4.firebaseapp.com",
  databaseURL: "https://bandapp-607b4-default-rtdb.firebaseio.com",
  projectId: "bandapp-607b4",
  storageBucket: "bandapp-607b4.appspot.com",
  messagingSenderId: "1022940869928",
  appId: "1:1022940869928:web:e83d9e6f1b0fbd16ac4c1d",
  measurementId: "G-RWNCEY2WVM",
};

const app = initializeApp(firebaseConfig);

//const analytics = getAnalytics(app);

// createUserWithEmailAndPassword(auth, email, password)
//   .then((userCredential) => {
//     // Signed in
//     const user = userCredential.user;
//     // ...
//   })
//   .catch((error) => {
//     const errorCode = error.code;
//     const errorMessage = error.message;
//     // ..
//   });

export const auth = getAuth(app);
