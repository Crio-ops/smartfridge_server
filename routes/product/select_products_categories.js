const express = require('express');
const router = express.Router();

const sequelize = require('../../server/config/database/mysql/database_reference.js')
const {
    Products_Categories,
    Products_Families
  } = require("../../server/model/sequelize/sequelize_object_model.js");
  


router.get('/', async (req, res) => {

    try {
      const products_categories = await Products_Categories.findAll({
        attributes: ['id', 'id_family', 'category_name_fr', 'category_name_nl', 'category_name_en'],
        include: [{
          model: Products_Families,
          attributes: ['name_fr'],
          where: {
            id: sequelize.col('products_categories.id_family'),
          },
        }],
      });
        res.json(products_categories);
        console.log('LA REQUETE : ',products_categories)
      } catch (error) {
        console.error("Erreur lors de la récupération des produits :", error);
        res.status(500).json({ error: "Erreur lors de la récupération des produits" });
      }
    });
    

  module.exports = router;