import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/noticias">Noticias</Link></li>
        <li><Link to="/colaboradores">Colaboradores</Link></li>
        <li><Link to="/tramites">Trámites y Formularios</Link></li>
        <li><Link to="/gestor">Gestor de contenidos</Link></li>
        <li><Link to="/indicador">Indicadores</Link></li>
        <li><Link to="/calendario">Calendario</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;