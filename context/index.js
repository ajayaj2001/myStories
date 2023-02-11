import { createContext } from "react";
import useFirebaseAuth from "../firebaseConfig/AuthFunction";

export const authUserContext = createContext({
  authUser: null,
  loading: true,
  signInUser: async () => {},
  createUser: async () => {},
  signOutUser: async () => {},
});

export function AuthUserProvider({ children }) {
  const auth = useFirebaseAuth();
  return (
    <authUserContext.Provider value={auth}>{children}</authUserContext.Provider>
  );
}
