const express = require("express");
const cors = require("cors");
const fs = require("fs");
const { parse } = require("csv-parse/sync");
const { recommend } = require("./recommender");
require("dotenv").config();
const app = express();
app.use(cors());
app.use(express.json());

// ── Token Spotify (ganti jika expired) ──
const SPOTIFY_TOKEN = process.env.SPOTIFY_ACCESS_TOKEN;
// ── Search preview_url dari Spotify ──
async function getPreviewUrl(trackName, artistName) {
  try {
    const query = encodeURIComponent(`${trackName} ${artistName}`);
    const res = await fetch(
      `https://api.spotify.com/v1/search?q=${query}&type=track&limit=1`,
      {
        headers: { Authorization: `Bearer ${SPOTIFY_TOKEN}` },
      },
    );
    const data = await res.json();
    return data?.tracks?.items?.[0]?.preview_url ?? null;
  } catch {
    return null;
  }
}

// ── Load dataset ke RAM ──
let songs = [];
try {
  const raw = fs.readFileSync("./dataset.csv", "utf8");
  songs = parse(raw, { columns: true, skip_empty_lines: true }).map((s) => ({
    name: s.track_name ?? "Unknown",
    artist: s.track_artist ?? "Unknown",
    preview_url: null,
    valence: parseFloat(s.valence) || 0,
    energy: parseFloat(s.energy) || 0,
    tempo: (parseFloat(s.tempo) || 0) / 250,
    danceability: parseFloat(s.danceability) || 0,
    instrumentalness: parseFloat(s.instrumentalness) || 0,
    acousticness: parseFloat(s.acousticness) || 0,
  }));
  console.log(`✅ Dataset loaded: ${songs.length} lagu`);
} catch (err) {
  console.error("❌ Gagal load dataset.csv:", err.message);
}





// ── GET /youtube-id ──
app.get('/youtube-id', async (req, res) => {
  try {
    const query = req.query.q
    const searchRes = await fetch(
      `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`
    )
    const html = await searchRes.text()

    // Extract videoId dari HTML YouTube
    const match = html.match(/"videoId":"([a-zA-Z0-9_-]{11})"/)
    const videoId = match ? match[1] : null

    res.json({ videoId })
  } catch {
    res.json({ videoId: null })
  }
})

// ── POST /recommend ──
app.post("/recommend", async (req, res) => {
  const { emotion } = req.body;

  if (!emotion) return res.status(400).json({ error: "emotion wajib diisi" });

  const validEmotions = [
    "happy",
    "sad",
    "angry",
    "fearful",
    "disgusted",
    "surprised",
    "neutral",
  ];
  if (!validEmotions.includes(emotion)) {
    return res.status(400).json({ error: `Emosi tidak valid: ${emotion}` });
  }

  if (songs.length === 0)
    return res.status(503).json({ error: "Dataset belum tersedia" });

  // Ambil 10 lagu terbaik
  const top10 = recommend(emotion, songs);

  // Ambil preview_url dari Spotify untuk tiap lagu
  const top10WithPreview = await Promise.all(
    top10.map(async (song) => ({
      ...song,
      preview_url: await getPreviewUrl(song.name, song.artist),
    })),
  );

  res.json(top10WithPreview);
});

app.get("/health", (req, res) => {
  res.json({ status: "ok", total_songs: songs.length });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`),
);
