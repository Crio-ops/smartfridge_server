const express = require("express");
const router = express.Router();

const sequelize = require("../../server/config/database/mysql/database_reference.js");
const {
  Food,
} = require("../../server/model/sequelize/sequelize_object_model.js");

router.post("/", async (req, res) => {

    let product = req.body;
    console.log(product)
  try {
    const food = await Food.findByPk(product.id);

    if (!food) {
      return res.status(404).json({ error: "Food not found" });
    }

    // Mettez à jour la quantité
    food.quantity = product.quantity;
    await food.save();

    return res
      .status(200)
      .json({ success: true, message: "Quantity updated successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
