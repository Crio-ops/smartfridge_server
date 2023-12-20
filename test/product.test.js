const { expect } = require('chai');
const { describe, it } = require('mocha');

const Product = require('../server/model/product.js');

describe('Product', () => {
  it('unitQuantityCheck devrait ajuster l\'unité de mesure en grammes correctement', () => {
   
    const product1 = new Product('Marque', 'Produit', 'ML', '100', 'image.jpg', ['keyword1'], 'categories');

    product1.unitQuantityCheck();

    expect(product1.quantity_unit).to.equal('ml');

  });
});
