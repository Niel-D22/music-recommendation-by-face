export async function fetchRecommendations(emotion) {
  const res = await fetch('/recommend', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ emotion }),
  })

  if (!res.ok) throw new Error('Gagal mengambil rekomendasi')
  return res.json()
}