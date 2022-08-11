const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('detalle_venta', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    idventa: {
      type: DataTypes.INTEGER,
      allowNull:false
    },
    idproducto: {
      type: DataTypes.INTEGER,
      allowNull:false
    },
    cantidad: {
      type: DataTypes.INTEGER,
      allowNull:true
    },
    precio_venta: {
      type: DataTypes.FLOAT,
      allowNull:false
    },
    descuento: {
      type: DataTypes.FLOAT,
      allowNull:true
    },
  },{
    timestamps: false
  });
};

// ESTADO: (0=INACTIVO – 1=ACTIVO)