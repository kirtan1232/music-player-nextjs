import { NextResponse } from 'next/server';
import querystring from 'querystring';

const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
const redirect_uri = process.env.SPOTIFY_REDIRECT_URI;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');

  if (!code) {
    // Redirect to Spotify authorization page
    const scope = 'user-read-currently-playing';
    const authUrl = 'https://accounts.spotify.com/authorize?' + querystring.stringify({
      response_type: 'code',
      client_id,
      scope,
      redirect_uri,
    });
    return NextResponse.redirect(authUrl);
  }

  // Exchange code for access token and refresh token
  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Authorization': 'Basic ' + Buffer.from(`${client_id}:${client_secret}`).toString('base64'),
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: querystring.stringify({
      grant_type: 'authorization_code',
      code,
      redirect_uri,
    }),
  });

  const data = await response.json();
  // Store refresh token securely (e.g., in Clerk user metadata or database)
  // For simplicity, return tokens for now
  return NextResponse.json({
    access_token: data.access_token,
    refresh_token: data.refresh_token,
    expires_in: data.expires_in,
  });
}