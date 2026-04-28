import pkg from "pg";
const { Pool } = pkg;

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "company_db",
  password: "7909",
  port: 5432,
});

(async () => {
  try {
    const result = await pool.query("SELECT id, company_name, industry_type, headquarter_mail_id FROM company_profile;");
    console.log("📋 Registered Companies:");
    console.table(result.rows);
  } catch (err) {
    console.error("❌ Error fetching data:", err.message);
  } finally {
    pool.end();
  }
})();
