const express = require('express');
const app = express();
const { Sequelize } = require('sequelize');
const userRoutes = require('./routes/user');

/*Création d'une instance Sequelize*/
const sequelize = new Sequelize('groupomania', 'ILAN', 'Mysql1234ilan', {
  host: 'localhost',
  dialect: 'mysql'
});
/*Connexion*/
try {
  sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}


/*-------------------------------------------Déf des CORS lien backend et frontend ------------------------------------------*/

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
  app.use('/api/auth', userRoutes);

module.exports = app;