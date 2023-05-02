import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

const firebaseConfig = {
    apiKey: "AIzaSyCQRea8i7eaifxc2fzUw_9CxTCaNt6M0s4",
    authDomain: "auth-25b2f.firebaseapp.com",
    projectId: "auth-25b2f",
    storageBucket: "auth-25b2f.appspot.com",
    messagingSenderId: "979156598733",
    appId: "1:979156598733:web:ef7023bb5f32412cc60e84",
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();
const usersCollection = db.collection("users");

export { auth, db, storage, usersCollection };
