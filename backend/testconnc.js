// test_connection.js
import pool from './db.js';

(async () => {
  try {
    const res = await pool.query('SELECT COUNT(*) FROM users;');
    console.log('✅ Connected successfully!');
    console.log(`There are ${res.rows[0].count} users in the database.`);
  } catch (err) {
    console.error('❌ Connection failed:', err);
  } finally {
    await pool.end();
  }
})();
