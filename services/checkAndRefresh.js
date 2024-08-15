const UserToken = require("../models/userToken");

async function checkAndRefreshToken(userId) {
  const userToken = await UserToken.findOne({ userId });
  if (!userToken) {
    throw new Error("User tokens not found");
  }

  const oAuth2Client = new OAuth2Client(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    process.env.BACKEND
  );

  oAuth2Client.setCredentials(userToken.tokens);

  // Check if the access token is expired or will expire soon
  if (oAuth2Client.isTokenExpiring()) {
    try {
      const { credentials } = await oAuth2Client.refreshAccessToken();
      await UserToken.findOneAndUpdate({ userId }, { tokens: credentials });
      console.log("Token refreshed successfully");
      return oAuth2Client;
    } catch (error) {
      console.error("Error refreshing token:", error);
      throw error;
    }
  }

  return oAuth2Client;
}

module.exports = checkAndRefreshToken;
