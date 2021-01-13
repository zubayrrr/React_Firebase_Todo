import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyAB8LJr_Q8ReSwFfVXwqGrubmOXMx3sbF8",
  authDomain: "auth-110a6.firebaseapp.com",
  databaseURL: "https://auth-110a6.firebaseio.com",
  projectId: "auth-110a6",
  storageBucket: "auth-110a6.appspot.com",
  messagingSenderId: "552737578639",
  appId: "1:552737578639:web:94278aa3acb70e0517dafa",
};
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

export { db };
