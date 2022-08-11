const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('prueba', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    nombre_prueba: {
      type: DataTypes.STRING,
      allowNull:false
    },
    descripcion: {
      type: DataTypes.TEXT,
      allowNull:true
    },
    precio: {
      type: DataTypes.FLOAT,
      allowNull:false
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull:true
    },
    estado: {
      type: DataTypes.SMALLINT,
      defaultValue: 1
    },
  },{
    timestamps: false
  });
};

// ESTADO: (0=INACTIVO – 1=ACTIVO)