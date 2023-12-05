const sequelize = require( '../../config/database/mysql/database_reference.js')
const {DataTypes} = require('sequelize');

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
        foreignKey: true
    },
      name: DataTypes.TEXT,
      brand: DataTypes.TEXT,
      type: DataTypes.TEXT,
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
      admin_id:{
        type:DataTypes.INTEGER,
        allowNull: false,
        unique: true
      }
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
        type:DataTypes.INTEGER,
        allowNull: false,
        unique: true
      },
      kitchen_id:{
        type:DataTypes.INTEGER,
        allowNull: false,
        unique: true
      }
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
      password: DataTypes.TEXT
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
      id_ref_products_categories: DataTypes.INTEGER
    },
    {
      timestamps: false,
      tableName: "products_families",
    }
  );

  User_Kitchen.belongsTo(Kitchen, { foreignKey: 'kitchen_id' });
  Kitchen.hasMany(User_Kitchen, { foreignKey: 'kitchen_id' });
  
  Food.belongsTo(Kitchen, { foreignKey: 'kitchen_id' });
  Kitchen.hasMany(Food, { foreignKey: 'kitchen_id' });
  
  module.exports = {User, Kitchen, Food, User_Kitchen, Admin, Products_Families}