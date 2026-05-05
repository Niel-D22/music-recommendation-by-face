import { Link } from "react-router-dom";
import {
  RiCameraLine,
  RiShieldCheckLine,
  RiSparklingLine,
  RiArrowRightLine,
} from "react-icons/ri";

const features = [
  {
    icon: <RiCameraLine size={20} />,
    title: "Deteksi Emosi Real-Time",
    desc: "Face-API.js mendeteksi ekspresi wajah langsung di browser tanpa mengirim data ke server.",
  },
  {
    icon: <RiSparklingLine size={20} />,
    title: "Rekomendasi Adaptif",
    desc: "Algoritma Cosine Similarity mencocokkan emosi Anda dengan ribuan lagu dari dataset Spotify.",
  },
  {
    icon: <RiShieldCheckLine size={20} />,
    title: "Privasi Terjamin",
    desc: "Semua komputasi berjalan di sisi klien. Wajah Anda tidak pernah dikirim ke server.",
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-[calc(100vh-60px)] flex flex-col">
      {/* Hero */}
      <section className="flex-1 flex flex-col items-center justify-center text-center px-6 py-24 max-w-4xl mx-auto w-full">
        {/* Pill badge */}
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 text-[12.5px] font-medium mb-8 border border-zinc-200 dark:border-zinc-700">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          Berbasis Kecerdasan Buatan
        </span>

        <h1 className="text-5xl sm:text-6xl font-bold leading-[1.1] tracking-tight text-zinc-900 dark:text-white mb-6">
          Musik yang menyesuaikan
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-black/100 via-black/50 to-black/100">
            suasana hati Anda
          </span>
        </h1>

        <p className="text-zinc-500 dark:text-zinc-400 text-[17px] max-w-lg mx-auto leading-relaxed mb-10">
          Sistem rekomendasi musik adaptif berbasis pengenalan emosi real-time.
          Biarkan ekspresi wajah Anda yang memilih lagu.
        </p>

        <div className="flex items-center gap-3">
          <Link
            to="/app"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-sm font-semibold hover:opacity-90 transition-opacity shadow-sm"
          >
            Coba Sekarang
            <RiArrowRightLine size={16} />
          </Link>
          <Link
            to="/about"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 text-sm font-medium hover:bg-zinc-50 dark:hover:bg-zinc-800/60 transition-colors"
          >
            Pelajari Lebih Lanjut
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-5xl mx-auto px-6 pb-20 w-full">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {features.map((f) => (
            <div
              key={f.title}
              className="group p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:border-zinc-300 dark:hover:border-zinc-700 hover:shadow-sm transition-all duration-200"
            >
              <div className="w-9 h-9 rounded-xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-700 dark:text-zinc-300 mb-4 group-hover:bg-violet-50 dark:group-hover:bg-violet-900/20 group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">
                {f.icon}
              </div>
              <h3 className="font-semibold text-[14.5px] text-zinc-900 dark:text-white mb-2">
                {f.title}
              </h3>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                {f.desc}
              </p>
            </div>
          ))}
        </div>

        {/* CTA strip */}
        <div className="mt-4 p-8 rounded-2xl bg-zinc-950 dark:bg-zinc-900 border border-zinc-800 text-center">
          <p className="text-white font-semibold text-lg mb-1">Siap mencoba?</p>
          <p className="text-zinc-400 text-sm mb-5">
            Pastikan kamera laptop Anda aktif dan izinkan akses saat diminta.
          </p>
          <Link
            to="/app"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-white text-zinc-900 text-sm font-semibold hover:bg-zinc-100 transition-colors"
          >
            Mulai Deteksi Emosi
            <RiArrowRightLine size={15} />
          </Link>
        </div>
      </section>
    </div>
  );
}
