require('dotenv').config();
const path = require('path');
const express = require('express');
const app = express();
const init_API_Rank = require('./router/api/routerAPI');
const route = require('./router/router');
// // middleware
app.use(express.static('./public'));
app.use(express.json());

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
