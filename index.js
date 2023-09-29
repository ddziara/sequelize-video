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
      validate: {
        len: [4, 6],
      },
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
    return User.bulkCreate(
      [
        {
          username: "Tomrewrewytrey",
          age: 25,
          password: "pizzasocker",
        },
        {
          username: "M",
          age: 31,
          password: "12345",
        },
        {
          username: "Freddiedfgfdhgh",
        },
      ],
      {
        validate: true,
      }
    );
  })
  .then((data) => {
    data.forEach((element) => {
      console.log(element.toJSON());
    });
  })
  .catch((err) => {
    console.log(err);
  });
