// db.js
import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'company_db',
  password: '7909', 
  port: 5432, 
})
export default pool;
