const express = require("express");
const router = express.Router();

const sequelize = require("../../server/config/database/mysql/database_reference.js");
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

router.post("/", async (req, res) => {
  const data = req.body;
  console.log(data);

  const insertedCategory = await insertProduct(data.tableName);
  console.log(insertedCategory);

  if (insertedCategory) {
    const category = await insertedCategory.create({
      category_name_fr: data.categories_name_fr,
      category_name_nl: data.categories_name_nl,
      category_name_en: data.categories_name_en,
    });

    if (category) {
      console.log(
        "Produit inséré avec succès dans la catégorie :",
        category.toJSON()
      );
    } else {
      console.error("Erreur lors de l'insertion du produit.");
    }
  } else {
    console.error("Erreur lors de la récupération de la catégorie.");
  }
});

async function insertProduct(productFamily) {
  let categoryModel;

  switch (productFamily) {
    case "1":
      categoryModel = Fruits_Vegetables_Categories;
      break;
    case "2":
      categoryModel = Meat_Fish_Eggs_Categories;
      break;
    case "3":
      categoryModel = Oils_Vinegars_Categories;
      break;
    case "4":
      categoryModel = Straches_Categories;
      break;
    case "5":
      categoryModel = Milk_Products_Categories;
      break;
    case "6":
      categoryModel = Sweets_Categories;
      break;
    case "7":
      categoryModel = Drinks_Categories;
      break;
    case "8":
      categoryModel = Spices_Herbs_Categories;
      break;

    default:
      return null;
  }

  return categoryModel;
}

module.exports = router;
