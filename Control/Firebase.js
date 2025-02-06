import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const settings = {timestampsInSnapshots: true,merge:true};
    const config = {
        apiKey: "AIzaSyBMpKabdaqFy4DiunQhCaOhpUqYPZUBmik",
        authDomain: "calificaciones2025-663f5.firebaseapp.com",
        databaseURL: "https://calificaciones2025-663f5-default-rtdb.firebaseio.com",
        projectId: "calificaciones2025-663f5",
        storageBucket: "calificaciones2025-663f5.firebasestorage.app",
        messagingSenderId: "946970536431",
        appId: "1:946970536431:web:2e4b91cdd1f9a68ca12e1a",
        measurementId: "G-EM0RENS2LY"
      };
firebase.initializeApp(config);
firebase.firestore().settings(settings);


export default conexion = firebase.firestore()
const auth = firebase.auth() 
const googleAuthProvider = new firebase.auth.GoogleAuthProvider()

export {
    firebase,
    auth,
   googleAuthProvider,
}