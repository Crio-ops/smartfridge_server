class ProductCategory {
    constructor(id, category_name_fr, category_name_nl, category_name_en, family_name) {
      this.id = id;
      this.category_name_fr = category_name_fr;
      this.category_name_nl = category_name_nl;
      this.category_name_en = category_name_en;
      this.family_name = family_name;
    }
    
    dislpayInfo() {
        console.log(`id: ${this.id}`);
        console.log(`category_name_fr: ${ this.category_name_fr}`);
        console.log(`category_name_nl: ${this.category_name_nl}`);
        console.log(`category_name_en: ${this.category_name_en}`);
        console.log(`family_name: ${this.family_name}`);
        
    }

}

  module.exports = ProductCategory;