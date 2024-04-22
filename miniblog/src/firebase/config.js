import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAXXBioTBQZ5035TU7kfwQwMV4EHmFUkTw",
  authDomain: "miniblog-70847.firebaseapp.com",
  projectId: "miniblog-70847",
  storageBucket: "miniblog-70847.appspot.com",
  messagingSenderId: "658362182951",
  appId: "1:658362182951:web:1b019b4e8d3d0377990d02"
};

const app = initializeApp(firebaseConfig);

const database = getFirestore(app);

export { database }