const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const BlogPost = sequelize.define('BlogPost', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  slug: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true,
    comment: 'URL-friendly identifier, e.g. "our-first-cohort-graduates"',
  },
  excerpt: {
    type: DataTypes.TEXT,
    allowNull: true,
    comment: 'Short summary shown on the blog listing page',
  },
  content: {
    type: DataTypes.TEXT('long'),
    allowNull: false,
    comment: 'Full post/newsletter body',
  },
  cover_image: {
    type: DataTypes.STRING(500),
    allowNull: true,
  },
  author: {
    type: DataTypes.STRING(150),
    allowNull: true,
    defaultValue: 'Guiding Stars Team',
  },
  status: {
    type: DataTypes.ENUM('draft', 'published'),
    allowNull: false,
    defaultValue: 'draft',
  },
  published_at: {
    type: DataTypes.DATE,
    allowNull: true,
  },
}, {
  tableName: 'blog_posts',
  timestamps: true,
  underscored: true,
});

module.exports = BlogPost;
