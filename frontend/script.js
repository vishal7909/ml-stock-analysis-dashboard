document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("companyForm");
  const result = document.getElementById("result");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    result.innerText = "⏳ Uploading and registering company...";

    const token = ","; // put your actual JWT here
    const logoFile = document.getElementById("company_logo").files[0];
    let logoUrl = "";

    try {
      // 1️⃣ Upload image to Cloudinary (if selected)
      if (logoFile) {
        const formData = new FormData();
        formData.append("image", logoFile);

        const uploadRes = await fetch("http://localhost:5000/api/upload", {
          method: "POST",
          body: formData,
        });

        const uploadData = await uploadRes.json();
        console.log("Upload Response:", uploadData);

        if (uploadData.success) {
          logoUrl = uploadData.url;
        } else {
          result.innerText = "❌ Upload failed.";
          return;
        }
      }

      // 2️⃣ Prepare data for backend
      const data = {
        company_logo_url: logoUrl,
        company_name: document.getElementById("company_name").value,
        industry_type: document.getElementById("industry_type").value,
        headquarter_mail_id: document.getElementById("headquarter_mail_id").value,
        about_company: document.getElementById("about_company").value,
      };

      // 3️⃣ Send data to backend
      const res = await fetch("http://localhost:5000/api/company/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      const resultData = await res.json();
      console.log("Register Response:", resultData);

      if (resultData.success) {
        result.innerText = "✅ Company registered successfully!\n\n" ;
      } else {
        result.innerText = "❌ " + (resultData.message || "Something went wrong.");
      }
    } catch (err) {
      console.error("Frontend Error:", err);
      result.innerText = "⚠️ Error: " + err.message;
    }
  });
});
