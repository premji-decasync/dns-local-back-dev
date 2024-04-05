module.exports = (sequelize, DataTypes) => {
    const Super_admin = sequelize.define("Super_admin", {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
      },
      role: {
        type: DataTypes.STRING,
      },
      pin: {
        type: DataTypes.STRING(50),
      },         
      operating_status: {
        type: DataTypes.STRING(5),  //  A - Active , D - Deleted , S - Suspended
      },
    });
    Super_admin.associate = function (models) {
      // associations can be defined here
    };
    return Super_admin;
  };
  