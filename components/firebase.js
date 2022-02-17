import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBjcztaf2B926EuIJ8N5MpH4mFLGvBPcxE",
  authDomain: "rcoegamerverse.firebaseapp.com",
  databaseURL: "https://rcoegamerverse-default-rtdb.firebaseio.com",
  projectId: "rcoegamerverse",
  storageBucket: "rcoegamerverse.appspot.com",
  messagingSenderId: "742650288731",
  appId: "1:742650288731:web:f95ecf509c7e96d8837d7e",
  measurementId: "G-6LY8L92WW2"
};

const fire = initializeApp(firebaseConfig);

export default fire;
