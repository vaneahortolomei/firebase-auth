import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, collection } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyCQRea8i7eaifxc2fzUw_9CxTCaNt6M0s4",
    authDomain: "auth-25b2f.firebaseapp.com",
    projectId: "auth-25b2f",
    storageBucket: "auth-25b2f.appspot.com",
    messagingSenderId: "979156598733",
    appId: "1:979156598733:web:ef7023bb5f32412cc60e84",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
const usersCollection = collection(db, "users");

export { auth, db, storage, usersCollection };
