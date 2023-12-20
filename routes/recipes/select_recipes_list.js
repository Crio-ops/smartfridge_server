const express = require('express');
const router = express.Router();

const sequelize = require ("../../server/config/database/mysql/database_reference.js");
const { Recipes, Ingredients } = require ("../../server/model/sequelize/sequelize_object_model.js");
const jwt = require ("jsonwebtoken");

router.get('/', async (req, res) => {
  try {
    // Fetch toutes les recettes avec leurs ingrédients
    const recipesWithIngredients = await Recipes.findAll({
      include: [{ model: Ingredients, where: { id_recipe: sequelize.col('recipes.id') } }],
    });

    res.json(recipesWithIngredients);
  } catch (error) {
    console.error('Error fetching recipes with ingredients:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports= router;