const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('examen_medico', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    examen_medico: {
      type: DataTypes.STRING,
      allowNull:false
    },
    descripcion: {
      type: DataTypes.TEXT,
      allowNull:true
    },
  },{
    timestamps: false
  });
};
