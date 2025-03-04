import { useEffect, useState } from "react"; // Importando hooks para gerenciar estado e efeitos colaterais
import { auth, db } from "../../services/firebaseConnection"; // Importando serviços de autenticação e banco de dados Firebase
import {
  createUserWithEmailAndPassword, // Função para criar um novo usuário
  signInWithEmailAndPassword, // Função para realizar login com email e senha
  signOut, // Função para realizar logout
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore"; // Funções para interagir com o Firestore
import { useNavigate } from "react-router-dom"; // Hook para navegação entre páginas
import { toast } from "react-toastify"; // Biblioteca para mostrar notificações (toasts)
import { AuthContext } from "./auth"; // Contexto para gerenciamento de autenticação

function AuthProvider({ children }) {
  // Declarando variáveis de estado
  const [user, setUser] = useState(null); // Armazenar o usuário atual
  const [loadingAuth, setLoadingAuth] = useState(false); // Estado de carregamento para processos de autenticação
  const navigate = useNavigate(); // Função para navegação
  const [loading, setLoading] = useState(false); // Estado para indicar carregamento da aplicação

  // Efeito para verificar se o usuário está armazenado no localStorage
  useEffect(() => {
    async function loadUser() {
      const userStorage = localStorage.getItem("@ticketsPRO"); // Pegando os dados de usuário armazenados

      if (userStorage) {
        // Se o usuário estiver armazenado, seta o estado com os dados
        setUser(JSON.parse(userStorage));
        setLoading(false);
      }
      setLoading(false); // Define loading como false caso não tenha dados
    }

    loadUser(); // Chama a função para carregar o usuário
  }, []); // O array vazio significa que o efeito será executado apenas uma vez ao carregar o componente

  // Função para realizar o login
  async function signIn(email, password) {
    setLoadingAuth(true); // Define que a autenticação está em andamento

    await signInWithEmailAndPassword(auth, email, password) // Tentando fazer login com email e senha
      .then(async (value) => {
        let uid = value.user.uid; // Pegando o ID do usuário

        const docRef = doc(db, "users", uid); // Referência para o documento do usuário no Firestore
        const docSnap = await getDoc(docRef); // Obtendo os dados do usuário no Firestore

        // Criando o objeto com dados do usuário
        let data = {
          uid: uid,
          email: value.user.email,
          nome: docSnap.data().nome,
          avatarUrl: docSnap.data().avatarUrl,
        };

        setUser(data); // Atualizando o estado com os dados do usuário
        storegeUser(data); // Armazenando os dados do usuário no localStorage
        setLoadingAuth(false); // Definindo que o processo de autenticação acabou
        toast.success(`Bem vindo(a) de volta, ${data.nome}!`); // Exibindo mensagem de sucesso
        navigate("/dashboard"); // Navegando para a página de dashboard
      })
      .catch((error) => {
        console.log(error); // Exibindo o erro no console
        setLoadingAuth(false); // Finalizando o processo de carregamento
        toast.error("Ops, algo deu errado! Verifique os dados"); // Exibindo mensagem de erro
      });
  }

  // Função para realizar o cadastro de um novo usuário
  async function signUp(email, password, name) {
    setLoadingAuth(true); // Define que o processo de cadastro está em andamento

    await createUserWithEmailAndPassword(auth, email, password) // Criando um novo usuário
      .then(async (value) => {
        let uid = value.user.uid; // Pegando o ID do novo usuário

        await setDoc(doc(db, "users", uid), {
          // Salvando os dados do usuário no Firestore
        }).then(() => {
          // Criando o objeto com dados do usuário
          let data = {
            uid: uid,
            email: value.user.email,
            nome: name,
            avatarUrl: null,
          };

          storegeUser(data); // Armazenando os dados do usuário no localStorage
          setUser(data); // Atualizando o estado com os dados do usuário
          setLoadingAuth(false); // Finalizando o processo de carregamento
          navigate("/dashboard"); // Navegando para a página de dashboard
          toast.success(`Bem vindo(a) a plataforma, ${data.nome}!`); // Exibindo mensagem de sucesso
        });
      })
      .catch((error) => {
        console.log(error); // Exibindo o erro no console
        setLoadingAuth(false); // Finalizando o processo de carregamento
      });
  }

  // Função para armazenar os dados do usuário no LocalStorage
  function storegeUser(data) {
    localStorage.setItem("@ticketsPRO", JSON.stringify(data)); // Salvando os dados no localStorage
  }

  // Função para realizar logout
  async function logout() {
    await signOut(auth); // Realizando o logout no Firebase
    localStorage.removeItem("@ticketsPRO"); // Removendo os dados do usuário do localStorage
    setUser(null); // Limpando o estado do usuário
  }

  return (
    // Contexto que fornece os dados de autenticação para os componentes filhos
    <AuthContext.Provider
      value={{
        signed: !!user, // Verifica se o usuário está autenticado
        user, // Dados do usuário autenticado
        signUp, // Função de cadastro
        signIn, // Função de login
        loadingAuth, // Estado de carregamento da autenticação
        loading, // Estado de carregamento geral
        logout, // Função de logout
      }}
    >
      {children} {/* Renderiza os componentes filhos */}
    </AuthContext.Provider>
  );
}

export default AuthProvider; // Exporta o provedor para uso em outras partes da aplicação
