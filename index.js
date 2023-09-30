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
    // return User.findAll();
    // return User.findAll({ attributes: ["username", "password"] });
    // return User.findAll({ attributes: [["username", "myName"], ["password", "pwd"]] });
    // return User.findAll({attributes: [[sequelize.fn('SUM', sequelize.col('age')), 'howOld']]});
    // return User.findAll({attributes: [[sequelize.fn('AVG', sequelize.col('age')), 'howOld']]});
    // return User.findAll({ attributes: { exclude: ["password"] } });
    // return User.findAll({ attributes: ['username'], where: { age: 45 } });
    // return User.findAll({ where: { age: 25, username: "pizza" } });
    // return User.findAll({ limit: 2});
    // return User.findAll({ order: [['age','DESC']]});
    // return User.findAll({ attributes: ['username', [sequelize.fn('SUM', sequelize.col('age')), 'sum_age']], group: 'username'});
    // return User.findAll({
    //   where: {
    //     [Op.or]: { username: "soccer", age: 45 },
    //   },
    // });
    // return User.findAll({ where: {
    //   age: {
    //     [Op.gt]: 25
    //   }
    // }});
    // return User.findAll({ where: {
    //   age: {
    //     [Op.or]: {
    //       [Op.lt]: 45,
    //       [Op.eq]: null
    //     }
    //   }
    // }});
    // return User.findAll({ where:
    //   sequelize.where(sequelize.fn('char_length', sequelize.col('username')), 5)
    // });
    // return User.update({ username: "pizza" }, { where: { age: 25 } });
    // return User.update(
    //   { username: "Yes!" },
    //   { where: { age: { [Op.gt]: 1 } } }
    // );
    // return User.destroy({ where: { username: "Yes!" } });
    // return User.destroy({ truncate: true });
    // return User.create({
    //   username: 'oldy',
    //   password: '1234',
    //   age: 87
    // })
    // return User.max('age');          // utility function
    // return User.sum('age');          // utility function
    return User.sum("age", { where: { age: 21 } }); // utility function
  })
  .then((data) => {
    console.log(data);
    // data.forEach((element) => {
    //   console.log(element.toJSON());
    // });
  })
  .catch((err) => {
    console.log(err);
  });
