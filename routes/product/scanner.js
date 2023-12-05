const express = require("express");
const router = express.Router();

const OFF = require( "openfoodfacts-nodejs");
const client = new OFF();

const token_auth = require("../../server/security/token_auth.js");

const QuantityExtractor  = require("../../server/utils/quantityExtractor.js");
const Product = require( "../../server/model/product.js");

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
    var productFromApi = await client.getProduct(productBarCode.scannedNum);
    try {
      const quantityExtractor = new QuantityExtractor(
        productFromApi.product.quantity
      );
      const [extractedQuantity, extractedQuantityUnit] =
        quantityExtractor.extract();

      const product = new Product(
        productFromApi.product.brands,
        productFromApi.product.product_name,
        extractedQuantityUnit,
        extractedQuantity,
        productFromApi.product.image_front_small_url,
        productFromApi.product._keywords,
        productFromApi.product.categories
      );
      product.ajusterUniteQuantite();
      product.afficherInfos();

      response.item.push(product);
      res.status(200).json(response);
    } catch (error) {
      console.error("Une erreur s'est produite :", error);
      response.item.push(productFromApi);
      res.status(200).json(response);
    }
  }
});
module.exports = router;
