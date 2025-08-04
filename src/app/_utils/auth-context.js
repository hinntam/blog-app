"use client";
 
import { useContext, createContext, useState, useEffect } from "react";
import {
  signInWithGoogle,
  signInWithGithub,
  signInWithEmail,
  signUpWithEmail,
  logOut,
  auth,
  onAuthStateChanged
} from "./firebase";
 
const AuthContext = createContext();
 
export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
 
  const googleSignIn = async () => {
    try {
      const result = await signInWithGoogle();
      return result;
    } catch (error) {
      return { user: null, error: error.message };
    }
  };

  const githubSignIn = async () => {
    try {
      const result = await signInWithGithub();
      return result;
    } catch (error) {
      return { user: null, error: error.message };
    }
  };

  const emailSignIn = async (email, password) => {
    try {
      const result = await signInWithEmail(email, password);
      return result;
    } catch (error) {
      return { user: null, error: error.message };
    }
  };

  const emailSignUp = async (email, password) => {
    try {
      const result = await signUpWithEmail(email, password);
      return result;
    } catch (error) {
      return { user: null, error: error.message };
    }
  };
 
  const firebaseSignOut = async () => {
    try {
      const result = await logOut();
      return result;
    } catch (error) {
      return { error: error.message };
    }
  };
 
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);
 
  return (
    <AuthContext.Provider value={{ 
      user, 
      loading,
      googleSignIn,
      githubSignIn, 
      emailSignIn,
      emailSignUp,
      firebaseSignOut 
    }}>
      {children}
    </AuthContext.Provider>
  );
};
 
export const useUserAuth = () => {
  return useContext(AuthContext);
};