import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBybWZBFmOWFJZgc9NZ-BMLowJPYmoSNwU",
  authDomain: "tickets-a9117.firebaseapp.com",
  projectId: "tickets-a9117",
  storageBucket: "tickets-a9117.firebasestorage.app",
  messagingSenderId: "398199466212",
  appId: "1:398199466212:web:b6f67a623b95fdf1c4e4f1",
  measurementId: "G-35L4XFTLKJ",
};

const firebaseApp = initializeApp(firebaseConfig);

const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);

export { auth, db, storage };
