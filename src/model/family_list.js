
module.exports = (sequelize, DataTypes) => {
    const Family_list = sequelize.define("Family_list", {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      default_rule : {
        type: DataTypes.STRING,
      },     
      operating_status: {
        type: DataTypes.STRING(5), //  A - Active , D - Deleted , S - Suspended
      },
    });
    Family_list.associate = function (models) {
      // associations can be defined here
    };
    return Family_list;
  };
  