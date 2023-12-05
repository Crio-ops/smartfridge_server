const express = require('express');
const router = express.Router();

const sequelize = require('../../server/config/database/mysql/database_reference.js')
const { Kitchen, Food, User_Kitchen }  = require( "../../server/model/sequelize/sequelize_object_model.js");
const token_auth  = require ("../../server/security/token_auth.js");
const jwt = require("jsonwebtoken");


router.post('/', async (req, res) => {

  let user = req.body;

    const token = req.headers.authorization;
    let response= { status : 1, status_verbose : 'valid token' , item : []}
    let isAllowed = token_auth(token)
    if(!isAllowed){
      console.log('not ok')
      response.status = 2
      response.status_verbose = 'expired token'
      res.status(200).json(response)
    }else{

    const kitchens = await User_Kitchen.findAll({
      where: {
        user_id: user.user_id,
      },
      include: [
        {
          model: Kitchen,
          attributes: ['id', 'kitchen_name'],
          include: [
            {
              model: Food,
              attributes: ['id','name','brand','type','quantity_unit','keywords','quantity', 'image'],
            },
          ],
        },
      ],
    })
      .then( (kitchens) =>{

        console.log("kitchen : ", kitchens[0].kitchen.food);
        const kitchen = {
          id: kitchens[0].kitchen.id,
          kitchen_name: kitchens[0].kitchen.kitchen_name,
          admin_id: kitchens[0].kitchen.admin_id,
          kitchenData : kitchens[0].kitchen.food,
        };

        const request = {
          state: { error: false },
          kitchen :kitchen ,
        };
  
        res.status(200).json({ request });
      })
      .catch ((error) => {
      console.log("L'ERREUR !!!!!!! : ", error);
      res.status(200).json({ error })
    })

    // sequelize.close()
  }
});

module.exports = router;
