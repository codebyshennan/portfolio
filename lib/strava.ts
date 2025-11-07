export async function getStravaStats() {
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
      access_token,
    { next: { revalidate: 3600 } } // Revalidate every hour
  );

  const stats = await statsRequest.json();

  return { stats };
}











