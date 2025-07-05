import React from 'react';
import { getNowPlaying } from '../lib/spotify';
import { SignedIn } from '@clerk/nextjs';

export default async function Dashboard() {
  // For demo, hardcode refresh token (in production, store securely and fetch from user metadata)
  const refresh_token = 'your-refresh-token'; // Replace with actual refresh token
  const nowPlaying = await getNowPlaying(refresh_token);

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-600 text-white p-4">
        <h1 className="text-2xl font-bold">Music Dashboard</h1>
      </header>
      <main className="p-6">
        <SignedIn>
          <a
            href="/api/spotify-auth"
            className="mb-4 inline-block bg-green-500 text-white rounded-full px-4 py-2"
          >
            Connect Spotify
          </a>
          {nowPlaying.isPlaying ? (
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h2 className="text-lg font-semibold">Now Playing</h2>
              <div className="flex items-center gap-4">
                {nowPlaying.albumImageUrl && (
                  <img
                    src={nowPlaying.albumImageUrl}
                    alt="Album cover"
                    className="w-16 h-16 rounded"
                  />
                )}
                <div>
                  <p className="font-medium">{nowPlaying.title}</p>
                  <p className="text-gray-600">{nowPlaying.artist}</p>
                  <p className="text-gray-600">{nowPlaying.album}</p>
                  <a
                    href={nowPlaying.songUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    Listen on Spotify
                  </a>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white p-4 rounded-lg shadow-md">
              <p className="text-gray-600">No track is currently playing.</p>
            </div>
          )}
        </SignedIn>
      </main>
    </div>
  );
}