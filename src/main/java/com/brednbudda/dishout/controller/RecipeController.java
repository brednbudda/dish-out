package com.brednbudda.dishout.controller;

import com.brednbudda.dishout.model.Recipe;
import com.brednbudda.dishout.repository.RecipeRepository;
import com.brednbudda.dishout.service.RecipeService;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class RecipeController {

    @Autowired
    private RecipeService recipeService;

    @GetMapping("/recipes")
    public ResponseEntity<List<Recipe>> getAllRecipes() {
        return new ResponseEntity<List<Recipe>>(recipeService.findAllRecipes(), HttpStatus.OK);
    }

    @GetMapping("/recipes/{id}")
    public ResponseEntity<Optional<Recipe>> getRecipeById(@PathVariable ObjectId id) {
        return new ResponseEntity<Optional<Recipe>>(recipeService.findById(id), HttpStatus.OK);
    }

    @GetMapping("/recipes/tag/{tag}")
    public ResponseEntity<List<Recipe>> getRecipeByTags(@PathVariable String tag) {
        return new ResponseEntity<List<Recipe>>(recipeService.findByTags(tag), HttpStatus.OK);
    }

    @GetMapping("/recipes/title/{title}")
    public ResponseEntity<List<Recipe>> getRecipeByTitleContaining(@PathVariable String title) {
        return new ResponseEntity<List<Recipe>>(recipeService.findByTitleContaining(title), HttpStatus.OK);
    }

    @PostMapping("/recipes")
    public ResponseEntity<Recipe> createRecipe(@RequestBody Recipe recipe) {
        return new ResponseEntity<>(recipeService.createRecipe(recipe), HttpStatus.CREATED);
    }

    @PutMapping("/recipes/{id}")
    public ResponseEntity<Recipe> updateRecipe(@PathVariable("id") ObjectId id, @RequestBody Recipe recipe) {
        return null;
    }

    @DeleteMapping("/recipes/{id}")
    public ResponseEntity<HttpStatus> deleteRecipe(@PathVariable("id") ObjectId id) {
        recipeService.deleteById(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
