import React, { useState } from 'react';
// import './Menu.css'; // Archivo de estilos
import '../styles/Menu.css';


const MenuDesplegable = () => {
  const [activeMenu, setActiveMenu] = useState(null);
  const [activeSubmenu, setActiveSubmenu] = useState(null);

  const handleMenuClick = (menuIndex) => {
    setActiveMenu(menuIndex === activeMenu ? null : menuIndex);
    setActiveSubmenu(null); // Resetear submenu cuando cambie el menú principal
  };

  const handleSubmenuClick = (submenuIndex) => {
    setActiveSubmenu(submenuIndex === activeSubmenu ? null : submenuIndex);
  };

  return (
    <div className="menu">
      <ul>
        <li>
          <button onClick={() => handleMenuClick(1)}>Menu 1</button>
          {activeMenu === 1 && (
            <ul className="submenu">
              <li>
                <button onClick={() => handleSubmenuClick(1)}>Submenu 1-1</button>
                {activeSubmenu === 1 && (
                  <ul className="submenu">
                    <li>Sub-submenu 1-1-1</li>
                    <li>Sub-submenu 1-1-2</li>
                  </ul>
                )}
              </li>
              <li>
                <button onClick={() => handleSubmenuClick(2)}>Submenu 1-2</button>
                {activeSubmenu === 2 && (
                  <ul className="submenu">
                    <li>Sub-submenu 1-2-1</li>
                    <li>Sub-submenu 1-2-2</li>
                  </ul>
                )}
              </li>
            </ul>
          )}
        </li>
        <li>
          <button onClick={() => handleMenuClick(2)}>Menu 2</button>
          {activeMenu === 2 && (
            <ul className="submenu">
              <li>Submenu 2-1</li>
              <li>Submenu 2-2</li>
            </ul>
          )}
        </li>
      </ul>
    </div>
  );
};


export default MenuDesplegable;