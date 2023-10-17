// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signOut,
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyC8l-TLm386qc5roi8_JaM8cBiD-SrWuoU',
  authDomain: 'misotenb.firebaseapp.com',
  projectId: 'misotenb',
  storageBucket: 'misotenb.appspot.com',
  messagingSenderId: '613896956187',
  appId: '1:613896956187:web:f248b3bafda04887204bbe',
  measurementId: 'G-8VBG2K6KXR',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
auth.languageCode = 'it';

export const firebaseSignIn = async () => {
  const provider = new GoogleAuthProvider();
  const result = await signInWithPopup(auth, provider)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential!.accessToken;
      const user = result.user;
    })
    .catch((error) => {});
};

export const firebaseSignOut = async () => {
  try {
    return await signOut(auth);
  } catch (error) {
    console.error(error);
  }
};
