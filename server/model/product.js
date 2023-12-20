class Product {
  constructor(
    brand,
    name,
    quantity_unit,
    quantity,
    image,
    keywords,
    categories
  ) {
    this.brand = brand;
    this.name = name;
    this.quantity_unit = quantity_unit;
    this.quantity = quantity;
    this.image = image;
    this.keywords = keywords;
    this.categories = categories;
  }

  dislpayInfo() {
    console.log(`Brand: ${this.brand}`);
    console.log(`Name: ${this.name}`);
    console.log(`quantity_unit: ${this.quantity_unit}`);
    console.log(`quantity: ${this.quantity}`);
    console.log(`Image: ${this.image}`);
    console.log(`Keywords: ${this.keywords}`);
    console.log(`categories: ${this.categories}`);
  }

  unitQuantityCheck() {
    // delete first space in the string
    let cleanedQuantityUnit = this.quantity_unit.trim();

    if (/^g\S*/i.test(cleanedQuantityUnit)) {
      this.quantity_unit = "g";
    } else if (/^k\S*/i.test(cleanedQuantityUnit)) {
      this.quantity_unit = "kg";
    } else if (/^mg\S*/i.test(cleanedQuantityUnit)) {
      this.quantity_unit = "mg";
    } else if (/^l\S*/i.test(cleanedQuantityUnit)) {
      this.quantity_unit = "l";
    } else if (/^ml.*/i.test(cleanedQuantityUnit)) {
      this.quantity_unit = "ml";
    } else if (/^cl\S*/i.test(cleanedQuantityUnit)) {
      this.quantity_unit = "cl";
    } else {
      this.quantity_unit = "";
    }
  }

  
  extractUnitFromQuantity(quantityAndUnit) {
    console.log("extract:", quantityAndUnit);

    if (quantityAndUnit !== undefined) {
      const result = quantityAndUnit.match(/[\d.,]+/);

      if (result) {
        // Utilisez parseFloat pour obtenir un nombre flottant à partir de la chaîne correspondante
        this.quantity = parseFloat(result[0].replace(",", "."));
      } else {
        this.quantity = null; // Pas de correspondance, définir sur null
      }

      this.quantity_unit = quantityAndUnit.replace(/[\d.,]+/, "");
    }

    return [this.quantity, this.quantity_unit];
  }

  SplitCategoriesStringInArray(category) {
    if (category !== undefined && category !== " ") {
      const categoriesArray = category.split(", ");
      return this.categories = categoriesArray;
    }
    return [];
  }
  
}

module.exports = Product;
