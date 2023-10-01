const Sequelize = require("sequelize");
const { DataTypes, Op } = Sequelize;
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
const zlib = require("zlib");

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
      // get() {
      //   const rawValue = this.getDataValue("username");
      //   return rawValue.toUpperCase();
      // },
    },
    password: {
      type: DataTypes.STRING,
      // set(value) {
      //   const salt = bcrypt.genSaltSync(12);
      //   const hash = bcrypt.hashSync(value, salt);
      //   this.setDataValue("password", hash);
      // },
    },
    age: {
      type: DataTypes.INTEGER,
      defaultValue: 21,
      validate: {
        isNumeric: {
          msg: "You must enter a number for age!",
        },
      },
    },
    WittCodeRocks: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    description: {
      type: DataTypes.STRING,
      // set(value) {
      //   const compressed = zlib.deflateSync(value).toString("base64");
      //   this.setDataValue("description", compressed);
      // },
      // get() {
      //   const value = this.getDataValue("description");
      //   const uncompressed = zlib.inflateSync(Buffer.from(value, "base64"));
      //   return uncompressed;
      // },
    },
    aboutUser: {
      type: DataTypes.VIRTUAL,
      get() {
        return `${this.username} ${this.description}`;
      },
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
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
    // return User.sum("age", { where: { age: 21 } }); // utility function
    // return User.findAll({ raw: true });           // like toJSON()
    // return User.findAll({ where: { age: 25 }, raw: true }); // like toJSON()
    // return User.findByPk(29);          // find by primary key
    // return User.findOne();                // returns the first row
    // return User.findOne({where: {
    //   age: {
    //     [Op.or]: {
    //       [Op.lt]: 28,
    //       [Op.eq]: null
    //     }
    //   }
    // }});                // returns the first row
    // return User.findOrCreate({ where: { username: "Pizza" } });
    // return User.findOrCreate({
    //   where: { username: "Tomm" },
    //   defaults: {
    //     age: 37,
    //   },
    // });
    // return User.findAndCountAll({
    //   where: {
    //     username: "WittCo",
    //   },
    //   raw: true,
    // });
    // return User.findOne();
    // return User.create({
    //   username: "Wire",
    //   password: "sockerpizza",
    //   description: "This is my description it could be really long.",
    // });
    // return User.findOne({ where: { username: "Wire" } });
    // return User.create({
    //   username: "1111",
    //   password: "mypassword",
    //   email: "hello",
    // });
    // const user = User.build({ email: "tom" });
    // return user.validate();
    return User.create({
      username: "mike",
      age: '31fg',
      email: "me@soccer12.org",
    });
  })
  .then((data) => {
    // console.log(data);
    // console.log(data.toJSON());
    // data.forEach((element) => {
    //   console.log(element.toJSON());
    // });
    // const [result, created] = data;
    // console.log(created);
    // const { count, rows } = data;
    // console.log(count, rows);
    // console.log(data.username);
    // console.log(data.password);
    // console.log(data.description);
    // console.log(data.aboutUser);
    // console.log(data.toJSON());
    console.log(data);
  })
  .catch((err) => {
    console.log(err);
  });
