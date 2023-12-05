let product = {
    code: '5400112355015',
    categories_lc:'fr',
    categories: [ 'Viandes et dérivés', 'Jambons','Jambons Blancs,Charcuteries, Produit en Tranches'],
  };
  
  let formData = new FormData();
  formData.append('code', product.code);
  formData.append('categories_lc', product.categories_lc);
  formData.append('categories', product.categories);
  formData.append('user_id', 'crio');
  formData.append('password', 'Saez80220890');
  
  fetch('https://world.openfoodfacts.org/cgi/product_jqm2.pl', {
    method: 'POST',
    body: formData,
  })
    .then(response => response.json())
    .then(data => {
      console.log('Produit ajouté avec succès:', data);
    })
    .catch(error => {
      console.error('Erreur lors de l\'ajout du produit:', error);
    });
  
