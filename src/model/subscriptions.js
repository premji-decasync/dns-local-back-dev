module.exports = (sequelize, DataTypes) => {
    const Subscriptions = sequelize.define("Subscriptions", {
      remarks : {
        type: DataTypes.STRING,
        allowNull: false,
      },
      amount : {
        type: DataTypes.STRING,
      },
      date_of_expiry : {
        type: DataTypes.STRING,
      },     
      status: {
        type: DataTypes.STRING(5), //  A - Active , D - Deleted , S - Suspended
      },
    });
    Subscriptions.associate = function (models) {
      // associations can be defined here
    };
    return Subscriptions;
  };
  