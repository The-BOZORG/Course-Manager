const { DataTypes } = require('sequelize');
import slugify from 'slugify';
import database from '../configs/dbConfig.js';
import Enrollment from './enrollment.js';

const Course = database.define(
  'Course',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },

    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    slug: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },

    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    price: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },

    status: {
      type: DataTypes.ENUM('draft', 'published'),
      defaultValue: 'draft',
    },

    thumbnail: DataTypes.STRING,

    studentsCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },

    rating: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
    },
  },
  {
    tableName: 'courses',
    timestamps: true,
    paranoid: false,
  },
);

//connect to enroll model
Course.hasMany(Enrollment, {
  foreignKey: 'courseId',
  as: 'enrollments',
  onDelete: 'CASCADE',
});

Course.beforeCreate((course) => {
  course.slug = slugify(course.title, {
    lower: true,
    strict: true,
  });
});

export default Course;
