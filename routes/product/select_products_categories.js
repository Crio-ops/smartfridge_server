const express = require('express');
const router = express.Router();

const sequelize = require('../../server/config/database/mysql/database_reference.js')
const {
    Milk_Products_Categories,
    Meat_Fish_Eggs_Categories,
    Fruits_Vegetables_Categories,
    Spices_Herbs_Categories,
    Straches_Categories,
    Sweets_Categories,
    Drinks_Categories,
    Oils_Vinegars_Categories,
  } = require("../../server/model/sequelize/sequelize_object_model.js");
  


router.get('/', async (req, res) => {

    try {
        const Fruits_Vegetables = await Fruits_Vegetables_Categories.findAll();
        const Meat_Fish_Eggs = await Meat_Fish_Eggs_Categories.findAll();
        const Oils_Vinegars = await Oils_Vinegars_Categories.findAll();
        const Straches = await Straches_Categories.findAll();
        const Milk_Products = await Milk_Products_Categories.findAll();
        const Sweets = await Sweets_Categories.findAll();
        const Drinks = await Drinks_Categories.findAll();
        const Spices_Herbs = await Spices_Herbs_Categories.findAll();
    
        const allProducts = {
          Fruits_Vegetables,
          Meat_Fish_Eggs,
          Oils_Vinegars,
          Straches,
          Milk_Products,
          Sweets,
          Drinks,
          Spices_Herbs
        };
    
        res.json(allProducts);
        console.log(allProducts)
      } catch (error) {
        console.error("Erreur lors de la récupération des produits :", error);
        res.status(500).json({ error: "Erreur lors de la récupération des produits" });
      }
    });
    

  module.exports = router;