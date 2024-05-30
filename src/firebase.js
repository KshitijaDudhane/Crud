import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyCx-LmbFMHrUTQoaNbm7wLNZr9jpp-vk8M",
    authDomain: "crud-f7152.firebaseapp.com",
    projectId: "crud-f7152",
    storageBucket: "crud-f7152.appspot.com",
    messagingSenderId: "19004913001",
    appId: "1:19004913001:web:b13f7ea5c63eb35c0db9f8"
  };
  
 
  const app = firebase.initializeApp(firebaseConfig);
  export const db = firebase.firestore();