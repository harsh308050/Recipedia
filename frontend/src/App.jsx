import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Updated import
import { AuthProvider } from "./contexts/AuthContext";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Register from "./components/Register";
import Login from "./components/Login";
import RecipeList from "./components/RecipeList";
import RecipeDetail from "./components/RecipeDetail";
import CreateRecipe from "./components/CreateRecipe";
import SavedRecipes from "./components/SavedRecipes";
import Profile from "./components/Profile";
import PrivateRoute from "./components/PrivateRoute"; // Updated import
import "./App.css";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app">
          <Navbar />
          <main className="main">
            <Routes>
              {" "}
              {/* Use Routes instead of Switch */}
              <Route path="/" element={<Home />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/recipes" element={<RecipeList />} />
              <Route path="/recipes/:id" element={<RecipeDetail />} />
              {/* Protected Routes */}
              <Route element={<PrivateRoute />}>
                <Route path="/create-recipe" element={<CreateRecipe />} />
                <Route path="/saved-recipes" element={<SavedRecipes />} />
                <Route path="/profile" element={<Profile />} />
              </Route>
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
