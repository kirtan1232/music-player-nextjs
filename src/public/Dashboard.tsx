import React from 'react';

interface Track {
  isPlaying: boolean;
  title: string;
  artist: string;
  album: string;
  albumImageUrl: string;
  songUrl: string;
}

interface Playlist {
  id: number;
  name: string;
  tracks: number;
}

const Dashboard: React.FC = () => {
  // Mock data for demo purposes
  const nowPlaying: Track = {
    isPlaying: true,
    title: "Dreams",
    artist: "Fleetwood Mac",
    album: "Rumours",
    albumImageUrl: "https://via.placeholder.com/150",
    songUrl: "#",
  };

  const playlists: Playlist[] = [
    { id: 1, name: "Chill Vibes", tracks: 23 },
    { id: 2, name: "Rock Classics", tracks: 15 },
    { id: 3, name: "Pop Hits", tracks: 30 },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans">
      {/* Sidebar */}
      <aside className="fixed top-0 left-0 w-64 h-full bg-gray-800 p-4">
        <h1 className="text-2xl font-bold mb-8">MusicVibe</h1>
        <nav>
          <ul className="space-y-2">
            <li>
              <a href="#" className="flex items-center gap-2 text-gray-300 hover:text-white">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.25a9.75 9.75 0 100 19.5 9.75 9.75 0 000-19.5zM12 21c-4.97 0-9-4.03-9-9s4.03-9 9-9 9 4.03 9 9-4.03 9-9 9zm0-2.25a6.75 6.75 0 100-13.5 6.75 6.75 0 000 13.5z" />
                </svg>
                Home
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center gap-2 text-gray-300 hover:text-white">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 3v18m-6-9h12" />
                </svg>
                Playlists
              </a>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="ml-64 p-6">
        {/* Header */}
        <header className="bg-gray-800 rounded-lg p-4 mb-6">
          <h2 className="text-2xl font-semibold">Welcome Back</h2>
        </header>

        {/* Now Playing Section */}
        <section className="mb-8">
          <h3 className="text-xl font-semibold mb-4">Now Playing</h3>
          {nowPlaying.isPlaying ? (
            <div className="bg-gray-800 p-4 rounded-lg flex items-center gap-4">
              {nowPlaying.albumImageUrl && (
                <img
                  src={nowPlaying.albumImageUrl}
                  alt="Album cover"
                  className="w-20 h-20 rounded"
                />
              )}
              <div>
                <p className="text-lg font-medium">{nowPlaying.title}</p>
                <p className="text-gray-400">{nowPlaying.artist}</p>
                <p className="text-gray-400">{nowPlaying.album}</p>
                <a
                  href={nowPlaying.songUrl}
                  className="text-green-500 hover:underline"
                >
                  Play Now
                </a>
              </div>
            </div>
          ) : (
            <div className="bg-gray-800 p-4 rounded-lg">
              <p className="text-gray-400">No track is currently playing.</p>
            </div>
          )}
        </section>

        {/* Playlists Section */}
        <section>
          <h3 className="text-xl font-semibold mb-4">Your Playlists</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {playlists.map((playlist) => (
              <div
                key={playlist.id}
                className="bg-gray-800 p-4 rounded-lg hover:bg-gray-700 transition"
              >
                <h4 className="font-medium">{playlist.name}</h4>
                <p className="text-gray-400">{playlist.tracks} tracks</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Player Controls */}
      <footer className="fixed bottom-0 left-0 w-full bg-gray-800 p-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <img
            src={nowPlaying.albumImageUrl}
            alt="Album cover"
            className="w-12 h-12 rounded"
          />
          <div>
            <p className="font-medium">{nowPlaying.title}</p>
            <p className="text-gray-400 text-sm">{nowPlaying.artist}</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button className="text-gray-300 hover:text-white">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 18V6l12 6-12 6z" />
            </svg>
          </button>
          <button className="text-gray-300 hover:text-white">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </button>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;