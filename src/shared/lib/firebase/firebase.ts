'use client';

// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  sendSignInLinkToEmail,
  signInWithEmailAndPassword,
  signInWithEmailLink,
  signInWithPopup,
  signOut,
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export const sendSignInLink = async (email: string) => {
  try {
    await sendSignInLinkToEmail(auth, email, {
      url: process.env.NEXT_PUBLIC_BASE_URL ?? '',
    });
    return email;
  } catch (error) {
    throw error;
  }
};

export const firebaseSignInWithEmailLink = async (email: string) => {
  try {
    const result = await signInWithEmailLink(
      auth,
      email,
      process.env.NEXT_PUBLIC_BASE_URL,
    );
    return { user: result.user };
  } catch (error) {
    throw error;
  }
};

export const firebaseCreateUserWithEmailAndPassword = async (
  email: string,
  password: string,
) => {
  try {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    return { user: result.user };
  } catch (error) {
    throw error;
  }
};

export const firebaseSignInWithEmail = async (
  email: string,
  password: string,
) => {
  try {
    const result = await signInWithEmailAndPassword(auth, email, password);
    return { user: result.user };
  } catch (error) {
    throw error;
  }
};

export const firebaseSignInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account' });
  try {
    const result = await signInWithPopup(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    return { user: result.user };
  } catch (error) {
    throw error;
  }
};

export const firebaseSignOut = async () => {
  try {
    return await signOut(auth);
  } catch (error) {
    throw error;
  }
};
