import { FiSettings, FiUpload } from "react-icons/fi";
import { Header } from "../../components/Header";
import { Title } from "../../components/Title";
import avatar from "../../assets/avatar.png";
import { AuthContext } from "../../contexts/auth/auth";
import { useContext, useState } from "react";
import "./profile.css";

export default function Profile() {
  const { user, storegeUser, setUser, logout } = useContext(AuthContext);

  const [avatarUrl, setAvatarUrl] = useState(user && user.avatarUrl);
  const [imageAvatar, setImageAvatar] = useState(null);

  const [nome, setNome] = useState(user && user.nome);
  const [email, setEmail] = useState(user && user.email);
  console.log(user);

  function handleFile(e) {
    const image = e.target.files[0];

    if (!image) return;

    const isValidImage =
      image.type === "image/jpeg" || image.type === "image/png";

    if (isValidImage) {
      setImageAvatar(image);
      setAvatarUrl(URL.createObjectURL(image));
    } else {
      alert("Envie uma imagem do tipo PNG ou JPEG");
      setImageAvatar(null);
    }
  }

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
              <input type="file" accept="image/*" onChange={handleFile} />
              <br />
              {(avatarUrl === undefined) | null ? (
                <img
                  src={avatar}
                  alt="Foto de perfil"
                  className="profile-image"
                />
              ) : (
                <img
                  src={avatarUrl}
                  alt="Foto de perfil"
                  className="profile-image"
                />
              )}
            </label>
            <label>Nome</label>
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />

            <label>Email</label>
            <input type="text" value={email} disabled={true} />

            <button type="submit">Salvar</button>
          </form>
        </div>
        <div className="container">
          <button
            className="logout-btn"
            onClick={() => {
              logout();
            }}
          >
            Sair
          </button>
        </div>
      </div>
    </div>
  );
}
