require('dotenv').config();
const { Sequelize } = require('sequelize');
const { DB_USER, DB_PASSWORD, DB_HOST } = process.env;
const FavoriteModel = require('./models/Favorite');
const UserModel = require('./models/User');


// EJERCICIO 03
// A la instancia de Sequelize le falta la URL de conexión. ¡Agrégala!
// Recuerda pasarle la información de tu archivo '.env'.

// URL ----> postgres://DB_USER:DB_PASSWORD@DB_HOST/rickandmorty
const sequelize = new Sequelize(
   // URL
   `postgres://${"postgres"}:${'Juancami172001'}@${'localhost'}/rickandmorty`,
   { logging: false, native: false }
);


// const testConnection = async () => {
//    try {
//       await sequelize.authenticate()
//       console.log('Conexion andando')
//    } catch (error) {
//       console.log('Algo salio mal')
//    }
// }

// testConnection();
// EJERCICIO 05
// Debajo de este comentario puedes ejecutar la función de los modelos.

UserModel(sequelize);

FavoriteModel(sequelize);

// Ejercicio 06
// ¡Relaciona tus modelos aquí abajo!
const { User, Favorite } = sequelize.models;

User.belongsToMany(Favorite, {through: 'user_favorites'})//Aca estamos creando una nueva tabla que sera la relacion entre users <=> favorites
Favorite.belongsToMany(User, {through: 'user_favorites'})

module.exports = {
   User,
   Favorite,
   conn: sequelize,
};
