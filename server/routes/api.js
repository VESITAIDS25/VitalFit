const { google } = require("googleapis");
const fs = require("fs");
const { OAuth2Client } = require("google-auth-library");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const express = require("express");
const {
  getTodayCalories,
  get12DayCalories,
  get12DaySteps,
} = require("../helpers/googleApiHelpers");
const router = express.Router();

const scopes = ["https://www.googleapis.com/auth/fitness.activity.read"];
const now = Date.now();
const oneWeekAgo = now - 7 * 24 * 60 * 60 * 1000;

const clientId = process.env.GOOGLE_OAUTH_CLIENT_ID;
const clientSecret = process.env.GOOGLE_OAUTH_CLIENT_SECRET;
const redirectUri = process.env.GOOGLE_OAUTH_REDIRECT_URI;
const oauth2Client = new OAuth2Client(clientId, clientSecret, redirectUri);

router.get("/google-api", async (req, res) => {
  try {
    if (!req.query.code) {
      const url = oauth2Client.generateAuthUrl({
        access_type: "offline",
        scope: scopes,
        state: "/api", // Store destination URL in state
      });
      res.redirect(url);
    } else {
      const { code, state } = req.query;
      if (state !== "/api") {
        return res.status(400).send("Invalid state parameter");
      }

      const { tokens } = await oauth2Client.getToken(code);
      oauth2Client.setCredentials(tokens);

      const fitness = google.fitness({ version: "v1", auth: oauth2Client });

      const result = await get12DaySteps(fitness);
      return res.json(result);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Error processing request");
  }
});

module.exports = router;
