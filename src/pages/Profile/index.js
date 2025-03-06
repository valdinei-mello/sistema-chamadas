import { FiSettings, FiUpload } from "react-icons/fi";
import { Header } from "../../components/Header";
import { Title } from "../../components/Title";
import avatar from "../../assets/avatar.png";
import { AuthContext } from "../../contexts/auth/auth";
import { useContext, useState } from "react";
import "./profile.css";

export default function Profile() {
  const { user } = useContext(AuthContext);

  const [avatarUrl, setAvatarUrl] = useState(user && user.avatarUrl);
  return (
    <div>
      <Header />
      <div className="content">
        <Title name="Meu perfil">
          <FiSettings size={25} />
        </Title>
        <div className="container">
          <form className="form-profile">
            <label className="label-avatar">
              <span>
                <FiUpload color="#fff" size={25} />
              </span>
              <input type="file" accept="image/*" /> <br />
              {avatarUrl === undefined ? (
                <img
                  src={avatar}
                  width="250"
                  height="250"
                  alt="Foto de perfil"
                />
              ) : (
                <img
                  src={avatarUrl}
                  width="250"
                  height="250"
                  alt="Foto de perfil"
                />
              )}
            </label>
            <label>Nome</label>
            <input type="text" placeholder="Seu nome..." />

            <label>Email</label>
            <input type="text" placeholder="Seu email..." disabled={true} />

            <button type="submit">Salvar</button>
          </form>
        </div>
        <div className="container">
          <button className="logout-btn">Sair</button>
        </div>
      </div>
    </div>
  );
}
