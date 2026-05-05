import { useEffect } from "react";

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
    <div className="relative rounded-2xl overflow-hidden bg-zinc-100 dark:bg-zinc-800 aspect-video">
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        className="w-full h-full object-cover"
      />
      {/* Live indicator */}
      <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-black/50 backdrop-blur-sm text-white text-xs px-2.5 py-1 rounded-full">
        <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
        LIVE
      </div>
    </div>
  );
}
