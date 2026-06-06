"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Howl } from "howler";
import type { CatalogueSong } from "@/lib/data";

export function embedSrc(trackId: string, startAt: number) {
  return `https://open.spotify.com/embed/track/${trackId}?utm_source=generator&t=${startAt}`;
}

export function useCatalogueAudio(initialSong: CatalogueSong) {
  const howlRef = useRef<Howl | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [embed, setEmbed] = useState({
    trackId: initialSong.spotifyTrackId,
    start: initialSong.previewStart,
  });

  const stop = useCallback(() => {
    howlRef.current?.stop();
    howlRef.current?.unload();
    howlRef.current = null;
    setIsPlaying(false);
  }, []);

  const play = useCallback(
    (song: CatalogueSong) => {
      stop();

      setEmbed({ trackId: song.spotifyTrackId, start: song.previewStart });

      const howl = new Howl({
        src: [song.previewUrl],
        html5: true,
        volume: 0.9,
        onplay: () => setIsPlaying(true),
        onpause: () => setIsPlaying(false),
        onstop: () => setIsPlaying(false),
        onend: () => setIsPlaying(false),
        onloaderror: (_id, err) => {
          console.error("Catalogue preview failed to load:", song.title, err);
          setIsPlaying(false);
        },
        onplayerror: () => {
          setIsPlaying(false);
        },
      });

      howlRef.current = howl;
      howl.play();
    },
    [stop]
  );

  useEffect(() => () => stop(), [stop]);

  return { play, stop, isPlaying, embed };
}
