import "./signin.css";
import logo from "../../assets/logo.png";
import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/auth";

export default function SignIn() {
  // Estado para armazenar o email e a senha digitados pelo usuário
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Extraindo a função signIn e o estado de loading do AuthContext
  const { signIn, loading } = useContext(AuthContext);

  // Função que lida com o envio do formulário
  async function handleSighIn(e) {
    e.preventDefault(); // Impede o comportamento padrão do formulário (recarregar a página)

    // Verifica se tanto o email quanto a senha foram preenchidos antes de tentar o login
    if (email !== "" && password !== "") {
      await signIn(email, password); // Chama a função signIn do contexto
    } else {
      alert("Preencha os campos"); // Exibe um alerta caso algum campo esteja vazio
    }
  }

  return (
    <div className="container-center">
      <div className="login">
        <div className="login-area">
          <img src={logo} alt="Logo do sistema" />{" "}
          {/* Exibe o logo do sistema */}
        </div>

        {/* Formulário para inserir e-mail e senha */}
        <form onSubmit={handleSighIn}>
          <h1>Entrar</h1>
          <input
            type="text"
            placeholder="Seu e-mail"
            value={email} // Vincula o valor do e-mail ao estado
            onChange={(e) => {
              setEmail(e.target.value); // Atualiza o estado do e-mail a cada mudança
            }}
          />
          <input
            type="password"
            placeholder="Sua senha"
            value={password} // Vincula o valor da senha ao estado
            onChange={(e) => {
              setPassword(e.target.value); // Atualiza o estado da senha a cada mudança
            }}
          />
          <button type="submit">{loading ? "Carregando" : "Acessar"}</button>{" "}
          {/* Exibe "Carregando" ou "Acessar" dependendo do estado de loading */}
        </form>

        {/* Link para a página de registro de uma nova conta */}
        <Link to="/register">Criar uma conta</Link>
      </div>
    </div>
  );
}
