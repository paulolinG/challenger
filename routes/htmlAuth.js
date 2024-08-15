const express = require("express");
const router = express.Router();
const dotenv = require("dotenv");
require("dotenv").config();
const { OAuth2Client } = require("google-auth-library");

router.post("/", async (req, res, next) => {
  const credential = req.body.credential; // Changed from req.params to req.body
  console.log("Credential", credential);

  const csrfToken = req.cookies["g_csrf_token"];
  console.log("CSRF Token", csrfToken);

  // Verify CSRF token
  if (req.body["g_csrf_token"] !== csrfToken) {
    return res.status(400).json({ error: "Invalid CSRF token" });
  }

  console.log("Token", token);

  const client = new OAuth2Client(process.env.CLIENT_ID);

  async function verify() {
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.CLIENT_ID, // Specify the CLIENT_ID of the app that accesses the backend
      // Or, if multiple clients access the backend:
      //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
    });
    const payload = ticket.getPayload();
    const userid = payload["sub"];
    console.log("payload", payload);
    console.log("userid", userid);
    return payload;
    // If request specified a G Suite domain:
    // const domain = payload['hd'];
  }
  try {
    const payload = await verify();

    // Create a JWT
    const token = jwt.sign(
      {
        userId: payload["sub"],
        email: payload["email"],
        name: payload["name"],
      },
      JWT_SECRET,
      { expiresIn: "1h" } // Token expires in 1 hour
    );

    res.json({
      success: true,
      message: "Authentication successful",
      token: token,
    });
  } catch (error) {
    console.error("Error during verification:", error);
    res.status(401).json({ success: false, message: "Authentication failed" });
  }
});

module.exports = router;
