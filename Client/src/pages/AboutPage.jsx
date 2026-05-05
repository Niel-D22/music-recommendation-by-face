const team = [
  { name: "Ahmad R. Wael", nim: "24013033" },
  { name: "Daniel R. Warouw", nim: "24013025" },
  { name: "Kevin L. Sondakh", nim: "24013023" },
  { name: "Maltrian J. Rondonuwu", nim: "24013067" },
  { name: "Andriano Darinding", nim: "24013011" },
  { name: "Matthew Z. Kaawoan", nim: "24013068" },
];

const stack = [
  { label: "Front-End", value: "React + Tailwind CSS v4" },
  { label: "Deteksi Emosi", value: "Face-API.js (TensorFlow.js)" },
  { label: "Back-End", value: "Node.js + Express.js" },
  { label: "Algoritma", value: "Cosine Similarity" },
  { label: "Dataset", value: "Spotify Tracks Dataset (Kaggle)" },
  { label: "Routing", value: "React Router v6" },
];

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16 space-y-14">
      {/* Tentang proyek */}
      <section className="space-y-4">
        <h1 className="text-3xl font-bold">Tentang Proyek</h1>
        <p className="text-zinc-500 dark:text-zinc-400 leading-relaxed">
          MoodTune adalah sistem rekomendasi musik adaptif berbasis pengenalan
          emosi real-time yang dibangun untuk membantu mahasiswa dalam manajemen
          stres selama kegiatan belajar. Sistem mendeteksi ekspresi wajah
          menggunakan Face-API.js dan merekomendasikan lagu yang sesuai
          menggunakan algoritma Cosine Similarity terhadap dataset Spotify.
        </p>
      </section>

      {/* Tech stack */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold">Teknologi yang Digunakan</h2>
        <div className="card divide-y divide-zinc-100 dark:divide-zinc-800">
          {stack.map((s) => (
            <div
              key={s.label}
              className="flex items-center justify-between px-5 py-3.5"
            >
              <span className="text-sm text-zinc-500 dark:text-zinc-400">
                {s.label}
              </span>
              <span className="text-sm font-medium">{s.value}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Tim */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold">Tim Pengembang</h2>
        <p className="text-sm text-zinc-400">
          Fakultas Teknik — Program Studi Teknik Informatika
          <br />
          Universitas Katolik De La Salle Manado, 2026
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {team.map((m, i) => (
            <div key={m.nim} className="card px-5 py-4 flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-brand-100 dark:bg-brand-900/40 text-brand-600 dark:text-brand-400 flex items-center justify-center text-sm font-bold shrink-0">
                {i + 1}
              </div>
              <div>
                <p className="text-sm font-medium">{m.name}</p>
                <p className="text-xs text-zinc-400 font-mono">{m.nim}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
