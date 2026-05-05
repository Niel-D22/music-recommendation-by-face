import { useEffect, useRef, useState } from "react";
import * as faceapi from "face-api.js";

const MODEL_URL = "/models";

export function useEmotionDetector(videoRef) {
  const [emotion, setEmotion] = useState(null);
  const [isReady, setIsReady] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const intervalRef = useRef(null);

  // Load 3 model Face-API.js
  useEffect(() => {
    async function loadModels() {
      await Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
        faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
        faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
      ]);
      setIsLoading(false);
      setIsReady(true);
    }
    loadModels();
  }, []);

  // Jalankan deteksi setiap 3 detik
  useEffect(() => {
    if (!isReady || !videoRef.current) return;

    intervalRef.current = setInterval(async () => {
      const result = await faceapi
        .detectSingleFace(
          videoRef.current,
          new faceapi.TinyFaceDetectorOptions(),
        )
        .withFaceLandmarks()
        .withFaceExpressions();

      if (result) {
        const exp = result.expressions;
        const dominant = Object.keys(exp).reduce((a, b) =>
          exp[a] > exp[b] ? a : b,
        );
        setEmotion(dominant);
      }
    }, 3000);

    return () => clearInterval(intervalRef.current);
  }, [isReady, videoRef]);

  return { emotion, isReady, isLoading };
}
