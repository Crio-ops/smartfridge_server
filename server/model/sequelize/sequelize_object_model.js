const sequelize = require("../../config/database/mysql/database_reference.js");
const { DataTypes } = require("sequelize");

const User = sequelize.define(
  "users",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    account_name: {
      type: DataTypes.TEXT,
      unique: true,
    },
    password: DataTypes.TEXT,
    firstname: DataTypes.TEXT,
    lastname: DataTypes.TEXT,
    mail_address: {
      type: DataTypes.TEXT,
      unique: true,
    },
    fav_recipes: DataTypes.INTEGER,
  },
  {
    timestamps: false,
    tableName: "users",
  }
);

const Food = sequelize.define(
  "food",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    kitchen_id: {
      type: DataTypes.INTEGER,
      foreignKey: true,
    },
    name: DataTypes.TEXT,
    brand: DataTypes.TEXT,
    category: DataTypes.TEXT,
    quantity_unit: DataTypes.TEXT,
    keywords: DataTypes.JSON,
    quantity: DataTypes.FLOAT,
    image: DataTypes.TEXT,
  },
  {
    timestamps: false,
    tableName: "food",
  }
);

const Kitchen = sequelize.define(
  "kitchen",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    kitchen_name: DataTypes.TEXT,
    admin_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
    },
  },
  {
    timestamps: false,
    tableName: "kitchen",
  }
);

const User_Kitchen = sequelize.define(
  "user_kitchen",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
    },
    kitchen_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
    },
  },
  {
    timestamps: false,
    tableName: "user_kitchen",
  }
);

const Admin = sequelize.define(
  "admin",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    account_name: DataTypes.TEXT,
    password: DataTypes.TEXT,
  },
  {
    timestamps: false,
    tableName: "admin",
  }
);
const Products_Families = sequelize.define(
  "products_families",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name_fr: DataTypes.TEXT,
    name_nl: DataTypes.TEXT,
    name_en: DataTypes.TEXT,
  },
  {
    timestamps: false,
    tableName: "products_families",
  }
);

const Products_Categories = sequelize.define(
  "products_categories",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    id_family: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
    },
    category_name_fr: DataTypes.TEXT,
    category_name_nl: DataTypes.TEXT,
    category_name_en: DataTypes.TEXT,
  },
  {
    timestamps: false,
    tableName: "products_categories",
  }
);

const Recipes = sequelize.define(
  "recipes", 
  {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: DataTypes.STRING,

  description: DataTypes.STRING,
  instructions:DataTypes.TEXT,
  prep_time: DataTypes.INTEGER,  
  cook_time: DataTypes.INTEGER,
  total_time: DataTypes.INTEGER,
  servings:DataTypes.INTEGER,
},
{
  timestamps: false,
  tableName: "recipes",
}
);

const Ingredients = sequelize.define(
  "ingredients", 
  {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  id_recipe : DataTypes.INTEGER,
  name: DataTypes.TEXT,
  category: DataTypes.STRING,
  quantity: DataTypes.TEXT,
  },
  {
    timestamps: false,
    tableName: "ingredients",
  }
);


User_Kitchen.belongsTo(Kitchen, { foreignKey: "kitchen_id" });
Kitchen.hasMany(User_Kitchen, { foreignKey: "kitchen_id" });

Food.belongsTo(Kitchen, { foreignKey: "kitchen_id" });
Kitchen.hasMany(Food, { foreignKey: "kitchen_id" });

Products_Categories.belongsTo(Products_Families, { foreignKey: "id_family" });
Products_Families.hasMany(Products_Categories, { foreignKey: "id_family" });

Recipes.hasMany(Ingredients, { foreignKey: 'id_recipe' });
Ingredients.belongsTo(Recipes, { foreignKey: 'id_recipe' });


module.exports = {
  User,
  Kitchen,
  Food,
  User_Kitchen,
  Admin,
  Products_Families,
  Products_Categories,
  Recipes,
  Ingredients,
};
