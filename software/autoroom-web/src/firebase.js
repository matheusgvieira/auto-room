import firebase from 'firebase';
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBTED-rL_Iq5kRY8PxDJoCotz6PLwiI13s",
    authDomain: "autoroom-1a19b.firebaseapp.com",
    databaseURL: "https://autoroom-1a19b.firebaseio.com",
    projectId: "autoroom-1a19b",
    storageBucket: "autoroom-1a19b.appspot.com",
    messagingSenderId: "1003878804264",
    appId: "1:1003878804264:web:bc9084b663b1e80f953e1d",
    measurementId: "G-SR4X69F4JM"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export default firebase;