const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('venta', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    fecha_venta: {
      type: DataTypes.DATEONLY,
      allowNull:false
    },
    igv: {
      type: DataTypes.INTEGER,
      allowNull:true,
      defaultValue: 0
    },
    impuesto: {
      type: DataTypes.INTEGER,
      allowNull:true,
      defaultValue: 0
    },
    total: {
      type: DataTypes.FLOAT,
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