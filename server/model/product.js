class Product {
  constructor(brand, name, quantity_unit, quantity, image, keywords, categories) {
    this.brand = brand; // Utilisation d'une convention de nommage pour les variables privées
    this.name = name;
    this.image = image;
    this.keywords = keywords;
    this.categories = categories;
    this.quantity_unit = quantity_unit;
    this.quantity = quantity;
  }

  afficherInfos() {
    console.log(`Brand: ${this.brand}`);
    console.log(`Name: ${this.name}`);
    console.log(`Image: ${this.image}`);
    console.log(`Keywords: ${this.keywords}`);
    console.log(`categories: ${this.categories}`);
    console.log(`quantity_unit: ${this.quantity_unit}`);
    console.log(`quantity: ${this.quantity}`);
  }

  ajusterUniteQuantite() {
   
  // Retirer les espaces au début de la chaîne
  let cleanedQuantityUnit = this.quantity_unit.trim();


  if (/^g\S*/i.test(cleanedQuantityUnit)) {
    this.quantity_unit = 'g';
  }
  else if (/^k\S*/i.test(cleanedQuantityUnit)) {
    this.quantity_unit = 'kg';
  }
  else if (/^mg\S*/i.test(cleanedQuantityUnit)) {
    this.quantity_unit = 'mg';
  }
  else if (/^l\S*/i.test(cleanedQuantityUnit)) {
    this.quantity_unit = 'l';
  }
  else if (/^ml.*/i.test(cleanedQuantityUnit)) {
    this.quantity_unit = 'ml';
  }
  else if (/^cl\S*/i.test(cleanedQuantityUnit)) {
    this.quantity_unit = 'cl';
  }
  else {
    this.quantity_unit = '';
  }
  }
  

  

}

module.exports = Product;
