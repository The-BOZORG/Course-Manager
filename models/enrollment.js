const { DataTypes } = require('sequelize');
import database from '../configs/dbConfig.js';
import Course from './course.js';
import User from './user.js';

const Enrollment = database.define(
  'Enrollment',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },

    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    courseId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    paymentStatus: {
      type: DataTypes.ENUM('pending', 'paid', 'failed'),
      defaultValue: 'pending',
    },

    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: 'enrollments',
    timestamps: true,
    indexes: [
      {
        unique: true,
        fields: ['userId', 'courseId'],
      },
    ],
  },
);

//connect to course model
Enrollment.belongsTo(Course, {
  foreignKey: 'courseId',
  as: 'course',
});

Enrollment.belongsTo(User, {
  foreignKey: 'userId',
  as: 'user',
});

export default Enrollment;
