import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const athleteId = 21381937;
  const headers = {
    Accept: "application/json, text/plain, */*",
    "Content-Type": "application/json",
  };

  const body = JSON.stringify({
    client_id: process.env.STRAVA_CLIENT_ID,
    client_secret: process.env.STRAVA_CLIENT_SECRET,
    refresh_token: process.env.STRAVA_REFRESH_TOKEN,
    grant_type: "refresh_token",
  });

  const refreshAccess = await fetch("https://www.strava.com/oauth/token", {
    method: "POST",
    headers,
    body,
  });

  const { access_token } = await refreshAccess.json();

  // stats
  const statsRequest = await fetch(
    `https://www.strava.com/api/v3/athletes/${athleteId}/stats?access_token=` +
      access_token
  );

  const stats = await statsRequest.json();

  // // activities
  // const activitiesRequest = await fetch(
  //   "https://www.strava.com/api/v3/athlete/activities?after=1625702400&per_page=200&access_token=" +
  //     accessJson.access_token
  // );
  // const activities = await activitiesRequest.json();

  // // segments
  // const segmentsRequest = await fetch(
  //   "https://www.strava.com/api/v3/segments/starred?access_token=" +
  //     accessJson.access_token
  // );
  // const segments = await segmentsRequest.json();

  return res.status(200).json({
    // activities,
    stats,
    // segments,
  });
}
