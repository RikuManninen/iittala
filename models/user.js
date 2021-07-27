const bcrypt = require("bcrypt");
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  User.init({
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    encryptedPassword: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });

  // This is a class method, it is not called on an individual
  // user object, but rather the class as a whole.
  // e.g. User.authenticate('user1', 'password1234')
  User.authenticate = async (email, password) => {

    const user = await User.findOne({ where: { email: email } });

    // bcrypt is a one-way hashing algorithm that allows us to 
    // store strings on the database rather than the raw
    // passwords. Check out the docs for more detail
    if (bcrypt.compareSync(password, user.encryptedPassword)) {
      return user
    }
  }

  return User;
};