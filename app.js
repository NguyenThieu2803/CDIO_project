require('dotenv').config();
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const init_API_Rank = require('./router/api/routerAPI');
const init_API_Review = require('./router/api/API_Review');
const init_API_Ingredient = require('./router/api/API_Ingredient');
const init_API_Intruction = require('./router/api/API_Instruction');
const init_API_Difficulty = require('./router/api/API_difficultRecipe');
const init_API_datadifficult = require('./router/api/API_listDifficult');
const init_API_difficulty = require('./router/api/API_dataEvent');
const init_API_Danhgisanpham = require('./router/api/API_addDanhGia');
const init_API_RecipeByid = require('./router/api/API_RecipeByid');
const init_API_AddFavorite = require('./router/api/API_AddFavoristList');
const init_API_Favorite = require('./router/api/API_getFa');
const route = require('./router/router');
// // middleware
app.use(express.static('./public'));
app.use(express.json());
app.use(bodyParser.json());
app.use(route);

// // app.use(notFoundMiddleware);
// // app.use(errorHandlerMiddleware);

//view engine
app.set('views', path.join(__dirname,'views'));
app.set('view engine', 'ejs');

//config static files
app.use(express.static(path.join(__dirname,'public')));

// Api routes
init_API_Rank(app);
init_API_Review(app);
init_API_Ingredient(app);
init_API_Intruction(app);
init_API_Difficulty(app);
init_API_datadifficult(app);
init_API_difficulty(app);
init_API_Danhgisanpham(app);
init_API_RecipeByid(app);
init_API_AddFavorite(app)
init_API_Favorite(app);
const port = process.env.PORT;

const start = async () => {
  try {
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
