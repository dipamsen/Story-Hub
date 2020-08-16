import firebase from 'firebase';
import '@firebase/firestore';

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyDbetPtfOz5q-equpgLjpYZymluDYc67cE",
  authDomain: "hurdle-race-game.firebaseapp.com",
  databaseURL: "https://hurdle-race-game.firebaseio.com",
  projectId: "hurdle-race-game",
  storageBucket: "hurdle-race-game.appspot.com",
  messagingSenderId: "206389420628",
  appId: "1:206389420628:web:298922a56e4f5d44f543c1"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase.firestore();