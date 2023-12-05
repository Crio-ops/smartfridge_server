const express = require("express");
const router = express.Router();

const sequelize = require ("../../server/config/database/mysql/database_reference.js");
const { Food } = require ("../../server/model/sequelize/sequelize_object_model.js");
const jwt = require ("jsonwebtoken");

router.post("/", async (req, res) => {
  let product = req.body;

  const secretKey = process.env.SECRET_TOKEN_KEY;

  const existingProduct = await isProductAlreadyExist(product);

  // update the quantity of a product or create it if it not exists

  if (!!existingProduct === false) {
    const result = await store_product(product);
  } else {
    console.log("produit déja existant");
    const result = await updateProductQuantity(existingProduct, product);
  }

  async function store_product(product) {
    // save product with sequelize == INSERT INTO product ...
    try {
      const productToStore = Food.create({
        kitchen_id: product.kitchen_id,
        name: product.name,
        brand: product.brand,
        keywords: product.keywords,
        quantity_unit: product.quantity_unit,
        quantity: product.quantity,
        image: product.image,
      });
      console.log("produit créé");
      return true;
      // sequelize.close()
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async function isProductAlreadyExist(product) {
    try {
      // Check if the product exists in the db
      const existingProduct = await Food.findOne({
        where: {
          kitchen_id: product.kitchen_id,
          name: product.name,
          brand: product.brand,
          quantity_unit: product.quantity_unit,
          quantity: product.quantity,
        },
      });

      return existingProduct;
    } catch (error) {
      console.error(
        "Erreur lors de la recherche du produit en base de données:",
        error
      );
      throw error;
    }
  }

  async function updateProductQuantity(existingProduct, product) {
    try {
      const newQuantity = existingProduct.quantity + product.quantity;
      await Food.update(
        { quantity: newQuantity },
        {
          where: {
            kitchen_id: existingProduct.kitchen_id,
            name: existingProduct.name,
            brand: existingProduct.brand,
            quantity_unit: existingProduct.quantity_unit,
            quantity: existingProduct.quantity,
          },
        }
      );

      console.log("La quantité du produit a été mise à jour avec succès.");
      return true;
    } catch (error) {
      return false;
      console.error(
        "Erreur lors de la mise à jour de la quantité du produit en base de données:",
        error
      );
      throw error;
    }
  }
});
module.exports = router;
