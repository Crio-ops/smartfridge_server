const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
  const data = req.body;


  console.log(data)
  let formData = new FormData();
  formData.append('code', data.code);
  formData.append('categories', data.categories);
  formData.append('labels', data.labels);
  formData.append('quantity', data.quantity);
  formData.append('brands', data.brands);
  formData.append('user_id', 'crio');
  formData.append('password', 'Saez80220890')
  
  fetch('https://world.openfoodfacts.org/cgi/product_jqm2.pl', {
    method: 'POST',
    body: formData,
  })
    .then(response => response.json())
    .then(data => {
      res.status(200).json(data);
      console.log('Produit ajouté avec succès:', data);
    })
    .catch(error => {
      console.error('Erreur lors de l\'ajout du produit:', error);
    });
  
  });

  module.exports = router;