import firebase from 'firebase/app';
import 'firebase/firestore'
import 'firebase/auth'

const config = {
  apiKey: "AIzaSyDKYZFRQpQvPXl0bmWaXQB7atzOfmM8czI",
  authDomain: "crown-db-cb711.firebaseapp.com",
  databaseURL: "https://crown-db-cb711.firebaseio.com",
  projectId: "crown-db-cb711",
  storageBucket: "crown-db-cb711.appspot.com",
  messagingSenderId: "981816807134",
  appId: "1:981816807134:web:8be8c35f5f376ddfda3c4f",
  measurementId: "G-KZHL9PG2BG"
}

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if(!userAuth) return;
  const userRef = firestore.doc(`users/${userAuth.uid}`)
  const snapShot = await userRef.get()
  
  if(!snapShot.exists) {
    const { displayName, email} = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      })
    } catch(error) {
        console.log('error creating user', error.message)
    }
  }

  return userRef;
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider()
provider.setCustomParameters({ prompt: 'select_account' })
export const signInWithGoogle = () => auth.signInWithPopup(provider)

export default firebase;