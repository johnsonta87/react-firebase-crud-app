import firebase from 'firebase';

// TODO: use ENV varibles later for production

const firebaseConfig = {
  apiKey: "AIzaSyAGKGmB_C2pjntZjzYXd3zq3vlpYlgi_DM",
  authDomain: "walkin-clinic-24546.firebaseapp.com",
  databaseURL: "https://walkin-clinic-24546.firebaseio.com",
  projectId: "walkin-clinic-24546",
  storageBucket: "walkin-clinic-24546.appspot.com",
  messagingSenderId: "1034991589905",
  appId: "1:1034991589905:web:a1cdc2c05f2eab5cc3efb0",
  measurementId: "G-VBVEWSYRRS"
};
try {
  firebase.initializeApp(firebaseConfig);
} catch (err) {
  if (!/already exists/.test(err.message)) {
    console.error('Firebase initialization error', err.stack)
  }
}
const fire = firebase;
export default fire;
