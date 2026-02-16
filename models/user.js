import { DataTypes } from 'sequelize';
import database from '../configs/dbConfig.js';
import bcrypt from 'bcrypt';
import Enrollment from './enrollment.js';

const User = database.define(
  'User',
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      unique: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [3, 20],
          msg: 'name must be 3-20 characters',
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          msg: 'email must be valid',
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [6, 72],
          msg: 'password must be 6-72 characters',
        },
      },
    },
    role: {
      type: DataTypes.ENUM('admin', 'user'),
      defaultValue: 'user',
    },
  },
  {
    tableName: 'users',
    timestamps: true,
    paranoid: true,
    deletedAt: 'deletedAt',
  },
);

//connect to enroll model
User.hasMany(Enrollment, {
  foreignKey: 'userId',
  as: 'enrollments',
  onDelete: 'CASCADE',
});

//hash password before saving
User.beforeSave(async (user) => {
  if (!user.changed('password')) return;
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
});

//compare password
User.prototype.comparePassword = async function (plainPassword) {
  return await bcrypt.compare(plainPassword, this.password);
};

export default User;
