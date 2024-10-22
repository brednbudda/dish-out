package com.brednbudda.dishout.controller;

import com.brednbudda.dishout.model.Recipe;
import com.brednbudda.dishout.service.RecipeService;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/")
public class RecipeController {

    private RecipeService recipeService;

    @Autowired
    public RecipeController(RecipeService recipeService) {
        this.recipeService = recipeService;
    }

    @GetMapping("/recipes")
    public ResponseEntity<List<Recipe>> getAllRecipes() {
        return new ResponseEntity<List<Recipe>>(recipeService.findAllRecipes(), HttpStatus.OK);
    }

    @GetMapping("/recipes/{id}")
    public ResponseEntity<Optional<Recipe>> getRecipeById(@PathVariable("id") ObjectId id) {
        return new ResponseEntity<Optional<Recipe>>(recipeService.findById(id), HttpStatus.OK);
    }

    @PostMapping("/recipes")
    public ResponseEntity<Recipe> createRecipe(@RequestBody Recipe recipe) {
        return new ResponseEntity<>(recipeService.createRecipe(recipe), HttpStatus.CREATED);
    }

    @PutMapping("/recipes")
    public Recipe updateRecipe(@RequestBody Recipe recipe) {
        return recipeService.save(recipe);
    }

    @DeleteMapping("/recipes/{id}")
    public ResponseEntity<HttpStatus> deleteRecipe(@PathVariable("id") ObjectId id) {
        recipeService.deleteById(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    /*
    @GetMapping("/recipes/tag/{tag}")
    public ResponseEntity<List<Recipe>> getRecipeByTags(@PathVariable String tag) {
        return new ResponseEntity<List<Recipe>>(recipeService.findByTags(tag), HttpStatus.OK);
    }
    */
}
