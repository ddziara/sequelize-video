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

const Country = sequelize.define(
  "country",
  {
    contryName: {
      type: DataTypes.STRING,
      unique: true,
    },
  },
  { timestamps: false }
);

const Capital = sequelize.define(
  "capital",
  {
    capitalName: {
      type: DataTypes.STRING,
      unique: true,
    },
  },
  { timestamps: false }
);

Country.hasOne(Capital);

sequelize
  .sync({ sync: "alter" })
  .then((data) => {
    // working with our updated table
  })
  .catch((err) => {
    console.log(err);
  });
