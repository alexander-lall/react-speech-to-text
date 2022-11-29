import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCU4V3yatzarKKDD-Zv21U7i0G_X0orJ-E",
    authDomain: "speech-to-text-db.firebaseapp.com",
    projectId: "speech-to-text-db",
    storageBucket: "speech-to-text-db.appspot.com",
    messagingSenderId: "289463246738",
    appId: "1:289463246738:web:b49f71c9ad203d5fc26b4b",
    measurementId: "G-HH4F73GYTH"
}

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if(!userAuth) return;

    const userRef = doc(db, `users/${userAuth.uid}`);
    const snapShot = await getDoc(userRef);       

    if(!snapShot.exists()) {
        const {displayName, email } = userAuth;
        const createdAt = new Date();
        try {
            await setDoc(userRef, {
                displayName,
                email,
                createdAt,
                ...additionalData
            });
        }
        catch (error) {
            console.error('Error creating user', error.message);
        }
    }

    return userRef;
}

const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => signInWithPopup(auth, provider);