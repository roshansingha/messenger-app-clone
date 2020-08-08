import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyBGAa-dE-33DBL8Zm5ow4jyWs3tjboFWw0",
  authDomain: "fb-messenger-app.firebaseapp.com",
  databaseURL: "https://fb-messenger-app.firebaseio.com",
  projectId: "fb-messenger-app",
  storageBucket: "fb-messenger-app.appspot.com",
  messagingSenderId: "742663594807",
  appId: "1:742663594807:web:995c28d78ef9f65dc4f0b2",
  measurementId: "G-KGYLKZ3F01",
});

const db = firebaseApp.firestore();

export default db;
