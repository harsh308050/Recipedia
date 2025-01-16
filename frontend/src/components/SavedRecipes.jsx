import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../utils/api";
import styles from "./SavedRecipes.module.css";

function SavedRecipes() {
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchSavedRecipes();
  }, []);

  const fetchSavedRecipes = async () => {
    try {
      const response = await api.get("/users/saved-recipes");

      // Set the data directly, as it is already an array
      if (Array.isArray(response.data)) {
        setSavedRecipes(response.data);
      } else {
        setError("Saved recipes data is malformed");
      }

      setLoading(false);
    } catch (error) {
      setError("Error fetching saved recipes");
      setLoading(false);
    }
  };

  if (loading) return <div className={styles.loading}>Loading...</div>;
  if (error) return <div className={styles.error}>{error}</div>;

  return (
    <div className={styles.savedRecipes}>
      <h2>Saved Recipes</h2>
      {savedRecipes.length === 0 ? (
        <p className={styles.noRecipes}>You haven't saved any recipes yet.</p>
      ) : (
        <div className={styles.recipeGrid}>
          {savedRecipes.map((recipe) => (
            <div key={recipe._id} className={styles.recipeCard}>
              <img
                src={recipe.image || "/placeholder.jpg"}
                alt={recipe.title}
              />
              <div className={styles.recipeInfo}>
                <h3>{recipe.title}</h3>
                {/* <Link
                  to={`/recipe/${recipe._id}`}
                  className={styles.viewButton}
                >
                  View Recipe
                </Link> */}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SavedRecipes;
