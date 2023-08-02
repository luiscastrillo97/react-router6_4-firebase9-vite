import { initializeApp } from "firebase/app";
import {
    createUserWithEmailAndPassword,
    getAuth,
    signInWithEmailAndPassword,
    signOut,
} from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAylUMnTsAkd1H16gHYLSwiD0yYs64THK4",
    authDomain: "contextreactrouter-1.firebaseapp.com",
    projectId: "contextreactrouter-1",
    storageBucket: "contextreactrouter-1.appspot.com",
    messagingSenderId: "1085829369620",
    appId: "1:1085829369620:web:a2e5fc3090450cfa34bc01",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const registerUser = ({ email, password }) => {
    return createUserWithEmailAndPassword(auth, email, password);
};

export const signInUser = ({ email, password }) => {
    return signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = () => {
    return signOut(auth);
};
