export default function SongList({ songs, activeSongIndex, onSelect }) {
  if (!songs.length) {
    return (
      <div className="flex flex-col items-center justify-center h-48 text-zinc-400 text-sm gap-2">
        <span className="text-3xl">🎵</span>
        <p>Rekomendasi muncul setelah emosi terdeteksi</p>
      </div>
    );
  }

  return (
    <ul className="space-y-1.5">
      {songs.map((song, i) => (
        <li
          key={i}
          onClick={() => onSelect(i)}
          className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all
            ${
              i === activeSongIndex
                ? "bg-brand-50 dark:bg-brand-900/30 border border-brand-200 dark:border-brand-800"
                : "hover:bg-zinc-50 dark:hover:bg-zinc-800/60 border border-transparent"
            }`}
        >
          {/* Nomor / icon play */}
          <span
            className={`text-xs w-5 text-center font-mono shrink-0
            ${i === activeSongIndex ? "text-brand-500" : "text-zinc-400"}`}
          >
            {i === activeSongIndex ? "▶" : i + 1}
          </span>

          {/* Info lagu */}
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">{song.name}</p>
            <p className="text-xs text-zinc-400 truncate">{song.artist}</p>
          </div>

          {/* Skor similarity */}
          <span className="text-xs text-zinc-400 shrink-0 font-mono">
            {(song.score * 100).toFixed(0)}%
          </span>
        </li>
      ))}
    </ul>
  );
}
