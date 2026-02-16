import { DataTypes } from 'sequelize';
import database from '../configs/dbConfig.js';

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

export default Enrollment;
