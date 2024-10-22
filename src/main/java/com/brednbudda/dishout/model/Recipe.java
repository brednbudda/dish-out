package com.brednbudda.dishout.model;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DocumentReference;

import java.util.List;

@Document(collection = "recipes")
public class Recipe {

    @Id
    private String id;
    private String title;
    private List<Ingredient> ingredients;
    private List<String> directions;
    private List<String> tags;

    public Recipe() {}

    public Recipe(String title, List<Ingredient> ingredients, List<String> directions, List<String> tags) {
        this.title = title;
        this.ingredients = ingredients;
        this.directions = directions;
        this.tags = tags;
    }

    public Recipe(Recipe recipeObj) {
        this.title = recipeObj.getTitle();
        this.ingredients = recipeObj.getIngredients();
        this.directions = recipeObj.getDirections();
        this.tags = recipeObj.getTags();
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public List<Ingredient> getIngredients() {
        return ingredients;
    }

    public void setIngredients(List<Ingredient> ingredients) {
        this.ingredients = ingredients;
    }

    public List<String> getDirections() {
        return directions;
    }

    public void setDirections(List<String> directions) {
        this.directions = directions;
    }

    public List<String> getTags() {
        return tags;
    }

    public void setTags(List<String> tags) {
        this.tags = tags;
    }

    @Override
    public String toString() {
        return "Recipe{" +
                "id='" + id + '\'' +
                ", title='" + title + '\'' +
                ", ingredients=" + ingredients +
                ", directions=" + directions +
                ", tags=" + tags +
                '}';
    }
}
