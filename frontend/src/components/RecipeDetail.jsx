import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import api from "../utils/api"; // Axios instance for API calls
import { AuthContext } from "../contexts/AuthContext";
import styles from "./RecipeDetail.module.css";

function RecipeDetail() {
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { id } = useParams();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    fetchRecipe();
  }, [id]);

  const fetchRecipe = async () => {
    try {
      const response = await fetch(
        `https://api.spoonacular.com/recipes/${id}/information?apiKey=2d7e059b576944d886cc59bd7f395f14`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch recipe details");
      }

      const data = await response.json();
      setRecipe(data);
      setLoading(false);
    } catch (error) {
      setError("Error fetching recipe");
      setLoading(false);
    }
  };

  const handleSaveRecipe = async () => {
    try {
      await api.post("/users/save-recipe", {
        recipeId: id,
        title: recipe.title,
        ingredients: recipe.extendedIngredients.map((ing) => ing.original),
        instructions: recipe.instructions,
        image: recipe.image,
      });
      alert("Recipe saved successfully!");
    } catch (error) {
      alert("Error saving recipe");
    }
  };

  if (loading) return <div className={styles.loading}>Loading...</div>;
  if (error) return <div className={styles.error}>{error}</div>;
  if (!recipe) return <div className={styles.error}>Recipe not found</div>;

  return (
    <div className={styles.recipeDetail}>
      <h2>{recipe.title}</h2>
      <img
        src={recipe.image || "/placeholder.jpg"}
        alt={recipe.title}
        className={styles.recipeImage}
      />
      <p className={styles.author}>By {recipe.sourceName}</p>
      <div className={styles.recipeInfo}>
        <div className={styles.infoItem}>
          <span className={styles.label}>Prep Time:</span>{" "}
          {recipe.readyInMinutes} minutes
        </div>
        <div className={styles.infoItem}>
          <span className={styles.label}>Servings:</span> {recipe.servings}
        </div>
      </div>
      <h3>Ingredients</h3>
      <ul className={styles.ingredients}>
        {recipe.extendedIngredients.map((ingredient, index) => (
          <li key={index}>{ingredient.original}</li>
        ))}
      </ul>
      <h3>Instructions</h3>
      <p className={styles.instructions}>{recipe.instructions}</p>
      {user && (
        <button onClick={handleSaveRecipe} className={styles.saveButton}>
          Save Recipe
        </button>
      )}
    </div>
  );
}

export default RecipeDetail;
