
import { initializeApp } from "firebase/app";

import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAIG9dNtocN-dtE8-qKIockkXpVZ9ngZMY",
  authDomain: "ecommerse-cb221.firebaseapp.com",
  projectId: "ecommerse-cb221",
  storageBucket: "ecommerse-cb221.appspot.com",
  messagingSenderId: "1043621050913",
  appId: "1:1043621050913:web:32725aeb577e48758ac160",
  measurementId: "G-9LG1KEXB91"
};

const app = initializeApp(firebaseConfig);


export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();

export default app;