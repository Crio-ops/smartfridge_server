const express = require("express");
const router = express.Router();

const sequelize = require ("../../server/config/database/mysql/database_reference.js");
const { Recipes, Ingredients } = require ("../../server/model/sequelize/sequelize_object_model.js");
const jwt = require ("jsonwebtoken");


router.post('/', async (req, res) => {
    try {

      const  recipe = req.body;
      console.log(recipe.data)

      const newRecipe = await Recipes.create({
        title: recipe.data.title,
        description: recipe.data.description,
        instructions: recipe.data.instructions,
        prep_time: recipe.data.prep_time,
        cook_time: recipe.data.cook_time,
        total_time: recipe.data.total_time,
        servings: recipe.data.servings,
      });
  
      if (recipe.data.ingredients && recipe.data.ingredients.length > 0) {

        for (const ingredientData of recipe.data.ingredients) {
   
          const newIngredient = await Ingredients.create({
            name: ingredientData.name,
            category: ingredientData.category,
            quantity: ingredientData.quantity,
            id_recipe: newRecipe.id,  
          });
        }
      }
  

      res.status(201).json(newRecipe);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erreur lors de la création de la recette' });
    }
  });

  module.exports = router;