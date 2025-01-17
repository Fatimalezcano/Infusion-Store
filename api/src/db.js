require("dotenv").config();
const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");

const { DATABASE_URL } = process.env;
const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT } = process.env;

const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}`,
  {
    logging: false, // set to console.log to see the raw SQL queries
    native: false, // lets Sequelize know we can use pg-native for ~30% more speed
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  }
);
const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach((model) => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const { Producto } = sequelize.models;
const { Categoria } = sequelize.models;
const { Rating } = sequelize.models;
const { Usuario } = sequelize.models;
const { Pedido } = sequelize.models;
const { Compra } = sequelize.models;
// Aca vendrian las relaciones
// Product.hasMany(Reviews);
Producto.belongsToMany(Categoria, { through: "CatPro" });
Categoria.belongsToMany(Producto, { through: "CatPro" });
Rating.belongsTo(Producto);
Producto.hasMany(Rating);
Rating.belongsTo(Usuario);
Usuario.hasMany(Rating);

Pedido.belongsTo(Usuario);
Usuario.hasMany(Pedido);
Producto.belongsToMany(Pedido, { through: Compra });
Pedido.belongsToMany(Producto, { through: Compra });
Producto.belongsToMany(Usuario, { through: "Favoritos" });
Usuario.belongsToMany(Producto, { through: "Favoritos" });

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize, // para importart la conexión { conn } = require('./db.js');
};
