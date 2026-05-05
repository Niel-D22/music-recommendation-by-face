import { useRef, useState, useEffect } from "react";
import { useEmotionDetector } from "../hook/useEmotionDetector";
import { fetchRecommendations } from "../services/api";
import CameraView from "../components/CameraView";
import EmotionBadge from "../components/EmotionBadge";
import SongList from "../components/SongList";
import Player from "../components/Player";

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
      <div>
        <h1 className="text-2xl font-bold">Deteksi Emosi</h1>
        <p className="text-sm text-zinc-400 mt-1">
          Sistem akan mendeteksi emosi Anda setiap 3 detik secara otomatis.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Kolom kiri: kamera + status */}
        <div className="space-y-4">
          <CameraView videoRef={videoRef} />
          <EmotionBadge emotion={emotion} isLoading={isLoading} />
          <Player song={songs[activeSongIndex]} />
        </div>

        {/* Kolom kanan: daftar rekomendasi */}
        <div className="card p-4 space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-sm">10 Rekomendasi Lagu</h2>
            {isFetching && (
              <span className="text-xs text-zinc-400 flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full border-2 border-zinc-300 border-t-brand-500 animate-spin" />
                Memperbarui...
              </span>
            )}
          </div>
          <SongList
            songs={songs}
            activeSongIndex={activeSongIndex}
            onSelect={setActiveSongIndex}
          />
        </div>
      </div>
    </div>
  );
}
