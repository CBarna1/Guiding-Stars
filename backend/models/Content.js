const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Content = sequelize.define('Content', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  key: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true,
    comment: 'Unique identifier for content (e.g., "hero_title", "about_description")',
  },
  title: {
    type: DataTypes.STRING(255),
    allowNull: true,
    comment: 'Human-readable title for admin UI',
  },
  content_type: {
    type: DataTypes.ENUM('text', 'textarea', 'image', 'video', 'json', 'date'),
    defaultValue: 'textarea',
    comment: 'Type of content for rendering appropriate form input',
  },
  value: {
    type: DataTypes.TEXT('long'),
    allowNull: true,
    comment: 'The actual content value',
  },
  section: {
    type: DataTypes.STRING(50),
    allowNull: true,
    comment: 'Section grouping (e.g., "hero", "about", "testimonials")',
  },
  page: {
    type: DataTypes.STRING(50),
    allowNull: true,
    comment: 'Page where content is used (e.g., "home", "about", "team")',
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
    comment: 'Help text explaining this content to admin',
  },
}, {
  tableName: 'content_management',
  timestamps: true,
  underscored: true,
});

Content.associate = (models) => {
  // No associations needed for now
};

module.exports = Content;
