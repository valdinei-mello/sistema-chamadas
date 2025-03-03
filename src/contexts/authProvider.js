import { useState } from "react";
import { auth, db } from "../services/firebaseConnection";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "./auth";

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Função de Login
  async function signIn(email, password) {
    setLoading(true);

    await signInWithEmailAndPassword(auth, email, password)
      .then(async (value) => {
        let uid = value.user.uid;

        const docRef = doc(db, "users", uid);
        const docSnap = await getDoc(docRef);

        let data = {
          uid: uid,
          email: value.user.email,
          nome: docSnap.data().nome,
          avatarUrl: docSnap.data().avatarUrl,
        };

        setUser(data);
        storegeUser(data);
        setLoading(false);
        toast.success(`Bem vindo(a) de volta, ${data.nome}!`);
        navigate("/dashboard");
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        toast.error("Ops, algo deu errado! Verifique os dados");
      });
  }

  // Função de Cadastro de Usuário
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
          setUser(data);
          setLoading(false);
          navigate("/dashboard");
          toast.success(`Bem vindo(a) a plataforma, ${data.nome}!`);
        });
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }

  // Função para armazenar os dados do usuário no LocalStorage
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
