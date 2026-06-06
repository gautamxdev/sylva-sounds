"use client";

import { useEffect, useState } from "react";

interface SpotifyOEmbed {
  thumbnail_url?: string;
}

const cache = new Map<string, string>();

export function useSpotifyArtwork(trackId: string | undefined) {
  const [artwork, setArtwork] = useState<string | undefined>();

  useEffect(() => {
    if (!trackId) {
      setArtwork(undefined);
      return;
    }

    if (cache.has(trackId)) {
      setArtwork(cache.get(trackId));
      return;
    }

    let cancelled = false;

    fetch(`https://open.spotify.com/oembed?url=https://open.spotify.com/track/${trackId}`)
      .then((res) => res.json())
      .then((data: SpotifyOEmbed) => {
        if (cancelled) return;
        const url = data.thumbnail_url;
        if (url) {
          cache.set(trackId, url);
          setArtwork(url);
        }
      })
      .catch(() => {
        // Silently fail — artwork will remain undefined
      });

    return () => {
      cancelled = true;
    };
  }, [trackId]);

  return artwork;
}
