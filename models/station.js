'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Station extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Station.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [2, 100],
        notEmpty: true,
      }
    },
    address: {
      type: DataTypes.STRING,
      validate: {
        //custom trả về 
        checkLen(value) {
          if (value.length >= 5 && value.length <= 30) {
            return true
          } else {
            throw new Error('Độ dài từ 5-30')
          }
        }
      }
    },
    province: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [['TH', 'HCM', 'Hà Nội', 'Cần Thơ', 'Đà Nẵng']],
      }
    }
  }, {
    sequelize,
    modelName: 'Station',
  });
  return Station;
};