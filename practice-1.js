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

const Student = sequelize.define(
  "student",
  {
    student_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [4, 20],
      },
    },
    favorite_class: {
      type: DataTypes.STRING(25),
      defaultValue: "Computer Science",
    },
    school_year: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    subscribed_to_wittcode: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

sequelize
  .sync({ alter: true })
  .then((data) => {
    // return Student.bulkCreate(
    //   [
    //     {
    //         name: "John Pixie",
    //         favorite_class: "History",
    //         school_year: 2023,
    //         subscribed_to_wittcode: false
    //     },
    //     {
    //         name: "Betty Blue",
    //         school_year: 2023,
    //     },
    //     {
    //         name: "hex Flower",
    //         school_year: 2023,
    //     },
    //     {
    //         name: "Marry Christmas",
    //         school_year: 2022,
    //     },
    //     {
    //         name: "Box Lipstick",
    //         school_year: 2021,
    //         subscribed_to_wittcode: false
    //     },
    //   ],
    //   {
    //     validate: true,
    //   }
    // );
    // return Student.findAll({ where: {
    //     [Op.or]: { favorite_class: "Computer Science", subscribed_to_wittcode: true }
    // }});

       return Student.findAll({attributes: ["school_year", [sequelize.fn("COUNT", sequelize.col("*")), "num_students"]], group: "school_year"}) 
  })
  .then((data) => {
    // console.log("All good!");
    data.forEach((element) => {
      console.log(element.toJSON());
    });
  })
  .catch((err) => {
    console.log(err);
  });
