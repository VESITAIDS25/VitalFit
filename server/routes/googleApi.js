const express = require("express");
const { google } = require("googleapis");
const { OAuth2Client } = require("google-auth-library");
const {
  getTodayCalories,
  get12DayCalories,
  get12DaySteps,
  get30DaySteps,
  get12WeekCalories,
  getTodaySteps,
  get12WeekSteps,
} = require("../helpers/googleApiHelpers");

const scopes = ["https://www.googleapis.com/auth/fitness.activity.read"];
const clientId = process.env.GOOGLE_OAUTH_CLIENT_ID;
const clientSecret = process.env.GOOGLE_OAUTH_CLIENT_SECRET;
const redirectUri = process.env.GOOGLE_OAUTH_REDIRECT_URI;
const oauth2Client = new OAuth2Client(clientId, clientSecret, redirectUri);
const router = express.Router();

const makeApiCall = async (req, res) => {
  try {
    if (!req.query.code) {
      const url = oauth2Client.generateAuthUrl({
        access_type: "offline",
        scope: scopes,
        state: req.route.path, // Store destination URL in state
      });
      res.redirect(url);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Error processing request");
  }
};
router.get("/todayCalories", makeApiCall);

router.get("/dayCalories", makeApiCall);

router.get("/weekCalories", makeApiCall);

router.get("/todaySteps", makeApiCall);

router.get("/12DaySteps", makeApiCall);

router.get("/30DaySteps", makeApiCall);

router.get("/weekSteps", makeApiCall);

module.exports = router;
