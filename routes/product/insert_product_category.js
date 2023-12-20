const express = require("express");
const router = express.Router();

const sequelize = require("../../server/config/database/mysql/database_reference.js");
const {
Products_Categories
} = require("../../server/model/sequelize/sequelize_object_model.js");

router.post("/", async (req, res) => {
  const data = req.body;

    const category = await Products_Categories.create({
      category_name_fr: data.categories_name_fr,
      category_name_nl: data.categories_name_nl,
      category_name_en: data.categories_name_en,
      id_family:data.tableName
    });

    if (category) {
      console.log(
        "Produit inséré avec succès dans la catégorie :",
        category.toJSON()
      );
    } else {
      console.error("Erreur lors de l'insertion du produit.");
    }

});


module.exports = router;
