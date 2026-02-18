import User from './user.js';
import Token from './token.js';
import Course from './course.js';

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

// User ↔ Course
User.hasMany(Course, {
  foreignKey: 'instructorId',
  as: 'courses',
  onDelete: 'CASCADE',
});

Course.belongsTo(User, {
  foreignKey: 'instructorId',
  as: 'instructor',
});

export { User, Token, Course };
