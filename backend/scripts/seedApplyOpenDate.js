// backend/scripts/seedApplyOpenDate.js
// Run with: node backend/scripts/seedApplyOpenDate.js
// Creates the "apply_open_date" content field admins use to schedule when
// mentee applications open. Safe to run multiple times (skips if it exists).
// NOTE: run backend/scripts/migrateDateSupport.js first so the 'date'
// content_type is available.

const { Content } = require('../models/index');

async function seedApplyOpenDate() {
  try {
    const existing = await Content.findOne({ where: { key: 'apply_open_date' } });

    if (existing) {
      console.log('⏭️  apply_open_date already exists — skipping.');
      process.exit(0);
    }

    await Content.create({
      key: 'apply_open_date',
      title: 'Applications Open Date',
      content_type: 'date',
      value: '', // empty = applications are open right now, no countdown
      section: 'apply',
      page: 'apply',
      description: 'Set a future date/time to show a countdown on the Apply page and block submissions until then. Leave blank to keep applications open.',
    });

    console.log('✅ Created apply_open_date content field.');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seed failed:', error.message);
    process.exit(1);
  }
}

seedApplyOpenDate();
