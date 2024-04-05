module.exports = (sequelize, DataTypes) => {
    const Plans = sequelize.define("Plans", {
      plan_name : {
        type: DataTypes.STRING,
        allowNull: false,
      },
      value : {
        type: DataTypes.STRING,
      },
         
      status: {
        type: DataTypes.STRING(5), //  A - Active , D - Deleted , S - Suspended
      },
    });
    Plans.associate = function (models) {
      // associations can be defined here
    };
    return Plans;
  };
  