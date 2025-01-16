import React from "react";
import { Link } from "react-router-dom";
import styles from "./Home.module.css";

function Home() {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.HeroContainer}>
          <div className={styles.rightSide}>
            <img src="/heroimg.png" alt="hero image" />
          </div>
          <div className={styles.leftSide}>
            <div className={styles.leftContent}>
              <h1>Cooking Made Fun and Easy: Unleash Your Inner Chef</h1>
              <p>
                Discover more than 10,000 recipes in your hand with the best
                recipe. Help you to find the easiest way to cook!
              </p>
              <div className={styles.cta}>
                <Link to="/recipes" className={styles.ctaButton}>
                  Browse Recipes
                </Link>
                <Link to="/create-recipe" className={styles.ctaButton}>
                  Create Recipe
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.about} id="about">
          <div className={styles.aboutCard}>
            <h2>
              <u>About Us</u>
            </h2>
            <p>
              Recipedia is a platform that allows users to share and explore
              recipes. We aim to make cooking fun and easy by providing a
              platform where users can find recipes, create their own recipes,
              and share them with the world. Whether you are a seasoned chef or
              a beginner in the kitchen, Recipedia has something for everyone.
            </p>
          </div>
        </div>
      </div>
      <footer className={styles.footer}>
        <div className={styles["footer-content"]}>
          <div className={styles["footer-section"]}>
            <h3>About Us</h3>
            <p>
              We are committed to providing the best services to our customers
              and ensuring their satisfaction.
            </p>
          </div>

          <div className={styles["footer-section"]}>
            <h3>Quick Links</h3>
            <ul>
              <li>
                <a href="/">Home</a>
              </li>
              <li>
                <a href="#about">About</a>
              </li>
              <li>
                <a href="#">Contact</a>
              </li>
            </ul>
          </div>

          <div className={styles["footer-section"]}>
            <h3>Contact Info</h3>
            <ul>
              <li>Email: harsh@gmail.com</li>
              <li>Phone: +91 9898236835</li>
              <li>Address: Surat, Gujarat</li>
            </ul>
          </div>

          <div className={styles["footer-section"]}>
            <h3>Follow Us</h3>
            <div className={styles["social-links"]}>
              <a href="#">Facebook</a>
              <a href="#">Twitter</a>
              <a href="#">Instagram</a>
              <a href="#">LinkedIn</a>
            </div>
          </div>
        </div>

        <div className={styles["footer-bottom"]}>
          <p>&copy; 2025 Harsh. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}

export default Home;
