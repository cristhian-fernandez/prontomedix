const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('tipo_prueba', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    tipo_prueba: {
      type: DataTypes.STRING,
      allowNull:false
    },
    descripcion: {
      type: DataTypes.TEXT,
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
