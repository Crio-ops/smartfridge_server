const express = require('express');
const router = express.Router();

const sequelize = require('../../server/config/database/mysql/database_reference.js')
const { Products_Families }  = require( "../../server/model/sequelize/sequelize_object_model.js");


router.get('/', async (req, res) => {

      const found_families = await Products_Families.findAll({

      })
        .then( (found_families) =>{
  
            const products_families = found_families.map(found_families =>found_families.dataValues)
            console.log("products_families : ", products_families);
  
          const request = {
            state: { error: false },
            products_families :products_families ,
          };
    
          res.status(200).json({ request });
        })
        .catch ((error) => {
        console.log("L'ERREUR !!!!!!! : ", error);
        res.status(200).json({ error })
      })
  
      // sequelize.close()

  });

  module.exports = router;