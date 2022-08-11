const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('cliente', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    tipo_cliente: {
      type: DataTypes.STRING,
      allowNull:true,
      defaultValue: 'cliente'
    },
    nombre_cliente: {
      type: DataTypes.STRING,
      allowNull:false
    },
    tipo_documento: {
      type: DataTypes.STRING,
      allowNull:true,
      defaultValue: "-",
    },
    num_documento: {
      type: DataTypes.STRING,
      allowNull:true,
      defaultValue: "-",
    },
    distrito: {
      type: DataTypes.STRING,
      allowNull:true
    },
    direccion: {
      type: DataTypes.STRING,
      allowNull:true
    },
    celular: {
      type: DataTypes.STRING,
      allowNull:true
    },
    email: {
      type: DataTypes.STRING,
      allowNull:false
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