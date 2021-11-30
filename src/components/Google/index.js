import "firebase/compat/firestore";

import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { collection, getDocs, getFirestore } from "firebase/firestore/lite";

import Firebase from "firebase/compat/app";
import React from "react";
import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";

//import firebase from "firebase";

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

const app = Firebase.initializeApp(firebaseConfig);

const auth = getAuth(app);

//const db = getFirestore(app);

//const db = Firebase.firestone();

const googleProvider = new GoogleAuthProvider();

async function getUsers(db) {
  const usersCol = collection(db, "users");
  const userSnapshot = await getDocs(usersCol);
  const userList = userSnapshot.docs.map((doc) => doc.data());
  return userList;
}

const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    console.log(user);
    // console.log(db);

    //const users = await getUsers(db);

    //const query = await collection(db, "users");
    // .where("id", "==", user.uid)
    // .get();
    //const usersSnapshot = await getDocs(query);

    //console.log(users);

    // if (query.docs.length === 0) {
    //   await db.collection("users").add({
    //     id: user.uid,
    //     firstname: user.displayName,
    //     authProvider: "google",
    //     email: user.email,
    //   });
    // }

    //console.log(query);
  } catch (error) {
    console.error(error);
    alert(error.message);
  }
};

// const signInWithGoogle = () => {
//   const provider = new GoogleAuthProvider();

//   signInWithPopup(auth, provider)
//     .then((result) => {
//       // This gives you a Google Access Token. You can use it to access the Google API.
//       const credential = GoogleAuthProvider.credentialFromResult(result);
//       const token = credential.accessToken;
//       // The signed-in user info.
//       const user = result.user;
//       console.log(user);

//       setAuthenticated(true);
//       console.log(user);
//       localStorage.setItem("userData", JSON.stringify(user));
//       setAuthData(user);

//       redirectTo("/welcome");
//       alert("Welcome to BandApp!");
//     })
//     .catch((error) => {
//       // Handle Errors here.
//       const errorCode = error.code;
//       const errorMessage = error.message;
//       // The email of the user's account used.
//       const email = error.email;
//       // The AuthCredential type that was used.
//       const credential = GoogleAuthProvider.credentialFromError(error);
//       // ...
//     });

//   // signInWithPopup(auth, provider)
//   //   .then((result) => {
//   //     console.log(result);
//   //   })
//   //   .catch((err) => {
//   //     console.log(err);
//   //   });
// };

// const auth = getAuth();

// signInWithPopup(auth, provider)
//   .then((result) => {
//     // This gives you a Google Access Token. You can use it to access the Google API.
//     const credential = GoogleAuthProvider.credentialFromResult(result);
//     const token = credential.accessToken;
//     // The signed-in user info.
//     const user = result.user;
//     console.log(user);

//     setAuthenticated(true);
//     console.log(user);
//     localStorage.setItem("userData", JSON.stringify(user));
//     setAuthData(user);

//     alert("Welcome to BandApp!");
//     redirectTo("/welcome");
//   })
//   .catch((error) => {
//     // Handle Errors here.
//     const errorCode = error.code;
//     const errorMessage = error.message;
//     // The email of the user's account used.
//     const email = error.email;
//     // The AuthCredential type that was used.
//     const credential = GoogleAuthProvider.credentialFromError(error);
//     // ...
//   });

const logout = () => {
  auth.signOut();
};

export { auth, signInWithGoogle, logout };
