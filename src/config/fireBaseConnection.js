import { initializeApp } from 'firebase/app'
import { getStorage } from 'firebase/storage'
import { getAuth } from 'firebase/auth'
import { getFirestore } from "firebase/firestore"


const firebaseConfig = {
    apiKey: "AIzaSyCFJj0DoLrF5zbVofVE4TcIv9b6GWV4kfE",
    authDomain: "tickets-196eb.firebaseapp.com",
    projectId: "tickets-196eb",
    storageBucket: "tickets-196eb.appspot.com",
    messagingSenderId: "606264028056",
    appId: "1:606264028056:web:4eb86a5e12ec36d40e59ed",
    measurementId: "G-7L79DQ9ZS7"
  };

  const firebaseApp = initializeApp(firebaseConfig);

  const auth = getAuth(firebaseApp);
  const db = getFirestore(firebaseApp);
  const storage = getStorage(firebaseApp);

  export { auth, db, storage };