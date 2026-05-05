const EMOTION_CONFIG = {
  happy: {
    label: "Senang",
    color:
      "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 border-yellow-200 dark:border-yellow-800",
  },
  sad: {
    label: "Sedih",
    color:
      "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800",
  },
  angry: {
    label: "Marah",
    color:
      "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 border-red-200 dark:border-red-800",
  },
  fearful: {
    label: "Takut",
    color:
      "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800",
  },
  disgusted: {
    label: "Jijik",
    color:
      "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800",
  },
  surprised: {
    label: "Terkejut",
    color:
      "bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 border-orange-200 dark:border-orange-800",
  },
  neutral: {
    label: "Netral",
    color:
      "bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-zinc-700",
  },
};

export default function EmotionBadge({ emotion, isLoading }) {
  if (isLoading) {
    return (
      <div className="flex items-center gap-2 text-sm text-zinc-400">
        <span className="w-3 h-3 rounded-full border-2 border-zinc-300 border-t-brand-500 animate-spin" />
        Memuat model AI...
      </div>
    );
  }

  if (!emotion) {
    return (
      <p className="text-sm text-zinc-400 dark:text-zinc-500">
        Arahkan wajah Anda ke kamera...
      </p>
    );
  }

  const config = EMOTION_CONFIG[emotion] ?? EMOTION_CONFIG.neutral;

  return (
    <div
      className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium ${config.color}`}
    >
      <span>Emosi terdeteksi:</span>
      <span className="font-bold capitalize">{config.label}</span>
    </div>
  );
}
