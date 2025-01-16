import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import styles from "./Navbar.module.css";

function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <Link to="/" className={styles.logo}>
          <img src="/logo.png" alt="" />
        </Link>
        <div className={styles.menuToggle} onClick={toggleMenu}>
          {menuOpen ? "x" : "☰"}
        </div>

        <div
          className={`${styles.navContainer} ${menuOpen ? styles.open : ""}`}
        >
          <ul className={styles.centerLinks}>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/#about">About</a>
            </li>
            <li>
              <Link to="/recipes">Recipes</Link>
            </li>
          </ul>

          <ul className={styles.rightLinks}>
            {user ? (
              <>
                <li>
                  <Link to="/create-recipe">Create Recipe</Link>
                </li>
                <li>
                  <Link to="/saved-recipes">Saved Recipes</Link>
                </li>
                <li>
                  <Link to="/profile">Profile</Link>
                </li>
                <li>
                  <a onClick={logout} className={styles.logoutBtn}>
                    Logout
                  </a>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/login">Login</Link>
                </li>
                <li>
                  <Link to="/register">Register</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
