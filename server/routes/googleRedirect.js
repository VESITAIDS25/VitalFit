const dotenv = require("dotenv");
const { google } = require("googleapis");
const { OAuth2Client } = require("google-auth-library");
const express = require("express");
const googleApiHelpers = require("../helpers/googleApiHelpers");

const helperMap = {
  "/todayCalories": googleApiHelpers.getTodayCalories,
  "/dayCalories": googleApiHelpers.get12DayCalories,
  "/weekCalories": googleApiHelpers.get12WeekCalories,
  "/todaySteps": googleApiHelpers.getTodaySteps,
  "/12DaySteps": googleApiHelpers.get12DaySteps,
  "/30DaySteps": googleApiHelpers.get30DaySteps,
  "/weekSteps": googleApiHelpers.get12WeekSteps,
};

const scopes = ["https://www.googleapis.com/auth/fitness.activity.read"];

const clientId = process.env.GOOGLE_OAUTH_CLIENT_ID;
const clientSecret = process.env.GOOGLE_OAUTH_CLIENT_SECRET;
const redirectUri = process.env.GOOGLE_OAUTH_REDIRECT_URI;
const oauth2Client = new OAuth2Client(clientId, clientSecret, redirectUri);
const router = express.Router();

router.get("/google-api", async (req, res) => {
  try {
    if (!req.query.code) {
      const url = oauth2Client.generateAuthUrl({
        access_type: "offline",
        scope: scopes,
        state: "/api", // Store destination URL in state
      });
      res.writeHead(301, { Location: url });
    } else {
      const { code, state } = req.query;
      const { tokens } = await oauth2Client.getToken(code);
      oauth2Client.setCredentials(tokens);

      const fitness = google.fitness({ version: "v1", auth: oauth2Client });
      if (state === "/api") {
        const result = await googleApiHelpers.getTodayHeartPoints(fitness);
        return res.json(result);
      } else {
        const result = await helperMap[state](fitness);
        return res.json(result);
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Error processing request");
  }
});

module.exports = router;
