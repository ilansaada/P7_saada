const express = require('express');
const app = express();

const userRoutes = require('./routes/user');
const messageRoutes = require('./routes/message');


/*-------------------------------------------Déf des CORS lien entre backend et frontend ------------------------------------------*/

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});
app.use(express.urlencoded({extended:true}));
app.use(express.json());

/*déclaration des routes*/
app.use('/api/user', userRoutes);
app.use('/api/message', messageRoutes);

module.exports = app;