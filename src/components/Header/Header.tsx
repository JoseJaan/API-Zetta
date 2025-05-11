import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';
import { MenuItem, PageType } from '../../types';
import './Header.scss';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const menuItems: MenuItem[] = [
    { id: 'home', label: 'Best Sellers', pageType: PageType.HOME, route: '/' },
    { id: 'overview', label: 'Lista de Overview', pageType: PageType.OVERVIEW, route: '/overview' },
    { id: 'reviews', label: 'Lista de Reviews', pageType: PageType.REVIEWS, route: '/reviews' }
  ];

  const getCurrentPage = (): MenuItem => {
    const currentRoute = location.pathname;
    return menuItems.find(item => item.route === currentRoute) || menuItems[0];
  };

  const [currentPage, setCurrentPage] = useState<MenuItem>(getCurrentPage());

  const handlePageChange = (pageItem: MenuItem) => {
    setCurrentPage(pageItem);
    navigate(pageItem.route);
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <h1 className="header-title">Zetta Lab - Books API</h1>
          <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              {currentPage.label}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              {menuItems.map((item) => (
                <Dropdown.Item 
                  key={item.id} 
                  onClick={() => handlePageChange(item)}
                  active={currentPage.id === item.id}
                >
                  {item.label}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
    </header>
  );
};

export default Header;