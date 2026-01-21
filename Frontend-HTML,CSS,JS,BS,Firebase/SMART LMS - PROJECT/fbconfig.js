 import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";  //fb thechkodam kosam it is one kind of cdn link
 import {getAuth} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js"; 
 import {getFirestore} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js"

  const firebaseConfig = {
    apiKey: "AIzaSyDHj4_ApBTtfS78jlC_xyzgrSMlh3Zkwqw",
    authDomain: "lms-project-137e2.firebaseapp.com",
    projectId: "lms-project-137e2",
    storageBucket: "lms-project-137e2.firebasestorage.app",
    messagingSenderId: "58719554653",
    appId: "1:58719554653:web:f57a292a594c8ceb3f11b4",
    measurementId: "G-SLYBCFMCP7"
  };


  const FirebaseProjectapp = initializeApp(firebaseConfig);
  export const authentication = getAuth(FirebaseProjectapp)
  export const db = getFirestore(FirebaseProjectapp)
  
