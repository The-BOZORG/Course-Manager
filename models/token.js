import { DataTypes } from 'sequelize';
import database from '../configs/dbConfig.js';
import User from './user.js';

const RefreshToken = database.define(
  'RefreshToken',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    refreshToken: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    ip: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    userAgent: {
      type: DataTypes.STRING(500),
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
  },
  {
    tableName: 'refresh_tokens',
    timestamps: true,
    paranoid: true,
  },
);

//connect to user model
User.hasMany(RefreshToken, {
  foreignKey: 'userId',
  as: 'refreshTokens',
  onDelete: 'CASCADE',
});

RefreshToken.belongsTo(User, {
  foreignKey: 'userId',
  as: 'user',
});

export default RefreshToken;
