// Dans votre fichier de route, par exemple, deleteProductRoute.js
const express = require("express");
const router = express.Router();

const { Food } = require("../../server/model/sequelize/sequelize_object_model.js");

router.delete("/:id", async (req, res) => {
  const productId = req.params.id;

  try {
    const product = await Food.findByPk(productId);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    // Supprimer le produit de la base de données
    await product.destroy();

    return res.status(200).json({ success: true, message: "Product deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
