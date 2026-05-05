import { RiCodeSSlashLine, RiTeamLine } from "react-icons/ri";

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
    <div className="max-w-3xl mx-auto px-6 py-14 space-y-12">
      {/* Tentang proyek */}
      <section>
        <div className="inline-flex items-center gap-2 text-[11.5px] uppercase tracking-widest text-zinc-400 font-medium mb-4">
          <span className="w-4 h-px bg-zinc-300 dark:bg-zinc-700" />
          Tentang Proyek
        </div>
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-white mb-4 leading-snug">
          MoodTune
        </h1>
        <p className="text-zinc-500 dark:text-zinc-400 leading-[1.75] text-[15px]">
          Sistem rekomendasi musik adaptif berbasis pengenalan emosi real-time
          yang dibangun untuk membantu mahasiswa dalam manajemen stres selama
          kegiatan belajar. Sistem mendeteksi ekspresi wajah menggunakan
          Face-API.js dan merekomendasikan lagu yang sesuai menggunakan
          algoritma Cosine Similarity terhadap dataset Spotify.
        </p>
      </section>

      {/* Tech stack */}
      <section>
        <div className="flex items-center gap-2 mb-5">
          <RiCodeSSlashLine size={16} className="text-zinc-400" />
          <h2 className="text-sm font-semibold text-zinc-600 dark:text-zinc-300 uppercase tracking-wide">
            Teknologi yang Digunakan
          </h2>
        </div>
        <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 overflow-hidden shadow-sm divide-y divide-zinc-100 dark:divide-zinc-800">
          {stack.map((s, i) => (
            <div
              key={s.label}
              className="flex items-center justify-between px-5 py-3.5 group hover:bg-zinc-50 dark:hover:bg-zinc-800/40 transition-colors"
            >
              <span className="text-sm text-zinc-400">{s.label}</span>
              <span className="text-sm font-medium text-zinc-800 dark:text-zinc-200 font-mono">
                {s.value}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Tim */}
      <section>
        <div className="flex items-center gap-2 mb-2">
          <RiTeamLine size={16} className="text-zinc-400" />
          <h2 className="text-sm font-semibold text-zinc-600 dark:text-zinc-300 uppercase tracking-wide">
            Tim Pengembang
          </h2>
        </div>
        <p className="text-[13px] text-zinc-400 mb-5">
          Teknik Informatika — Universitas Katolik De La Salle Manado, 2026
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {team.map((m, i) => (
            <div
              key={m.nim}
              className="flex items-center gap-3.5 px-4 py-3.5 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all shadow-sm"
            >
              <div className="shrink-0 w-9 h-9 rounded-xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-xs font-bold text-zinc-500 dark:text-zinc-400">
                {i + 1}
              </div>
              <div className="min-w-0">
                <p className="text-[13.5px] font-medium text-zinc-900 dark:text-white truncate">
                  {m.name}
                </p>
                <p className="text-[11px] text-zinc-400 font-mono">{m.nim}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
