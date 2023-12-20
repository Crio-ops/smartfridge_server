const express = require("express");
const router = express.Router();

const {
   Products_Categories
  } = require("../../server/model/sequelize/sequelize_object_model.js");

// Route pour supprimer un produit spécifique
router.post("/", async (req, res) => {
  const productId = req.body.productId;
  try {

    const deletedProduct = await Products_Categories.destroy({
      where: {
        id: productId,
      },
    });

    if (deletedProduct) {
      console.log("Produit supprimé avec succès.");
      res.status(204).send(); // OK, pas de contenu
    } else {
      console.error("Produit non trouvé ou erreur lors de la suppression.");
      res.status(404).json({ error: "Produit non trouvé ou erreur lors de la suppression." });
    }
  } catch (error) {
    console.error("Erreur lors de la suppression du produit :", error);
    res.status(500).json({ error: "Erreur lors de la suppression du produit." });
  }
});



module.exports = router;
