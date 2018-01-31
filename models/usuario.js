/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('usuario', {
    usuario_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    nombre: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    apellido: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    username: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: true
    },
    correo: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: true
    },
    hash: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    salt: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    rol_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'rol',
        key: 'rol_id'
      }
    },
    fecha_nacimiento: {
      type: DataTypes.DATE,
      allowNull: true
    },
    src_path: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    estado: {
      type: DataTypes.CHAR,
      allowNull: true,
      defaultValue: 'A'
    }
  }, {
    tableName: 'usuario'
  });
};
