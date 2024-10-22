import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom';

const RecipeList = () => {
  const [recipes, setRecipes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('/recipes')
      .then(response => {
        setRecipes(response.data);
		  console.log(response);
      })
      .catch(error => {
        console.error("There was an error fetching the recipes!", error);
      });
  }, []);

  const handleViewDetails = (id) => {
	  navigate(`/recipes/${id}`);
  };

  return (
    <div>
      <h1>Recipes</h1>
	  	<Button color="success" tag={Link} to="/create-recipe">Add New Recipe</Button>
      <ul>
        {recipes.map((recipe) => (
          <li key={recipe.id.toString()}>
            <h2>{recipe.title}</h2>
            <p>Tags: {recipe.tags.join(', ')}</p>
			<button onClick={() => handleViewDetails(recipe.id)}>View Details</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecipeList;

