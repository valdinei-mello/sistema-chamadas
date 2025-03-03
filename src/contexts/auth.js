import { useState, createContext, useEffect } from "react";
import { auth, db } from "../services/firebaseConnection";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";

export const AuthContext = createContext({});

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  function signIn(email, password) {
    console.log(email);
    console.log(password);
    alert("Logado");
  }

  async function signUp(email, password, name) {
    setLoading(true);

    await createUserWithEmailAndPassword(auth, email, password)
      .then(async (value) => {
        let uid = value.user.uid;

        await setDoc(doc(db, "users", uid), {
          nome: name,
          avatarUrl: null,
        }).then(() => {
          setLoading(false);
          let data = {
            uid: uid,
            email: value.user.email,
            nome: name,
            avatarUrl: null,
          };

          setUser(data);
        });
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }

  return (
    <AuthContext.Provider
      value={{ signed: !!user, user, signUp, signIn, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
