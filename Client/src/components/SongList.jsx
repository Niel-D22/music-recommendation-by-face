import { RiPlayCircleFill, RiMusic2Line } from "react-icons/ri";

export default function SongList({ songs, activeSongIndex, onSelect }) {
  if (!songs.length) {
    return (
      <div className="flex flex-col items-center justify-center h-52 text-zinc-400 gap-3">
        <div className="w-12 h-12 rounded-2xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center">
          <RiMusic2Line size={22} className="text-zinc-400" />
        </div>
        <p className="text-sm text-center text-zinc-400 dark:text-zinc-500">
          Rekomendasi muncul setelah
          <br />
          emosi terdeteksi
        </p>
      </div>
    );
  }

  return (
    <ul className="space-y-1">
      {songs.map((song, i) => {
        const isActive = i === activeSongIndex;
        return (
          <li
            key={i}
            onClick={() => onSelect(i)}
            className={`group flex items-center gap-3 px-3.5 py-2.5 rounded-xl cursor-pointer transition-all duration-150
              ${
                isActive
                  ? "bg-zinc-900 dark:bg-white"
                  : "hover:bg-zinc-50 dark:hover:bg-zinc-800/60"
              }`}
          >
            {/* Play / Number */}
            <div
              className={`w-6 flex items-center justify-center shrink-0 ${isActive ? "text-white dark:text-zinc-900" : "text-zinc-400"}`}
            >
              {isActive ? (
                <RiPlayCircleFill size={18} />
              ) : (
                <span className="text-[11px] font-mono group-hover:hidden">
                  {i + 1}
                </span>
              )}
              {!isActive && (
                <RiPlayCircleFill
                  size={16}
                  className="hidden group-hover:block text-zinc-400"
                />
              )}
            </div>

            {/* Song info */}
            <div className="flex-1 min-w-0">
              <p
                className={`text-[13.5px] font-medium truncate ${isActive ? "text-white dark:text-zinc-900" : "text-zinc-800 dark:text-zinc-200"}`}
              >
                {song.name}
              </p>
              <p
                className={`text-xs truncate ${isActive ? "text-zinc-300 dark:text-zinc-600" : "text-zinc-400"}`}
              >
                {song.artist}
              </p>
            </div>

            {/* Score */}
            <span
              className={`text-[11px] font-mono shrink-0 tabular-nums ${isActive ? "text-zinc-300 dark:text-zinc-600" : "text-zinc-400"}`}
            >
              {(song.score * 100).toFixed(0)}%
            </span>
          </li>
        );
      })}
    </ul>
  );
}
