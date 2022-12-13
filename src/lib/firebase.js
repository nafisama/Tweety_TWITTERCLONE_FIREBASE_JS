// Import the functions you need from the SDKs you need
import { getApp, getApps,initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
import {getAuth} from "firebase/auth"
import {getStorage} from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD1DJjf_NtcVCIrx3BcX3eIBs6xdNcjEFY",
  authDomain: "tweety-v1.firebaseapp.com",
  projectId: "tweety-v1",
  storageBucket: "tweety-v1.appspot.com",
  messagingSenderId: "568947770539",
  appId: "1:568947770539:web:6ba3fc094c34e801bd63ee"
};

// Initialize Firebase
initializeApp(firebaseConfig)
const app = !getApp().length? initializeApp(firebaseConfig) :getApp() 
const db = getFirestore(app)
const auth = getAuth(app)
const storage = getStorage(app)

export{
    app,
    db,
    auth,
    storage
}