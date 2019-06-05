import firebase from 'firebase';

<script src="https://www.gstatic.com/firebasejs/6.1.0/firebase-app.js"></script>


const firebaseConfig = {
  apiKey: "AIzaSyA4yDbpMJo_81wiX8tvikLe7fkrVeJuo4w",
  authDomain: "collegenav-2e04d.firebaseapp.com",
  databaseURL: "https://collegenav-2e04d.firebaseio.com",
  projectId: "collegenav-2e04d",
  storageBucket: "collegenav-2e04d.appspot.com",
  messagingSenderId: "261170856716",
  appId: "1:261170856716:web:a7953ec167b2a338"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;