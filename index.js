const Sequelize = require("sequelize");
const { DataTypes } = Sequelize;
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
    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
    },
    age: {
      type: DataTypes.INTEGER,
      defaultValue: 21,
    },
    WittCodeRocks: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

User.sync({ alter: true })
  .then(() => {
    // working with our updated table
    return User.create({
      username: "WittCode",
      password: "subscribe",
      age: 25,
      WittCodeRocks: false,
    });
  })
  .then((data) => {
    console.log("User added to database!");
    data.username = "pizza";
    data.age = 45;
    return data.reload();
  })
  .then((data) => {
    console.log("User returned to normal!");
    console.log(data);
  })
  .catch((err) => {
    console.log(err);
  });
