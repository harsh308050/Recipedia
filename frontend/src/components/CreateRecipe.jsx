import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import api from "../utils/api";
import styles from "./CreateRecipe.module.css";

function CreateRecipe() {
  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");
  const [prepTime, setPrepTime] = useState("");
  const [cookTime, setCookTime] = useState("");
  const [servings, setServings] = useState("");
  const [image, setImage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("http://localhost:5000/api/recipes", {
        title,
        ingredients: ingredients.split(",").map((item) => item.trim()),
        instructions,
        prepTime: parseInt(prepTime),
        cookTime: parseInt(cookTime),
        servings: parseInt(servings),
        image,
      });
      console.log("Recipe Created:", response.data);
      setTitle("");
      setIngredients("");
      setInstructions("");
      setPrepTime("");
      setCookTime("");
      setServings("");
      setImage("");
      navigate("/");
    } catch (error) {
      setError("Error creating recipe");
      console.error("Error:", error);
    }
  };

  return (
    <div className={styles.createRecipe}>
      <h2>Create Your Recipe</h2>
      {error && <p className={styles.error}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Recipe Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className={styles.inputField}
        />
        <textarea
          placeholder="Ingredients (comma-separated)"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          required
          className={styles.inputField}
        />
        <textarea
          placeholder="Instructions"
          value={instructions}
          onChange={(e) => setInstructions(e.target.value)}
          required
          className={styles.inputField}
        />
        <div className={styles.timeInputs}>
          <input
            type="number"
            placeholder="Prep Time (mins)"
            value={prepTime}
            onChange={(e) => setPrepTime(e.target.value)}
            required
            className={styles.inputField}
          />
          <input
            type="number"
            placeholder="Cook Time (mins)"
            value={cookTime}
            onChange={(e) => setCookTime(e.target.value)}
            required
            className={styles.inputField}
          />
          <input
            type="number"
            placeholder="Number of Servings"
            value={servings}
            onChange={(e) => setServings(e.target.value)}
            required
            className={styles.inputField}
          />
        </div>
        <div className={styles.imageContainer}>
          <input
            type="text"
            placeholder="Recipe Image URL"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className={styles.inputField}
          />
          <div className={styles.imagePreview}>
            {image ? (
              <img src={image} alt="Recipe" className={styles.previewImg} />
            ) : (
              <img
                src="https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM="
                alt="Recipe Placeholder"
                className={styles.previewImg}
              />
            )}
          </div>
        </div>
        <button type="submit" className={styles.inputField}>
          Create Recipe
        </button>
      </form>
    </div>
  );
}

export default CreateRecipe;
