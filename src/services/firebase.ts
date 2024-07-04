import { initializeApp } from "firebase/app";
import "firebase/database";
import * as db from "firebase/database";

const firebaseApp = initializeApp({
  apiKey: "AIzaSyAEL8fEL_F5FojH2RZdwHvhq3petmoJGzk",
  authDomain: "allmylittleprojects-77ed7.firebaseapp.com",
  projectId: "allmylittleprojects-77ed7",
  storageBucket: "allmylittleprojects-77ed7.appspot.com",
  messagingSenderId: "643378218668",
  appId: "1:643378218668:web:000fc07fd1c7e30b37c109",
  measurementId: "G-JHETDEYX6S",
});

// Realtime
const database = db.getDatabase(firebaseApp);
const ref = db.ref;
const get = db.get;
const onValue = db.onValue;
const set = db.set;
const push = db.push;
const remove = db.remove;
const child = db.child;
const update = db.update;
const off = db.off;

export { database, ref, get, onValue, set, push, remove, child, update, off };
