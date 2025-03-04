import "./signin.css";
import logo from "../../assets/logo.png";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/auth/auth";

export default function SignUp() {
  // Estados para armazenar o nome, email e senha digitados pelo usuário
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Extraindo a função signUp e o estado de loading do AuthContext
  const { signUp, loadingAuth } = useContext(AuthContext);

  // Função que lida com o envio do formulário
  async function handleSubmit(e) {
    e.preventDefault(); // Impede o comportamento padrão do formulário (recarregar a página)

    // Objeto contendo os dados do usuário a serem enviados para o signUp
    const data = {
      name,
      email,
      password,
    };

    // Verifica se todos os campos foram preenchidos antes de tentar o cadastro
    if (data.name !== "" && data.email !== "" && data.password !== "") {
      await signUp(data.email, data.password, data.name); // Chama a função signUp do contexto
    }
  }

  return (
    <div className="container-center">
      <div className="login">
        <div className="login-area">
          <img src={logo} alt="Logo do sistema" />{" "}
          {/* Exibe o logo do sistema */}
        </div>

        {/* Formulário para inserir nome, e-mail e senha */}
        <form onSubmit={handleSubmit}>
          <h1>Cadastrar</h1>
          <input
            type="text"
            placeholder="Seu nome"
            value={name} // Vincula o valor do nome ao estado
            onChange={(e) => {
              setName(e.target.value); // Atualiza o estado do nome a cada mudança
            }}
          />
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
          <button type="submit">
            {loadingAuth ? "Carregando" : "Cadastrar"}
          </button>
          {/* Exibe "Carregando" ou "Cadastrar" dependendo do estado de loading */}
        </form>

        {/* Link para a página de login caso o usuário já tenha uma conta */}
        <Link to="/">Já possui uma conta? Faça login</Link>
      </div>
    </div>
  );
}
