import { useState, useEffect } from "react";

export default function Player({ song }) {
  const [videoId, setVideoId] = useState(null);

  useEffect(() => {
    if (!song) return;
    setVideoId(null);

    // Ambil videoId dari YouTube Data API
    const query = encodeURIComponent(`${song.name} ${song.artist}`);
    fetch(`https://www.youtube.com/results?search_query=${query}`);

    // Pakai YouTube oEmbed trick — cari videoId dari search
    fetchYoutubeId(song.name, song.artist).then(setVideoId);
  }, [song]);

  if (!song) return null;

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 p-5 text-white shadow-lg">
      <div className="absolute -top-6 -right-6 w-28 h-28 rounded-full bg-white/10" />
      <div className="absolute -bottom-8 -left-4 w-36 h-36 rounded-full bg-white/5" />

      <div className="relative space-y-4">
        <p className="text-xs font-medium text-brand-100 uppercase tracking-widest">
          Sedang Diputar
        </p>

        <div className="flex items-center gap-3">
          <div className="shrink-0 w-12 h-12 rounded-xl bg-white/20 backdrop-blur flex items-center justify-center text-2xl">
            🎵
          </div>
          <div className="min-w-0">
            <p className="font-bold text-base truncate">{song.name}</p>
            <p className="text-sm text-brand-100 truncate">{song.artist}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex-1 h-1.5 rounded-full bg-white/20">
            <div
              className="h-1.5 rounded-full bg-white transition-all duration-500"
              style={{ width: `${(song.score * 100).toFixed(0)}%` }}
            />
          </div>
          <span className="text-xs font-mono text-brand-100">
            {(song.score * 100).toFixed(0)}% cocok
          </span>
        </div>

        {/* YouTube Embed */}
        {videoId ? (
          <div className="rounded-xl overflow-hidden aspect-video w-full">
            <iframe
              key={videoId}
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
              allow="autoplay; encrypted-media"
              allowFullScreen
              className="w-full h-full"
            />
          </div>
        ) : (
          <div className="rounded-xl bg-white/10 aspect-video w-full flex items-center justify-center text-sm text-brand-100">
            Memuat video...
          </div>
        )}
      </div>
    </div>
  );
}

// Ambil videoId via backend proxy (hindari CORS)
async function fetchYoutubeId(trackName, artist) {
  try {
    const res = await fetch(
      `/youtube-id?q=${encodeURIComponent(trackName + " " + artist)}`,
    );
    const data = await res.json();
    return data.videoId ?? null;
  } catch {
    return null;
  }
}
