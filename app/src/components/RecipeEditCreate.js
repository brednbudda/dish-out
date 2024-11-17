import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import '../css/styles.css';
import axios from 'axios';

const RecipeEditCreate = () => {
  const { id } = useParams(); 
  const [recipe, setRecipe] = useState({
    title: '',
    ingredients: [{ name: '', quantity: '', unit: '' }],
    directions: [''],
    tags: ['']
  });
  const navigate = useNavigate();
  
  useEffect(() => {
    if (id) {
      axios.get(`/recipes/${id}`)
        .then(response => {
          setRecipe(response.data);
        })
        .catch(error => {
          console.error("There was an error fetching the recipe!", error);
        });
    }
  }, [id]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setRecipe({
      ...recipe,
      [name]: value,
    });
  };

  const handleIngredientChange = (index, event) => {
    const { name, value } = event.target;
    const newIngredients = recipe.ingredients.map((ingredient, i) => (
      i === index ? { ...ingredient, [name]: value } : ingredient
    ));
    setRecipe({ ...recipe, ingredients: newIngredients });
  };

  const handleDirectionChange = (index, event) => {
    const newDirections = recipe.directions.map((direction, i) => (
      i === index ? event.target.value : direction
    ));
    setRecipe({ ...recipe, directions: newDirections });
  };
  
  const handleTagChange = (index, event) => {
	const newTag = recipe.tags.map((tag, i) => (
	  i === index ? event.target.value : tag
	));
	setRecipe({ ...recipe, tags: newTag });
  };

  const handleAddIngredient = () => {
	const blankIngredient = [{ name: '', quantity: '', unit: ''}];
	setRecipe({ ...recipe, ingredients: [ 
		...recipe.ingredients.concat(blankIngredient)]});
  };
  const handleDeleteIngredient = (index) => {
	setRecipe(prevRecipe => ({
		...prevRecipe,
		ingredients: prevRecipe.ingredients.filter((_, i) => i !== index)
	}));
  };

  const handleAddDirection = () => {
	setRecipe({ ...recipe, directions: [ 
		...recipe.directions, '']});
  };

  const handleDeleteDirection = (index) => {
	setRecipe(prevRecipe => ({
		...prevRecipe,
		directions: prevRecipe.directions.filter((_, i) => i !== index)
	}));
  };

  const handleAddTag = () => {
	setRecipe({ ...recipe, tags: [ 
		...recipe.tags, '']});
  };
	
  const handleDeleteTag = (index) => {
	setRecipe(prevRecipe => ({
		...prevRecipe,
		tags: prevRecipe.tags.filter((_, i) => i !== index)
	}));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (id) {
      axios.put('/recipes', recipe)
        .then(() => {
          navigate(`/recipes/${id}`);
        })
        .catch(error => {
          console.error("There was an error updating the recipe!", error);
        });
    } else {
      axios.post('/recipes', recipe)
        .then(() => {
          navigate('/recipes');
        })
        .catch(error => {
          console.error("There was an error creating the recipe!", error);
        });
    }
  };

  return (
    <div className="recipe-edit-create-main">
	  <Link to={'/recipes'}><button className="button-home">Home Page</button></Link>
      <h1>{id ? 'Edit Recipe' : 'Create Recipe'}</h1>
      <form onSubmit={handleSubmit}>
        <div id="recipe-edit-create-title">
          <label className="label">Title</label>
          <input
            type="text"
            name="title"
            value={recipe.title}
            onChange={handleInputChange}
            required
          />
        </div>

        <div id="recipe-edit-create-ingredients">
          <label className="label">Ingredients</label>
          {recipe.ingredients.map((ingredient, index) => (
            <div key={index}>
			  <div id="ingredient-name">
              <input
                type="text"
                name="name"
                value={ingredient.name}
                placeholder="Name"
                onChange={(event) => handleIngredientChange(index, event)}
                required
              />
			  </div>
			  <div id="ingredient-quantity">
              <input
                type="number"
                name="quantity"
                value={ingredient.quantity}
                placeholder="Quantity"
                onChange={(event) => handleIngredientChange(index, event)}
                required
              />
			  </div>
			  <div id="ingredient-unit">
              <input
                type="text"
                name="unit"
                value={ingredient.unit}
                placeholder="Unit"
                onChange={(event) => handleIngredientChange(index, event)}
              />
			  </div>
			  <button
			    type="button"
			  	className="button-delete"
			    onClick={() => handleDeleteIngredient(index)}>Delete</button>
            </div>
          ))}
          <button type="button" className="button-add" onClick={handleAddIngredient}>Add Ingredient</button>
        </div>

        <div className="recipe-create-delete-directions">
          <label className="label">Directions</label>
          {recipe.directions.map((direction, index) => (
			  <div key={index}>
				<textarea
				  value={direction}
				  onChange={(event) => handleDirectionChange(index, event)}
				  placeholder={`Step ${index + 1}`}
				/>
			  	<button
			  	  type="button"
			  	  className="button-delete"
			  	  onClick={() => handleDeleteDirection(index)}>Delete</button>
			  </div>
          ))}
          <button type="button" className="button-add" onClick={handleAddDirection}>Add Step</button>
        </div>

        <div className="recipe-create-delete-tags">
          <label className="label">Tags</label>
          {recipe.tags.map((tag, index) => (
			  <div key={index}>
				<input 
				  type="text"
				  name="tag"
				  value={tag}
				  onChange={(event) => handleTagChange(index, event)}
				  placeholder={`Tag ${index + 1}`}
				/>
          	  <button 
			    type="button" 
			    className="button-delete"
			    onClick={() => handleDeleteTag(index)}>Delete</button>
			  </div>
          ))} 
          <button type="button" className="button-add" onClick={handleAddTag}>Add Tag</button>
        </div>

        <button type="submit">{id ? 'Update Recipe' : 'Create Recipe'}</button>
      </form>
    </div>
  );
};

export default RecipeEditCreate;

