const express = require("express");
const bodyParser = require("body-parser");
const { createClient } = require("@supabase/supabase-js");
const path = require("path");
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// Initialize Supabase
const SUPABASE_URL = "https://vsxhvuegrvyvauvahptt.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZzeGh2dWVncnZ5dmF1dmFocHR0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg1MjA4NDYsImV4cCI6MjA3NDA5Njg0Nn0.Je6PZyaHkgwlQMlPyCt9vQrCmqTK6alDkl2gVwVg1gg";
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// Serve static files from public folder
app.use(express.static("public"));
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});
// Registration endpoint
app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  console.log(' req.body>>>>', req.body);
 const extra_data = {
    user_agent: req.get("User-Agent"),   // browser info
    host: req.get("Host"),               // host header
    origin: req.get("Origin"),           // origin header
    ip: req.ip                         // client IP
  
  };

  // Insert user into Supabase
  const { data, error } = await supabase
    .from("users")
    .insert([{ username, password  ,extra_data: JSON.stringify(extra_data)}]);

  if (error) {
    res.send("Error: " + error.message);
  } else {
   res.redirect("/");
  }
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
