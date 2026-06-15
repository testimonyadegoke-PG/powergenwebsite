import React, { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useCms } from '../cms/useCms';

export const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuActive, setMenuActive] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const { content } = useCms();

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      setScrolled((prev) => (prev !== isScrolled ? isScrolled : prev));
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMenu = () => { setMenuActive(false); setActiveDropdown(null); };

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`}>
      <div className="header-status-bar" aria-hidden="true" />
      <div className="nav-container">
        <Link to="/" className="logo" onClick={closeMenu} style={{ display: 'flex', alignItems: 'center' }}>
          {content.settings.logoUrl ? (
            <img src={content.settings.logoUrl} alt={content.settings.brandName} className="logo-img" style={{ maxHeight: '35px' }} />
          ) : (
            <>
              {content.settings.brandName}
              <span className="logo-dot"></span>
            </>
          )}
        </Link>

        <ul className={`nav-links ${menuActive ? 'active' : ''}`} id="nav-links">
          {content.navigation
            .filter((item) => item.visible && item.id !== 'contact')
            .map((item) => {
              if (item.children && item.children.filter((c) => c.visible).length > 0) {
                return (
                  <li
                    className="dropdown-li"
                    key={item.id}
                    onMouseEnter={() => setActiveDropdown(item.id)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <NavLink
                      to={item.path}
                      className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                      onClick={(e) => {
                        if (window.innerWidth <= 768) {
                          e.preventDefault();
                          setActiveDropdown(activeDropdown === item.id ? null : item.id);
                        } else {
                          closeMenu();
                        }
                      }}
                    >
                      {item.label} <span className="dropdown-arrow">▼</span>
                    </NavLink>
                    <ul className={`dropdown-menu ${activeDropdown === item.id ? 'show' : ''}`}>
                      {item.children
                        .filter((child) => child.visible)
                        .map((child) => (
                          <li key={child.id}>
                            <NavLink to={child.path} onClick={closeMenu}>
                              {child.label}
                            </NavLink>
                          </li>
                        ))}
                    </ul>
                  </li>
                );
              }

              return (
                <li key={item.id}>
                  <NavLink
                    to={item.path}
                    className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                    onClick={closeMenu}
                    end={item.path === '/'}
                  >
                    {item.label}
                  </NavLink>
                </li>
              );
            })}

          {content.navigation
            .filter((item) => item.visible && item.id === 'contact')
            .map((item) => (
              <li key={item.id}>
                <Link to={item.path} className="btn btn-primary nav-btn" onClick={closeMenu}>
                  {item.label}
                </Link>
              </li>
            ))}
        </ul>

        <div className="menu-toggle" id="menu-toggle" onClick={() => setMenuActive(!menuActive)} aria-label="Toggle navigation menu">
          <span style={{ transform: menuActive ? 'rotate(45deg) translate(6px, 6px)' : 'none' }}></span>
          <span style={{ opacity: menuActive ? '0' : '1' }}></span>
          <span style={{ transform: menuActive ? 'rotate(-45deg) translate(6px, -6px)' : 'none' }}></span>
        </div>
      </div>
    </header>
  );
};
