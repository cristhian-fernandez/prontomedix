require('dotenv').config();
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
// const {
//   DATABASE_URL
// } = process.env;
const {
  DB_USER, DB_PASSWORD, DB_HOST, DB_NAME
} = process.env;

// const db_user = 'senkrrgn_prontomedix_user';
// const db_password = 'prontomedix_user';
// const db_host = 'localhost';
// const db_name = 'senkrrgn_prontomedix';

// const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`, {
// const sequelize = new Sequelize(DATABASE_URL, {
//   logging: false, // set to console.log to see the raw SQL queries
//   native: false, // lets Sequelize know we can use pg-native for ~30% more speed

//   dialectOptions: {
//     ssl: {
//       require: true,
//       rejectUnauthorized: false,
//     }
//   },
// });
// const sequelize = new Sequelize(`postgres://${db_user}:${db_password}@${db_host}/${db_name}`, {
//   logging: false, // set to console.log to see the raw SQL queries
//   native: false, // lets Sequelize know we can use pg-native for ~30% more speed
// });

let sequelize =
  process.env.NODE_ENV === "production"
    ? new Sequelize({
        database: DB_NAME,
        dialect: "postgres",
        host: DB_HOST,
        port: 5432,
        username: DB_USER,
        password: DB_PASSWORD,
        pool: {
          max: 3,
          min: 1,
          idle: 10000,
        },
        dialectOptions: {
          ssl: {
            require: true,
            rejectUnauthorized: false,
          },
          keepAlive: true,
        },
        ssl: true,
      })
    : new Sequelize(
        `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`,
        { logging: false, native: false }
      );

const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach(model => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
// const { Cliente,Venta,DetalleVenta,Prueba,TipoPrueba, ExamenMedico, Perfil} = sequelize.models;
const Cliente = sequelize.models.Cliente;
const DetalleVenta = sequelize.models.Detalle_venta;
const ExamenMedico = sequelize.models.Examen_medico;
const Prueba = sequelize.models.Prueba;
const TipoPrueba = sequelize.models.Tipo_prueba;
const Venta = sequelize.models.Venta;
const Perfil = sequelize.models.Perfil;

const models = {
  Cliente,Venta,DetalleVenta,Prueba,TipoPrueba, ExamenMedico, Perfil
}
// console.log(sequelize.models);
// Aca vendrian las relaciones
// 1:N
TipoPrueba.hasMany(Prueba);
Prueba.belongsTo(TipoPrueba);

// 1:N
Cliente.hasMany(Venta);
Venta.belongsTo(Cliente);
// 1:N
ExamenMedico.hasMany(Prueba);
Prueba.belongsTo(ExamenMedico);

// N:N
// Venta.belongsToMany(Prueba,{through:'perfil_prueba'});
// Prueba.belongsToMany(Perfil,{through:'perfil_prueba'});
// N:N
Perfil.belongsToMany(Prueba,{through:'perfil_prueba'});
Prueba.belongsToMany(Perfil,{through:'perfil_prueba'});

module.exports = {
  ...models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize,     // para importart la conexión { conn } = require('./db.js');
};
