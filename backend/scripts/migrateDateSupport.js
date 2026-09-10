// backend/scripts/migrateDateSupport.js
// Run with: node backend/scripts/migrateDateSupport.js
// This script updates the Content model to support the 'date' content type
// (used for admin-controlled dates, e.g. when mentee applications open)

const { sequelize } = require('../config/db');

async function migrateDateSupport() {
  try {
    console.log('🔄 Starting migration to add date support...\n');

    const queryInterface = sequelize.getQueryInterface();
    const dbName = sequelize.config.database;

    console.log(`📊 Database: ${dbName}`);
    console.log('🔧 Operation: Updating content_type ENUM to include "date"\n');

    const sql = `
      ALTER TABLE content_management
      MODIFY COLUMN content_type ENUM('text', 'textarea', 'image', 'video', 'json', 'date')
      DEFAULT 'textarea';
    `;

    await sequelize.query(sql);

    console.log('✅ Migration successful!');
    console.log('📝 Updated ENUM values: text, textarea, image, video, json, date');
    console.log('\n✨ Date content type is now supported in the database!');

    const result = await sequelize.query(`
      SELECT COLUMN_TYPE
      FROM INFORMATION_SCHEMA.COLUMNS
      WHERE TABLE_NAME = 'content_management'
      AND COLUMN_NAME = 'content_type'
      AND TABLE_SCHEMA = ?
    `, { replacements: [dbName], type: sequelize.QueryTypes.SELECT });

    if (result.length > 0) {
      console.log(`\n✅ Verification - Current ENUM: ${result[0].COLUMN_TYPE}`);
    }

    process.exit(0);
  } catch (error) {
    console.error('❌ Migration failed:', error.message);
    console.error('\nTroubleshooting:');
    console.error('- Ensure the database connection is working');
    console.error('- Ensure the content_management table exists');
    console.error('- Try running: node backend/server.js (to initialize tables)');
    process.exit(1);
  }
}

migrateDateSupport();
