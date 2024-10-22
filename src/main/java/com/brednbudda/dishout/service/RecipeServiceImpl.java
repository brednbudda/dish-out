package com.brednbudda.dishout.service;

import com.brednbudda.dishout.model.Recipe;
import com.brednbudda.dishout.repository.RecipeRepository;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RecipeServiceImpl implements RecipeService {

    private RecipeRepository recipeRepository;

    @Autowired
    public RecipeServiceImpl(RecipeRepository recipeRepository) {
        this.recipeRepository = recipeRepository;
    }

    public List<Recipe> findAllRecipes() {
        return recipeRepository.findAll();
    }

    public Optional<Recipe> findById(ObjectId id) {
        return recipeRepository.findById(id);
    }

    public Recipe createRecipe(Recipe recipeBody) {
        return recipeRepository.save(new Recipe(recipeBody));
    }

    public void deleteById(ObjectId id) {
        recipeRepository.deleteById(id);
    }

    public Recipe save(Recipe recipe) {
        return recipeRepository.save(recipe);
    }

    /*
    public List<Recipe> findByTags(String tag) {
        return recipeRepository.findByTags(tag);
    }

    public List<Recipe> findByTitleContaining(String title) {
        return recipeRepository.findByTitleContaining(title);
    }
    */
}