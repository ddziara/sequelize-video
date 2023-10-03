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

const User = sequelize.define(
  "user",
  {
    userName: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
  },
  { timestamps: false }
);

const Post = sequelize.define(
  "post",
  {
    message: {
      type: DataTypes.STRING,
    },
  },
  { timestamps: false }
);

User.hasMany(Post);
Post.belongsTo(User);

let country, capital;

sequelize
  .sync({ alter: true })
  .then((data) => {
    // working with our updated table
  })
  .catch((err) => {
    console.log(err);
  });