import { useRef, useState, useEffect } from "react";
import { useEmotionDetector } from "../hook/useEmotionDetector";
import { fetchRecommendations } from "../services/api";
import CameraView from "../components/CameraView";
import EmotionBadge from "../components/EmotionBadge";
import SongList from "../components/SongList";
import Player from "../components/Player";
import { RiLoaderLine } from "react-icons/ri";

export default function AppPage() {
  const videoRef = useRef(null);
  const { emotion, isReady, isLoading } = useEmotionDetector(videoRef);
  const [songs, setSongs] = useState([]);
  const [activeSongIndex, setActiveSongIndex] = useState(0);
  const [isFetching, setIsFetching] = useState(false);

  // Setiap emosi berubah → fetch rekomendasi baru
  useEffect(() => {
    if (!emotion) return;
    setIsFetching(true);
    fetchRecommendations(emotion)
      .then((data) => {
        setSongs(data);
        setActiveSongIndex(0);
      })
      .catch(console.error)
      .finally(() => setIsFetching(false));
  }, [emotion]);

  return (
    <div className="max-w-5xl mx-auto px-6 py-10 space-y-8">
      {/* Header */}
      <div className="border-b border-zinc-100 dark:border-zinc-800 pb-6">
        <h1 className="text-xl font-bold text-zinc-900 dark:text-white">
          Deteksi Emosi
        </h1>
        <p className="text-sm text-zinc-400 mt-1">
          Sistem mendeteksi emosi Anda setiap 3 detik secara otomatis.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Kolom kiri: kamera + status + player */}
        <div className="space-y-4">
          <CameraView videoRef={videoRef} />
          <EmotionBadge emotion={emotion} isLoading={isLoading} />
          <Player song={songs[activeSongIndex]} />
        </div>

        {/* Kolom kanan: daftar rekomendasi */}
        <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm">
          <div className="flex items-center justify-between px-5 py-4 border-b border-zinc-100 dark:border-zinc-800">
            <div>
              <h2 className="font-semibold text-[14px] text-zinc-900 dark:text-white">
                10 Rekomendasi Lagu
              </h2>
              <p className="text-[11.5px] text-zinc-400 mt-0.5">
                Berdasarkan emosi yang terdeteksi
              </p>
            </div>
            {isFetching && (
              <span className="flex items-center gap-1.5 text-[11.5px] text-zinc-400">
                <RiLoaderLine size={13} className="animate-spin" />
                Memperbarui
              </span>
            )}
          </div>
          <div className="p-3">
            <SongList
              songs={songs}
              activeSongIndex={activeSongIndex}
              onSelect={setActiveSongIndex}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
