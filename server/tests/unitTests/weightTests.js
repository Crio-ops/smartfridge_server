const { expect } = require('chai');
const { describe, it } = require('mocha');

// Importez la classe Product ici
const Product = require('../../model/product.js');

describe('Product', () => {
  it('ajusterUniteQuantite devrait ajuster l\'unité de mesure en grammes correctement', () => {
    // Créez une instance de Product avec différentes unités de mesure
    const product1 = new Product('Marque', 'Produit', '', '100', 'image.jpg', ['keyword1']);


    // Appliquez l'ajustement sur chaque instance
    product1.ajusterUniteQuantite();


    // Vérifiez si l'ajustement a été fait correctement
    expect(product1.quantity_unit).to.equal('');

  });

  // Ajoutez d'autres tests si nécessaire
});
