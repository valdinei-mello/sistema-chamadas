import "./signin.css";
import logo from "../../assets/logo.png";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/auth";

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { signUp, loading } = useContext(AuthContext);

  async function handleSubmit(e) {
    e.preventDefault();

    const data = {
      name,
      email,
      password,
    };

    if (data.name !== "" && data.email !== "" && data.password !== "") {
      await signUp(data.email, data.password, data.name);
    }
  }

  return (
    <div className="container-center">
      <div className="login">
        <div className="login-area">
          <img src={logo} alt="Logo do sistema" />
        </div>

        <form onSubmit={handleSubmit}>
          <h1>Cadastrar</h1>
          <input
            type="text"
            placeholder="Seu nome"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <input
            type="text"
            placeholder="Seu e-mail"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <input
            type="password"
            placeholder="Sua senha"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <button type="submit">{loading ? "Carregando" : "Cadastrar"}</button>
        </form>

        <Link to="/">Já possui uma conta? Faça login</Link>
      </div>
    </div>
  );
}
