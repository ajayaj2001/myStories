import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { useEffect, useState } from "react";

import { auth } from ".";
import { createUserInDb } from "./operations";

export default function useFirebaseAuth() {
  const [authUser, setAuthUser] = useState(null);
  const [loading, setLoading] = useState(true);
  // ...
  const clear = () => {
    setAuthUser(null);
    setLoading(true);
  };

  const formatAuthUser = (user) => ({
    uid: user.uid,
    email: user.email,
  });

  const authStateChanged = async (authState) => {
    if (!authState) {
      setAuthUser(null);
      setLoading(false);
      return;
    }
    setLoading(true);

    var formattedUser = formatAuthUser(authState);
    setAuthUser(formattedUser);
    setLoading(false);
  };

  const signInUser = (email, password) =>
    signInWithEmailAndPassword(auth, email, password);

  const createUser = (userDetails) => {
    let userProp = {
      email: userDetails.email.value,
      password: userDetails.password.value,
      name: userDetails.name.value,
      about: userDetails.about.value,
      profileUrl: userDetails.profileUrl.value,
      instagramUrl: userDetails.instagramUrl.value,
      facebookUrl: userDetails.facebookUrl.value,
      twitterUrl: userDetails.twitterUrl.value,
    };

    return createUserWithEmailAndPassword(
      auth,
      userProp.email,
      userProp.password
    ).then(async (result) => {
      console.log(result);
      return await createUserInDb(userProp, result.user.uid);
    });
  };

  const signOutUser = () => signOut(auth).then(clear);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, authStateChanged);
    return () => unsubscribe();
  }, []);

  return {
    authUser,
    loading,
    signInUser,
    createUser,
    signOutUser,
  };
}
