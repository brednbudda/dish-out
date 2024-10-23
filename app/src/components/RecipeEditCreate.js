import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
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
	const newTags = recipe.tags.map((tag, i) => (
	  i === index ? event.target.value : tag
	));
	setRecipe({ ...recipe, tags: newTags });
  };

  const handleAddIngredient = () => {
	const blankIngredient = [{ name: '', quantity: '', unit: ''}];
	setRecipe({ ...recipe, ingredients: [ 
		...recipe.ingredients.concat(blankIngredient)]});
  };

  const handleAddDirection = () => {
	const blankDirection = '';
	setRecipe({ ...recipe, directions: [ 
		...recipe.directions.concat(blankDirection)]});
  };

  const handleAddTag = () => {
	const blankTag = '';
	setRecipe({ ...recipe, tags: [ 
		...recipe.tags.concat(blankTags)]});
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
    <div>
      <h1>{id ? 'Edit Recipe' : 'Create Recipe'}</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={recipe.title}
            onChange={handleInputChange}
            required
          />
        </div>

        <div>
          <label>Ingredients</label>
          {recipe.ingredients.map((ingredient, index) => (
            <div key={index}>
              <input
                type="text"
                name="name"
                value={ingredient.name}
                placeholder="Name"
                onChange={(event) => handleIngredientChange(index, event)}
                required
              />
              <input
                type="number"
                name="quantity"
                value={ingredient.quantity}
                placeholder="Quantity"
                onChange={(event) => handleIngredientChange(index, event)}
                required
              />
              <input
                type="text"
                name="unit"
                value={ingredient.unit}
                placeholder="Unit"
                onChange={(event) => handleIngredientChange(index, event)}
              />
            </div>
          ))}
          <button type="button" onClick={handleAddIngredient}>Add Ingredient</button>
        </div>

        <div>
          <label>Directions</label>
          {recipe.directions.map((direction, index) => (
            <textarea
              key={index}
              value={direction}
              onChange={(event) => handleDirectionChange(index, event)}
              placeholder={`Step ${index + 1}`}
            />
          ))}
          <button type="button" onClick={handleAddDirection}>Add Step</button>
        </div>

        <div>
          <label>Tags</label>
          {recipe.tags.map((tag, index) => (
            <textarea
              key={index}
              value={tag}
              onChange={(event) => handleTagChange(index, event)}
              placeholder={`Tag ${index + 1}`}
            />
          ))} 
          <button type="button" onClick={handleAddTag }>Add Tag</button>
        </div>

        <button type="submit">{id ? 'Update Recipe' : 'Create Recipe'}</button>
      </form>
    </div>
  );
};

export default RecipeEditCreate;

