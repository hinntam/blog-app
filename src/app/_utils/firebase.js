// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  GoogleAuthProvider, 
  GithubAuthProvider, 
  signInWithPopup, 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged 
} from "firebase/auth";

// Helper function to save user to database
const saveUserToDatabase = async (user) => {
  try {
    const response = await fetch('/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        uid: user.uid,
        email: user.email,
        displayName: user.displayName
      }),
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || 'Failed to save user to database');
    }

    return data;
  } catch (error) {
    console.error('Error saving user to database:', error);
    throw error;
  }
};
 
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};
 
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// Initialize providers
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

// Configure providers
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

githubProvider.setCustomParameters({
  prompt: 'consent'
});

// Authentication functions
export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    
    // Save user to database
    const dbResult = await saveUserToDatabase(result.user);
    
    return { 
      user: result.user, 
      error: null, 
      dbUser: dbResult.user,
      message: dbResult.message,
      isNewUser: dbResult.isNewUser
    };
  } catch (error) {
    console.error('Google sign-in error:', error);
    return { user: null, error: error.message };
  }
};

export const signInWithGithub = async () => {
  try {
    const result = await signInWithPopup(auth, githubProvider);
    
    // Save user to database
    const dbResult = await saveUserToDatabase(result.user);
    
    return { 
      user: result.user, 
      error: null, 
      dbUser: dbResult.user,
      message: dbResult.message,
      isNewUser: dbResult.isNewUser
    };
  } catch (error) {
    console.error('GitHub sign-in error:', error);
    return { user: null, error: error.message };
  }
};

export const signInWithEmail = async (email, password) => {
  try {
    const result = await signInWithEmailAndPassword(auth, email, password);
    
    // Save user to database (update last login)
    const dbResult = await saveUserToDatabase(result.user);
    
    return { 
      user: result.user, 
      error: null, 
      dbUser: dbResult.user,
      message: dbResult.message,
      isNewUser: dbResult.isNewUser
    };
  } catch (error) {
    console.error('Email sign-in error:', error);
    return { user: null, error: error.message };
  }
};

export const signUpWithEmail = async (email, password) => {
  try {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    
    // Save new user to database
    const dbResult = await saveUserToDatabase(result.user);
    
    return { 
      user: result.user, 
      error: null, 
      dbUser: dbResult.user,
      message: dbResult.message,
      isNewUser: dbResult.isNewUser
    };
  } catch (error) {
    console.error('Email sign-up error:', error);
    return { user: null, error: error.message };
  }
};

export const logOut = async () => {
  try {
    await signOut(auth);
    return { error: null };
  } catch (error) {
    return { error: error.message };
  }
};

export { onAuthStateChanged };