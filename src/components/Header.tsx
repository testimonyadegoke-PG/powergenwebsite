import React, { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useCms } from '../cms/useCms';
import { designModes, type DesignModeId } from '../design/designModes';
import { useDesignMode } from '../design/useDesignMode';

export const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuActive, setMenuActive] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { content } = useCms();
  const { mode, setMode, activeMode } = useDesignMode();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMenu = () => { setMenuActive(false); setDropdownOpen(false); };

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">
        <Link to="/" className="logo" onClick={closeMenu}>
          {content.settings.brandName}
          <span className="logo-dot"></span>
        </Link>

        <ul className={`nav-links ${menuActive ? 'active' : ''}`} id="nav-links">
          {content.navigation
            .filter((item) => item.visible)
            .map((item) => {
              if (item.children && item.children.filter((c) => c.visible).length > 0) {
                return (
                  <li
                    className="dropdown-li"
                    key={item.id}
                    onMouseEnter={() => setDropdownOpen(true)}
                    onMouseLeave={() => setDropdownOpen(false)}
                  >
                    <NavLink
                      to={item.path}
                      className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                      onClick={(e) => {
                        if (window.innerWidth <= 768) {
                          e.preventDefault();
                          setDropdownOpen(!dropdownOpen);
                        } else {
                          closeMenu();
                        }
                      }}
                    >
                      {item.label} <span className="dropdown-arrow">▼</span>
                    </NavLink>
                    <ul className={`dropdown-menu ${dropdownOpen ? 'show' : ''}`}>
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

              if (item.id === 'contact') {
                return (
                  <li key={item.id}>
                    <Link to={item.path} className="btn btn-primary nav-btn" onClick={closeMenu}>
                      {item.label}
                    </Link>
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
        </ul>

        <div className="design-switcher" title={activeMode.perspective}>
          <span>Design</span>
          <select
            value={mode}
            onChange={(event) => setMode(event.target.value as DesignModeId)}
            aria-label="Choose website design direction"
          >
            {designModes.map((item) => (
              <option value={item.id} key={item.id}>{item.shortName}</option>
            ))}
          </select>
        </div>

        <div className="menu-toggle" id="menu-toggle" onClick={() => setMenuActive(!menuActive)} aria-label="Toggle navigation menu">
          <span style={{ transform: menuActive ? 'rotate(45deg) translate(6px, 6px)' : 'none' }}></span>
          <span style={{ opacity: menuActive ? '0' : '1' }}></span>
          <span style={{ transform: menuActive ? 'rotate(-45deg) translate(6px, -6px)' : 'none' }}></span>
        </div>
      </div>
    </header>
  );
};
