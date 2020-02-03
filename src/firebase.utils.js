import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';

var firebaseConfig = {
  apiKey: 'AIzaSyA0PlPToTOd3OSeR0U8dQZ7qK1aOSGE130',
  authDomain: 'powerchat-1dbd5.firebaseapp.com',
  databaseURL: 'https://powerchat-1dbd5.firebaseio.com',
  projectId: 'powerchat-1dbd5',
  storageBucket: 'powerchat-1dbd5.appspot.com',
  messagingSenderId: '905490890253',
  appId: '1:905490890253:web:9021d7115f80d0e8091f44',
  measurementId: 'G-SFTV9X90QN'
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
