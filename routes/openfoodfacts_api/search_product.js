const express = require("express");
const router = express.Router();

const OFF = require("openfoodfacts-nodejs");
const client = new OFF();

const token_auth = require("../../server/security/token_auth.js");
//models
const Product = require("../../server/model/product.js");
const ProductCategory = require("../../server/model/productCategory.js");
// Database
const sequelize = require("../../server/config/database/mysql/database_reference.js");
const {
  Products_Categories,
  Products_Families,
} = require("../../server/model/sequelize/sequelize_object_model.js");

router.post("/", async (req, res) => {
  var productBarCode = req.body;
  const secretKey = process.env.SECRET_TOKEN_KEY;
  const token = req.headers.authorization;

  let response = { status: 1, status_verbose: "valid token", item: [] };

  let isAllowed = token_auth(token);

  if (!isAllowed) {
    console.log("not ok");
    response.status = 2;
    response.status_verbose = "expired token";
    res.status(200).json(response);
  } else {

    const productFromApi = await client.getProduct(productBarCode.scannedNum);
    console.log(productFromApi)
    if (productFromApi.status === 0) {
      response.status = 0;
      response.status_verbose = productFromApi.status_verbose;
      res.status(200).json(response);
    } else {

      const categoriesFromDataBase = await getAllCategoriesFromDataBase();

      try {
        const product = new Product(
          productFromApi.product.brands,
          productFromApi.product.product_name,
          (quantity = ""),
          (quantity_unit = ""),
          productFromApi.product.image_front_small_url,
          productFromApi.product._keywords,
          (categories= "")
        );

        product.extractUnitFromQuantity(productFromApi.product.quantity);
        product.unitQuantityCheck();

        //Checks whether the product category exists in the database
        //If yes, return the category
        //If no, return the OFF categories OR generic_name_fr if exists
        // generic_name is more precise in term of category than categories.

        if (
          productFromApi.product.generic_name_fr === "" ||
          productFromApi.product.generic_name_fr === undefined
        ) {
          if (productFromApi.product.categories === undefined) {
            product.categories = undefined;
          } else {
            product.categories = productFromApi.product.categories;
            product.SplitCategoriesStringInArray(product.categories);
            product.categories = compare(
              JSON.parse(categoriesFromDataBase),
              product.categories
            );
          }
        } else {
          product.categories = productFromApi.product.generic_name_fr
          product.SplitCategoriesStringInArray(product.categories);
          product.categories = compare(
            JSON.parse(categoriesFromDataBase),
            product.categories
          );
        }

        // product.dislpayInfo();
        console.log(productFromApi.product.categories)
        response.item.push(product);
        res.status(200).json(response);
      } catch (error) {
        console.error("Une erreur s'est produite :", error);
        response.item.push(productFromApi);
        res.status(200).json(response);
      }
    }
  }
});

const getAllCategoriesFromDataBase = async () => {
  try {
    const products_categories = await Products_Categories.findAll({
      attributes: [
        "id",
        "id_family",
        "category_name_fr",
        "category_name_nl",
        "category_name_en",
      ],
      include: [
        {
          model: Products_Families,
          attributes: ["name_fr"],
          where: {
            id: sequelize.col("products_categories.id_family"),
          },
        },
      ],
    });
    return JSON.stringify(products_categories);
  } catch (error) {
    console.error("Erreur lors de la récupération des produits :", error);
    res
      .status(500)
      .json({ error: "Erreur lors de la récupération des produits" });
  }
};

function compare(arrayFromDataBase, arrayFromOFF) {
  const matchingData = [];

  arrayFromDataBase.forEach((dataValue) => {
    // Créer un objet ProductCategory pour le produit actuel
    const productCategory = new ProductCategory(
      dataValue.id,
      dataValue.category_name_fr,
      dataValue.category_name_nl,
      dataValue.category_name_en,
      dataValue.products_family.name_fr
    );

    // Comparer avec les catégories à rechercher
    if (compareCategoriesWithProduct(productCategory, arrayFromOFF)) {
      // Stocker la catégorie correspondante
      matchingData.push(productCategory);
    }
  });

  // Vérifier s'il y a des catégories correspondantes
  if (matchingData.length > 0) {
    const matchingCategories = { match: true,
      categories : matchingData}
    return matchingCategories;
  } else {
    const matchingCategories = { match: false,
      categories : arrayFromOFF}
    return matchingCategories;
  }
}

function compareCategoriesWithProduct(productCategory, categoriesToCompare) {
  for (let i = 0; i < categoriesToCompare.length; i++) {
    if (
      categoriesToCompare[i].toLowerCase() ===
        productCategory.category_name_fr.toLowerCase() ||
      categoriesToCompare[i].toLowerCase() ===
        productCategory.category_name_nl.toLowerCase() ||
      categoriesToCompare[i].toLowerCase() ===
        productCategory.category_name_en.toLowerCase()
    ) {
      return true;
    }
  }
  return false;
}

module.exports = router;
