module.exports = (sequelize, DataTypes) => {
    const Subscribers = sequelize.define("Subscribers", {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email : {
        type: DataTypes.STRING,
      },
      password : {
        type: DataTypes.STRING,
      },
      pin : {
        type: DataTypes.STRING(50),
      },
      operating_status: {
        type: DataTypes.STRING(5), //  A - Active , D - Deleted , S - Suspended
      },
    });
    Subscribers.associate = function (models) {
      // associations can be defined here
    };
    return Subscribers;
  };
  