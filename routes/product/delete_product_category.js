const express = require("express");
const router = express.Router();

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

// Route pour supprimer un produit spécifique
router.post("/", async (req, res) => {
  const productId = req.body.productId;
  const category = req.body.category;
  try {
    const result = await deleteProduct(category)
    console.log(result)
    const deletedProduct = await result.destroy({
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

async function deleteProduct(productFamily) {
    let categoryModel;
  
    switch (productFamily) {
      case "Fruits_Vegetables":
        categoryModel = Fruits_Vegetables_Categories;
        break;
      case "Meat_Fish_Eggs":
        categoryModel = Meat_Fish_Eggs_Categories;
        break;
      case "Oils_Vinegars":
        categoryModel = Oils_Vinegars_Categories;
        break;
      case "Straches":
        categoryModel = Straches_Categories;
        break;
      case "Milk_Products":
        categoryModel = Milk_Products_Categories;
        break;
      case "Sweets":
        categoryModel = Sweets_Categories;
        break;
      case "Drinks":
        categoryModel = Drinks_Categories;
        break;
        case "Spices_Herbs":
            categoryModel = Spices_Herbs_Categories;
            break;
  
      default:
        return null;
    }
  
    return categoryModel;
  }

module.exports = router;
