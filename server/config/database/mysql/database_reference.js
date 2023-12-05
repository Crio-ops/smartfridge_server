const {Sequelize, Model, DataTypes} = require('sequelize');


    const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER_NAME, process.env.DB_PASSWORD, {
        host: process.env.DB_HOST,
        dialect: 'mariadb',
        dialectModule: require('mariadb'),
    });

    module.exports =  sequelize


    
  

