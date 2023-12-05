class QuantityExtractor {
  constructor(quantityAndUnit) {
    this.quantityAndUnit = quantityAndUnit;
    this.quantity = '';
    this.quantity_unit = '';
  }

  extract() {
    console.log('extract:', this.quantityAndUnit);

    if (this.quantityAndUnit !== undefined) {
      const matchResult = this.quantityAndUnit.match(/[\d.,]+/);
      
      if (matchResult) {
        // Utilisez parseFloat pour obtenir un nombre flottant à partir de la chaîne correspondante
        this.quantity = parseFloat(matchResult[0].replace(',', '.'));
      } else {
        this.quantity = null;  // Pas de correspondance, définir sur null
      }

      this.quantity_unit = this.quantityAndUnit.replace(/[\d.,]+/, "");
    }

    return [this.quantity, this.quantity_unit];
  }
}

// Exemple d'utilisation
const quantityExtractor = new QuantityExtractor('5 units');
const [extractedQuantity, extractedQuantityUnit] = quantityExtractor.extract();
console.log(extractedQuantity, extractedQuantityUnit);


module.exports =  QuantityExtractor ;

  