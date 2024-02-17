package com.brednbudda.dishout.repository;

import com.brednbudda.dishout.model.Recipe;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface RecipeRepository extends MongoRepository<Recipe, ObjectId> {
    Optional<Recipe> findRecipeById(ObjectId id);
    List<Recipe> findByTitleContaining(String title);
    List<Recipe> findByTags(String tag);
}
