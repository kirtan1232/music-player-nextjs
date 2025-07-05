import SpotifyWebApi from 'spotify-web-api-node';

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  redirectUri: process.env.SPOTIFY_REDIRECT_URI,
});

export async function getAccessToken(refresh_token: string) {
  spotifyApi.setRefreshToken(refresh_token);
  const data = await spotifyApi.refreshAccessToken();
  return data.body.access_token;
}

export async function getNowPlaying(refresh_token: string) {
  const access_token = await getAccessToken(refresh_token);
  spotifyApi.setAccessToken(access_token);
  try {
    const response = await spotifyApi.getMyCurrentPlayingTrack();
    if (response.statusCode === 204 || !response.body.item) {
      return { isPlaying: false };
    }
    return {
      isPlaying: response.body.is_playing,
      title: response.body.item.name,
      artist: response.body.item.artists.map((artist: any) => artist.name).join(', '),
      album: response.body.item.album.name,
      albumImageUrl: response.body.item.album.images[0]?.url,
      songUrl: response.body.item.external_urls.spotify,
    };
  } catch (error) {
    console.error('Error fetching now playing:', error);
    return { isPlaying: false };
  }
}