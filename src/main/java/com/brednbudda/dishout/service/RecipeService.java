package com.brednbudda.dishout.service;

import com.brednbudda.dishout.model.Recipe;
import com.brednbudda.dishout.repository.RecipeRepository;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

public interface RecipeService {

    List<Recipe> findAllRecipes();

    Optional<Recipe> findById(ObjectId id);

    Recipe createRecipe(Recipe recipeBody);

    void deleteById(ObjectId id);

    Recipe save(Recipe recipe);

    //List<Recipe> findByTags(String tag);

    //List<Recipe> findByTitleContaining(String title);

}
