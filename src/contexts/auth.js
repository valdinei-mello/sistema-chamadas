import { useState, createContext, useEffect } from "react";
import { auth, db } from "../services/firebaseConnection";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const AuthContext = createContext({});

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

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
          let data = {
            uid: uid,
            email: value.user.email,
            nome: name,
            avatarUrl: null,
          };
          storegeUser(data);
          setLoading(false);
          setUser(data);

          navigate("/dashboard");
          toast.success("Bem vindo(a) a plataforma!");
        });
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }

  function storegeUser(data) {
    localStorage.setItem("@ticketsPRO", JSON.stringify(data));
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
