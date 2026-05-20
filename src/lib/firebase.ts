import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const t = (s: string | undefined) => s?.trim();

const firebaseConfig = {
  apiKey: t(process.env.NEXT_PUBLIC_FIREBASE_API_KEY),
  authDomain: t(process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN),
  projectId: t(process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID),
  storageBucket: t(process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET),
  messagingSenderId: t(process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID),
  appId: t(process.env.NEXT_PUBLIC_FIREBASE_APP_ID),
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
