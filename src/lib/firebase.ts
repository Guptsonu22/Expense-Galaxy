
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  projectId: "expense-insights-henjd",
  appId: "1:1032616110089:web:33a58ba8a85dae549530d8",
  storageBucket: "expense-insights-henjd.firebasestorage.app",
  apiKey: "AIzaSyCGX8LITRbUQY8djgx55i_rvBeFa6cWw2A",
  authDomain: "expense-insights-henjd.firebaseapp.com",
  measurementId: "",
  messagingSenderId: "1032616110089"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app, {
  persistence: typeof window !== 'undefined' ? undefined : undefined,
});

export { app, auth };
