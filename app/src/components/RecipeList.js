import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import '../css/styles.css';

const RecipeList = () => {
  const [recipes, setRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
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

  const filteredRecipes = recipes.filter(recipe =>
	recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
	recipe.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="recipe-list-main">
      <h1>Recipes</h1>
	    <div className="search-and-add">
	  	  <input
	  		type="text"
	  		placeholder="Search recipes..."
	  		value={searchTerm}
	  		onChange={(e) => setSearchTerm(e.target.value)}
	  		className="search-input"
	      />
		  <Link to={'/create-recipe'}>
	  		<button className="button-add-new">Add New Recipe</button>
	  	  </Link>
	  </div>
      <ul>
        {filteredRecipes.map((recipe) => (
          <li key={recipe.id.toString()}>
            <h2>{recipe.title}</h2>
            <p>Tags: {recipe.tags.join(', ')}</p>
			<button className="button-add" onClick={() => handleViewDetails(recipe.id)}>View Details</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecipeList;

