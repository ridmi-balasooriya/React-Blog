import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { initializeApp } from "firebase/app";

/*  Firebase configuration & initialization */
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCOBJ-ZDknWqI7ghSlFp8v5wVPaKQwzqhE",
  authDomain: "react-blog-30c24.firebaseapp.com",
  projectId: "react-blog-30c24",
  storageBucket: "react-blog-30c24.appspot.com",
  messagingSenderId: "934038767874",
  appId: "1:934038767874:web:3b93d259be918e500e1a1b"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

/* End of Firebase configuration & initialization */


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
