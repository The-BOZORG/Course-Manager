import User from './user.js';
import Token from './token.js';
import Course from './course.js';
import Enrollment from './enrollment.js';

// Course ↔ Enrollment
Course.hasMany(Enrollment, {
  foreignKey: 'courseId',
  as: 'enrollments',
  onDelete: 'CASCADE',
});

Enrollment.belongsTo(Course, {
  foreignKey: 'courseId',
  as: 'course',
});

// User ↔ Enrollment
User.hasMany(Enrollment, {
  foreignKey: 'userId',
  as: 'enrollments',
  onDelete: 'CASCADE',
});

Enrollment.belongsTo(User, {
  foreignKey: 'userId',
  as: 'user',
});

// User ↔ Token
User.hasMany(Token, {
  foreignKey: 'userId',
  as: 'refreshTokens',
  onDelete: 'CASCADE',
});

Token.belongsTo(User, {
  foreignKey: 'userId',
  as: 'user',
});

export { User, Token, Course, Enrollment };
