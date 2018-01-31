/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tipo_servicio', {
    tipo_servicio_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    codigo: {
      type: DataTypes.STRING,
      allowNull: false
    },
    estado: {
      type: DataTypes.CHAR,
      allowNull: true,
      defaultValue: 'A'
    }
  }, {
    tableName: 'tipo_servicio'
  });
};
