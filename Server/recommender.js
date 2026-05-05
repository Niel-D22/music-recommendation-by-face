// Pemetaan 7 emosi → vektor target audio (sesuai dokumen Bab 5.2)
// Urutan: [valence, energy, tempo, danceability, instrumentalness, acousticness]
const EMOTION_VECTORS = {
  happy:     [0.9, 0.8, 0.7, 0.8, 0.1, 0.2],
  sad:       [0.2, 0.2, 0.3, 0.2, 0.3, 0.7],
  angry:     [0.3, 0.9, 0.8, 0.5, 0.1, 0.1],
  fearful:   [0.2, 0.5, 0.4, 0.2, 0.5, 0.5],
  disgusted: [0.2, 0.6, 0.5, 0.3, 0.4, 0.3],
  surprised: [0.7, 0.8, 0.7, 0.6, 0.2, 0.2],
  neutral:   [0.5, 0.5, 0.5, 0.5, 0.3, 0.4],
}

function cosineSimilarity(vecA, vecB) {
  const dot  = vecA.reduce((sum, a, i) => sum + a * vecB[i], 0)
  const magA = Math.sqrt(vecA.reduce((sum, a) => sum + a * a, 0))
  const magB = Math.sqrt(vecB.reduce((sum, b) => sum + b * b, 0))
  if (magA === 0 || magB === 0) return 0
  return dot / (magA * magB)
}

function recommend(emotion, songs) {
  const target = EMOTION_VECTORS[emotion] ?? EMOTION_VECTORS['neutral']

  return songs
    .map(song => {
      const songVec = [
        song.valence,
        song.energy,
        song.tempo,
        song.danceability,
        song.instrumentalness,
        song.acousticness,
      ]
      return { ...song, score: cosineSimilarity(target, songVec) }
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, 10)
}

module.exports = { recommend }