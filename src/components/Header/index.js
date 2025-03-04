import avatarImg from "../../assets/avatar.png";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../contexts/auth/auth";
import { FiHome, FiSettings, FiUser } from "react-icons/fi";
import "./header.css";

export function Header() {
  const { user } = useContext(AuthContext);

  const NavLink = ({ to, icon: Icon, label }) => (
    <Link to={to} className="nav-link">
      <Icon color="#fff" size={24} />
      <span>{label}</span>
    </Link>
  );

  return (
    <div className="sidebar">
      <div>
        <img
          src={user.avatarUrl === undefined ? avatarImg : user.avatarUrl}
          alt="Foto usuário"
        />
      </div>
      <NavLink to="/dashboard" icon={FiHome} label="Chamados" />
      <NavLink to="/customers" icon={FiUser} label="Clientes" />
      <NavLink to="/profile" icon={FiSettings} label="Perfil" />
    </div>
  );
}
