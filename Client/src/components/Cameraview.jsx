import { useEffect } from "react";
import { RiLiveLine } from "react-icons/ri";

export default function CameraView({ videoRef }) {
  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        if (videoRef.current) videoRef.current.srcObject = stream;
      })
      .catch(() =>
        alert("Akses kamera ditolak. Mohon izinkan kamera di browser Anda."),
      );
  }, [videoRef]);

  return (
    <div className="relative rounded-2xl overflow-hidden bg-zinc-100 dark:bg-zinc-900 aspect-video border border-zinc-200 dark:border-zinc-800 shadow-sm">
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        className="w-full h-full object-cover"
      />

      {/* Overlay vignette */}
      <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-black/10 dark:ring-white/5 pointer-events-none" />

      {/* Live badge */}
      <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-black/60 backdrop-blur-md text-white text-[11px] font-semibold px-2.5 py-1 rounded-full tracking-wide">
        <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
        LIVE
      </div>
    </div>
  );
}
