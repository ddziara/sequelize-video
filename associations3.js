const Sequelize = require("sequelize");
const { DataTypes, Op } = Sequelize;
const dotenv = require("dotenv");

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "postgres",
  }
);

const Customer = sequelize.define(
  "customer",
  {
    customerName: {
      type: DataTypes.STRING,
    },
  },
  { timestamps: false }
);

const Product = sequelize.define(
  "product",
  {
    productName: {
      type: DataTypes.STRING,
    },
  },
  { timestamps: false }
);

Customer.belongsToMany(Product, { through: "customerproduct" });
Product.belongsToMany(Customer, { through: "customerproduct" });

sequelize
  .sync({ alter: true })
  .then((data) => {
    // working with our updated table
  })
  .catch((err) => {
    console.log(err);
  });
