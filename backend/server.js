// server.js
import express from "express";
import pool from "./db.js";
import cors from "cors";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import {upload} from "./upload.js";


dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Load JWT Secret from .env or fallback
const JWT_SECRET = process.env.JWT_SECRET || "supersecretdevkey";

// -------------------------------------------
// 🧠 Middleware: Verify JWT Token
// -------------------------------------------
function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ success: false, message: "No token provided" });
  }

  const token = authHeader.split(" ")[1]; // Expecting "Bearer <token>"

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ success: false, message: "Invalid or expired token" });
    }

    req.user = decoded; // attach user info to request
    next();
  });
}

// -------------------------------------------
// 🧾 Auth: Register User
// -------------------------------------------
app.post("/api/auth/register", async (req, res) => {
  try {
    const { full_name, email, password, gender, mobile_no } = req.body;

    if (!full_name || !email || !password || !gender || !mobile_no) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    // check existing user
    const existing = await pool.query("SELECT * FROM users WHERE email=$1", [email]);
    if (existing.rows.length > 0) {
      return res.status(400).json({ success: false, message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await pool.query(
      `INSERT INTO users (email, password, full_name, gender, mobile_no, signup_type)
       VALUES ($1,$2,$3,$4,$5,'e')`,
      [email, hashedPassword, full_name, gender, mobile_no]
    );

    res.json({ success: true, message: "User registered successfully" });
  } catch (err) {
    console.error("❌ Register Error:", err.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// -------------------------------------------
// 🔐 Auth: Login User
// -------------------------------------------
app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await pool.query("SELECT * FROM users WHERE email=$1", [email]);

    if (result.rows.length === 0) {
      return res.status(400).json({ success: false, message: "Invalid email" });
    }

    const user = result.rows[0];
    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(400).json({ success: false, message: "Invalid password" });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      JWT_SECRET,
      { expiresIn: "90d" }
    );

    res.json({ success: true, message: "Login successful", token });
  } catch (err) {
    console.error("❌ Login Error:", err.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// -------------------------------------------
// 🏢 Company: Register Company (Protected)
// -------------------------------------------
// 🏢 Register Company API (Protected)
app.post("/api/company/register", verifyToken, async (req, res) => {
  try {
    const {
      company_logo_url,
      company_banner_url,
      company_name,
      about_company,
      organizations_type,
      industry_type,
      team_size,
      year_of_establishment,
      company_website,
      company_app_link,
      company_vision,
      headquarter_phone_no,
      social_links,
      map_location_url,
      careers_link,
      headquarter_mail_id
    } = req.body;

    // Basic validation
    if (!company_name || !industry_type || !headquarter_mail_id) {
      return res.status(400).json({ success: false, message: "Please fill all required fields (company_name, industry_type, headquarter_mail_id)" });
    }

    const owner_id = req.user.id; // from token

    // Insert into company_profile
    await pool.query(
      `INSERT INTO company_profile (
        company_logo_url,
        company_banner_url,
        company_name,
        about_company,
        organizations_type,
        industry_type,
        team_size,
        year_of_establishment,
        company_website,
        company_app_link,
        company_vision,
        headquarter_phone_no,
        social_links,
        map_location_url,
        careers_link,
        owner_id,
        is_claimed,
        headquarter_mail_id
      )
      VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11,
        $12, $13, $14, $15, $16, false, $17
      )`,
      [
        company_logo_url,
        company_banner_url,
        company_name,
        about_company,
        organizations_type,
        industry_type,
        team_size,
        year_of_establishment,
        company_website,
        company_app_link,
        company_vision,
        headquarter_phone_no,
        social_links,
        map_location_url,
        careers_link,
        owner_id,
        headquarter_mail_id
      ]
    );

    res.json({ success: true, message: "Company registered successfully" });
  } catch (err) {
    console.error("❌ Company Register Error:", err.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
});


// -------------------------------------------
// 🧾 Company: Get Profile (Protected)
// -------------------------------------------
app.get("/api/company/profile", verifyToken, async (req, res) => {
  try {
    const owner_id = req.user.id;
    const result = await pool.query(
      "SELECT * FROM company_profile WHERE owner_id=$1",
      [owner_id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: "No company profile found" });
    }

    res.json({ success: true, data: result.rows[0] });
  } catch (err) {
    console.error("❌ Company Profile Error:", err.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// -------------------------------------------
// 🚀 Server Start
// -------------------------------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));

// 🌤️ Upload image to Cloudinary
app.post("/api/upload", upload.single("image"), (req, res) => {
  try {
    res.json({
      success: true,
      url: req.file.path, 
    });
  } catch (err) {
    console.error("❌ Upload error:", err.message);
    res.status(500).json({ success: false, message: "Upload failed" });
  }
});

