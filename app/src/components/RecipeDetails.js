import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import '../css/styles.css';
import axios from 'axios';

const RecipeDetails = () => {
  const { id } = useParams(); // get the recipe ID from URL params
  const [recipe, setRecipe] = useState(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
	const fetchRecipe = async () => {
		try {
			const response = await axios.get(`/recipes/${id}`);
			setRecipe(response.data);
			setLoading(false);
		} catch (error) {
			console.error("Error fetching the recipe: ", error);
			setLoading(false);
		}
	};
	
	if (id) {
	  fetchRecipe();
	}
  }, [id]);

  if (loading) {
	return <div>Loading...</div>;
  }

  if (!recipe) {
	return <div>Recipe not found!</div>;
  }

  const handleRecipeEdit = (id) => {
	  navigate(`/edit-recipe/${id}`);
  };

  const handleRecipeDelete = (id) => {
	const confirmDelete = window.confirm("Are you sure you want to delete?")
	
	if (confirmDelete) {
		try {
		  axios.delete(`/recipes/${id}`);
		  navigate('/recipes');
		} catch (error) {
		  console.error(error);
		}
	}
  };
  
  return (
    <div class="recipe-details-card">
	  <Link to={'/recipes'}><button class="button-home">Home Page</button></Link>
      <h1>{recipe.title}</h1>
      <h2>Ingredients</h2>
      <ul>
        {recipe.ingredients.map((ingredient, index) => (
          <li key={index}>
            {ingredient.quantity} {ingredient.unit} of {ingredient.name}
          </li>
        ))}
      </ul>
      <h2>Directions</h2>
      <ol>
        {recipe.directions.map((step, index) => (
          <li key={index}>{step}</li>
        ))}
      </ol>
      <h2>Tags</h2>
      <p>{recipe.tags.join(', ')}</p>
	  <button onClick={() => handleRecipeEdit(recipe.id)}>Edit Recipe</button>
	  <button onClick={() => handleRecipeDelete(recipe.id)}>Delete Recipe</button>
    </div>
  );
};

export default RecipeDetails;

