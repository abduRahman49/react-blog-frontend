import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";


const firebaseConfig = {
  apiKey: "AIzaSyB3f0MfYjFvSAWhm2uNJQtm2I2StHKhxa0",
  authDomain: "abdou-s-react-blog.firebaseapp.com",
  projectId: "abdou-s-react-blog",
  storageBucket: "abdou-s-react-blog.appspot.com",
  messagingSenderId: "632787227288",
  appId: "1:632787227288:web:caea18de7802513d34b6ed",
  measurementId: "G-KCV31W5141"
};

const app = initializeApp(firebaseConfig);
getAnalytics(app);

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
