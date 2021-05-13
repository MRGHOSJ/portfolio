import firebase from 'firebase/app'
import 'firebase/database'
import 'firebase/storage'


const firebaseApiKey = process.env.REACT_APP_FIREBASE_API_KEY;
const firebaseProjectID = process.env.REACT_APP_FIREBASE_PROJECT_ID;

const config = {
    apiKey: firebaseApiKey,
    authDomain: firebaseProjectID+".firebaseapp.com",
    databaseURL: "https://"+firebaseProjectID+"-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: firebaseProjectID,
    storageBucket: firebaseProjectID+".appspot.com"
}

firebase.initializeApp(config)

const storage = firebase.storage()

export { storage ,firebase as default} 