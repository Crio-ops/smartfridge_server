const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();




// users routes
const search_productRoute = require('./routes/openfoodfacts_api/search_product');
const loginUserRoute = require('./routes/users/login.js')
const createUserRoute = require('./routes/users/create.js')
const fetch_user_kitchen_dataRoute = require('./routes/product/fetch_user_kitchen_data.js')
const store_productRoute = require('./routes/product/store_product.js')
const update_product_quantityRoute = require('./routes/product/update_product_quantity.js')
const delete_productRoute = require("./routes/product/delete_product");
const create_productRoute = require('./routes/openfoodfacts_api/create_product.js')
const create_recipeRoute = require('./routes/recipes/create_recipe.js')
const select_recipes_listRoute = require('./routes/recipes/select_recipes_list.js')




// admin routes
const loginAdminRoute = require('./routes/admin/login.js')
const select_products_familiesRoute = require('./routes/product/select_products_families.js')
const insert_product_categoryRoute = require("./routes/product/insert_product_category.js")
const select_products_categoriesRoute = require("./routes/product/select_products_categories.js")
const delete_product_categoryRoute = require("./routes/product/delete_product_category.js")



const app = express();
const port = process.env.PORT || 3001;





app.use(cors());
app.use(cors({
  origin: 'http://localhost:3000', 
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',  
  credentials: true,
  optionsSuccessStatus: 204, 
}));
app.use(bodyParser.json({ limit: '10mb' }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'client/build')));

// admin routes
app.use('/routes/admin/login', loginAdminRoute);
app.use('/routes/product/select_products_families', select_products_familiesRoute);
app.use('/routes/product/insert_product_category', insert_product_categoryRoute);
app.use('/routes/product/select_products_categories', select_products_categoriesRoute);
app.use('/routes/product/delete_product_category', delete_product_categoryRoute);




// users routes
app.use('/routes/openfoodfacts_api/search_product', search_productRoute);
app.use('/routes/product/fetch_user_kitchen_data', fetch_user_kitchen_dataRoute);
app.use('/routes/product/update_product_quantity', update_product_quantityRoute);
app.use('/routes/product/delete_product', delete_productRoute);
app.use('/routes/product/store_product', store_productRoute);
app.use('/routes/users/login', loginUserRoute);
app.use('/routes/users/create', createUserRoute);
app.use('/routes/openfoodfacts_api/create_product', create_productRoute);
app.use('/routes/recipes/create_recipe', create_recipeRoute);
app.use('/routes/recipes/select_recipes_list', select_recipes_listRoute);

app.use((err, req, res, next) => {
    console.error(err.stack);
  
    res.status(500).json({
      status: 500,
      message: 'Erreur interne du serveur',
      error: err.message,
    });
  });

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

app.listen(port, () => {
  console.log(`Serveur Express en cours d'exécution sur le port ${port}`);
});
