import { Link } from "react-router-dom";

const features = [
  {
    icon: "🎭",
    title: "Deteksi Emosi Real-Time",
    desc: "Face-API.js mendeteksi ekspresi wajah langsung di browser tanpa mengirim data ke server.",
  },
  {
    icon: "🎵",
    title: "Rekomendasi Adaptif",
    desc: "Algoritma Cosine Similarity mencocokkan emosi Anda dengan ribuan lagu dari dataset Spotify.",
  },
  {
    icon: "🔒",
    title: "Privasi Terjamin",
    desc: "Semua komputasi berjalan di sisi klien. Wajah Anda tidak pernah dikirim ke server.",
  },
];

export default function LandingPage() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-20 space-y-24">
      {/* Hero */}
      <section className="text-center space-y-6">
        <div className="inline-block px-4 py-1.5 rounded-full bg-brand-50 dark:bg-brand-900/30 text-brand-600 dark:text-brand-400 text-sm font-medium">
          Berbasis Kecerdasan Buatan
        </div>
        <h1 className="text-5xl font-bold leading-tight tracking-tight">
          Musik yang menyesuaikan <br />
          <span className="text-brand-500">suasana hati Anda</span>
        </h1>
        <p className="text-zinc-500 dark:text-zinc-400 text-lg max-w-xl mx-auto leading-relaxed">
          Sistem rekomendasi musik adaptif berbasis pengenalan emosi real-time.
          Tidak perlu pilih playlist — biarkan ekspresi wajah Anda yang memilih.
        </p>
        <div className="flex items-center justify-center gap-3 pt-2">
          <Link to="/app" className="btn-primary text-base px-7 py-3">
            Coba Sekarang
          </Link>
          <Link to="/about" className="btn-ghost text-base">
            Pelajari Lebih Lanjut
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {features.map((f) => (
          <div key={f.title} className="card p-6 space-y-3">
            <span className="text-3xl">{f.icon}</span>
            <h3 className="font-semibold text-base">{f.title}</h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
              {f.desc}
            </p>
          </div>
        ))}
      </section>

      {/* CTA */}
      <section className="card p-10 text-center space-y-4">
        <h2 className="text-2xl font-bold">Siap mencoba?</h2>
        <p className="text-zinc-500 dark:text-zinc-400 text-sm">
          Pastikan kamera laptop Anda aktif dan izinkan akses saat diminta.
        </p>
        <Link to="/app" className="btn-primary">
          Mulai Deteksi Emosi
        </Link>
      </section>
    </div>
  );
}
