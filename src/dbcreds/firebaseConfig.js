import { initializeApp } from "firebase/app";
import {getDatabase} from "firebase/database";
const firebaseConfig = {
  apiKey: "AIzaSyD87ruvsmZWekQCPyaChBumV9ma9iaWAkY",
  authDomain: "gameshopdb.firebaseapp.com",
  databaseURL: "https://gameshopdb-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "gameshopdb",
  storageBucket: "gameshopdb.appspot.com",
  messagingSenderId: "1052802931435",
  appId: "1:1052802931435:web:f9dc667f6862e43ee8bcae"
};
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);