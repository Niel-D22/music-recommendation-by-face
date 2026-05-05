import { useState, useEffect } from "react";
import { RiMusic2Line, RiLoaderLine } from "react-icons/ri";

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

  const matchPct = (song.score * 100).toFixed(0);

  return (
    <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 overflow-hidden shadow-sm">
      {/* Header info */}
      <div className="px-5 py-4 border-b border-zinc-100 dark:border-zinc-800">
        <p className="text-[11px] uppercase tracking-widest text-zinc-400 font-medium mb-3">
          Sedang Diputar
        </p>
        <div className="flex items-center gap-3">
          <div className="shrink-0 w-11 h-11 rounded-xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center">
            <RiMusic2Line size={20} className="text-zinc-500 dark:text-zinc-400" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="font-semibold text-[14.5px] text-zinc-900 dark:text-white truncate">
              {song.name}
            </p>
            <p className="text-sm text-zinc-400 truncate">{song.artist}</p>
          </div>
          <div className="shrink-0 text-right">
            <p className="text-xs font-mono font-semibold text-zinc-700 dark:text-zinc-300">
              {matchPct}%
            </p>
            <p className="text-[10px] text-zinc-400">cocok</p>
          </div>
        </div>

        {/* Match progress bar */}
        <div className="mt-4 h-1 rounded-full bg-zinc-100 dark:bg-zinc-800 overflow-hidden">
          <div
            className="h-full rounded-full bg-zinc-900 dark:bg-white transition-all duration-700"
            style={{ width: `${matchPct}%` }}
          />
        </div>
      </div>

      {/* YouTube embed */}
      <div className="aspect-video w-full bg-zinc-950">
        {videoId ? (
          <iframe
            key={videoId}
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
            allow="autoplay; encrypted-media"
            allowFullScreen
            className="w-full h-full"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center gap-2.5">
            <RiLoaderLine size={22} className="animate-spin text-zinc-500" />
            <p className="text-xs text-zinc-500">Memuat video...</p>
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
      `/youtube-id?q=${encodeURIComponent(trackName + " " + artist)}`
    );
    const data = await res.json();
    return data.videoId ?? null;
  } catch {
    return null;
  }
}