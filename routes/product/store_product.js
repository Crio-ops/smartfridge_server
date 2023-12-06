const express = require("express");
const router = express.Router();

const sequelize = require ("../../server/config/database/mysql/database_reference.js");
const { Food } = require ("../../server/model/sequelize/sequelize_object_model.js");
const jwt = require ("jsonwebtoken");

router.post("/", async (req, res) => {
  let product = req.body;
  console.log(product)
  const secretKey = process.env.SECRET_TOKEN_KEY;

  const existingProduct = await isProductAlreadyExist(product);

  // update the quantity of a product or create it if it not exists

  if (existingProduct === null) {
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
      console.log('produit dans isPExist', product)
      // Check if the product exists in the db
      const existingProduct = await Food.findOne({
        where: {
          kitchen_id: product.kitchen_id,
          name: product.name,
          brand: product.brand,
        },
      });
      console.log('le produit existant : ',existingProduct)
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
      console.log('la nouvelle QUANTITé',existingProduct, " ", product)
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
      console.error(
        "Erreur lors de la mise à jour de la quantité du produit en base de données:",
        error
      );
      return false;
    }
  }
});
module.exports = router;
