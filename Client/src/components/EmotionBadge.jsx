import { RiLoaderLine } from "react-icons/ri";

const EMOTION_CONFIG = {
  happy: {
    label: "Senang",
    emoji: "😊",
    color:
      "bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800/50",
    dot: "bg-amber-400",
  },
  sad: {
    label: "Sedih",
    emoji: "😔",
    color:
      "bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800/50",
    dot: "bg-blue-400",
  },
  angry: {
    label: "Marah",
    emoji: "😠",
    color:
      "bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 border-red-200 dark:border-red-800/50",
    dot: "bg-red-400",
  },
  fearful: {
    label: "Takut",
    emoji: "😨",
    color:
      "bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800/50",
    dot: "bg-purple-400",
  },
  disgusted: {
    label: "Jijik",
    emoji: "🤢",
    color:
      "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800/50",
    dot: "bg-emerald-400",
  },
  surprised: {
    label: "Terkejut",
    emoji: "😲",
    color:
      "bg-orange-50 dark:bg-orange-900/20 text-orange-700 dark:text-orange-300 border-orange-200 dark:border-orange-800/50",
    dot: "bg-orange-400",
  },
  neutral: {
    label: "Netral",
    emoji: "😐",
    color:
      "bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-zinc-700",
    dot: "bg-zinc-400",
  },
};

export default function EmotionBadge({ emotion, isLoading }) {
  if (isLoading) {
    return (
      <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 w-fit">
        <RiLoaderLine size={14} className="animate-spin text-zinc-400" />
        <span className="text-sm text-zinc-500 dark:text-zinc-400">
          Memuat model AI...
        </span>
      </div>
    );
  }

  if (!emotion) {
    return (
      <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl border border-dashed border-zinc-200 dark:border-zinc-800 w-fit">
        <span className="text-sm text-zinc-400 dark:text-zinc-500">
          Arahkan wajah Anda ke kamera...
        </span>
      </div>
    );
  }

  const config = EMOTION_CONFIG[emotion] ?? EMOTION_CONFIG.neutral;

  return (
    <div
      className={`inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl border text-sm font-medium transition-all duration-300 ${config.color}`}
    >
      <span className={`w-2 h-2 rounded-full ${config.dot}`} />
      <span className="text-current/60 font-normal">Emosi terdeteksi:</span>
      <span className="font-semibold">
        {config.label} {config.emoji}
      </span>
    </div>
  );
}
