const Sequelize = require("sequelize");

const sequelize = new Sequelize(
  "dns_filter",
  "root",
  "ifelseif",
  {
    host: "localhost",
    port: 3306,
    dialect: "mysql",
    define: {
      timestimps: false,
    },
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
    operatorAliases: false,
  },
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.super_admin = require("./super_admin.js")(sequelize, Sequelize);
db.subscribers = require("./subscribers.js")(sequelize, Sequelize);
db.plans = require("./plans.js")(sequelize, Sequelize);
db.subscriptions = require("./subscriptions.js")(sequelize, Sequelize);
db.family_list = require("./family_list.js")(sequelize, Sequelize);


db.subscribers.hasOne(db.subscriptions);
db.subscriptions.belongsTo(db.subscribers);

db.plans.hasMany(db.subscriptions);
db.subscriptions.belongsTo(db.plans);

db.subscribers.hasMany(db.family_list);
db.family_list.belongsTo(db.subscribers);

module.exports = db;
