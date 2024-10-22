import axios from 'axios';

const RECIPE_API_BASE_URL = "http://localhost:8080/dishout/recipes";

class RecipeService {

	getRecipes() {
		return axios.get(RECIPE_API_BASE_URL);
	}

	createRecipe(recipe) {
		return axios.post(RECIPE_API_BASE_URL, recipe);
	}

	getRecipeByID(recipeId) {
		return axios.get(RECIPE_API_BASE_URL + '/' + recipeId);
	}

	updateRecipe(employee, employeeId) {
		return axios.put(RECIPE_API_BASE_URL + '/' + recipeId, recipe);
	}

	deleteRecipe(recipeId) {
		return axios.delete(RECIPE_API_BASE_URL + '/' + recipeId);
	}
}	

export default new RecipeService()
