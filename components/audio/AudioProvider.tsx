"use client";

import { createContext, useContext, useState, useCallback, useEffect, ReactNode } from "react";
import { Howl } from "howler";
import type { Track } from "@/lib/data";

interface AudioContextType {
  currentTrack: Track | null;
  isPlaying: boolean;
  progress: number;
  volume: number;
  isMuted: boolean;
  ambientEnabled: boolean;
  playTrack: (track: Track) => void;
  togglePlay: () => void;
  pause: () => void;
  seek: (progress: number) => void;
  setVolume: (volume: number) => void;
  toggleMute: () => void;
  toggleAmbient: () => void;
  closePlayer: () => void;
}

const AudioContext = createContext<AudioContextType | null>(null);

export function AudioProvider({ children }: { children: ReactNode }) {
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolumeState] = useState(0.8);
  const [isMuted, setIsMuted] = useState(true);
  const [ambientEnabled, setAmbientEnabled] = useState(false);
  const [howl, setHowl] = useState<Howl | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("sylva-audio-muted");
    if (saved !== null) setIsMuted(saved === "true");
  }, []);

  useEffect(() => {
    localStorage.setItem("sylva-audio-muted", String(isMuted));
    if (howl) howl.volume(isMuted ? 0 : volume);
  }, [isMuted, volume, howl]);

  useEffect(() => {
    if (!howl) return;
    const interval = setInterval(() => {
      if (howl.playing()) {
        const seek = howl.seek() as number;
        const duration = howl.duration();
        if (duration > 0) setProgress(seek / duration);
      }
    }, 100);
    return () => clearInterval(interval);
  }, [howl]);

  const playTrack = useCallback((track: Track) => {
    if (howl) {
      howl.unload();
    }
    const newHowl = new Howl({
      src: [track.audioUrl],
      html5: true,
      volume: isMuted ? 0 : volume,
      onplay: () => setIsPlaying(true),
      onpause: () => setIsPlaying(false),
      onstop: () => {
        setIsPlaying(false);
        setProgress(0);
      },
      onend: () => {
        setIsPlaying(false);
        setProgress(0);
      },
    });
    setHowl(newHowl);
    setCurrentTrack(track);
    newHowl.play();
  }, [howl, isMuted, volume]);

  const togglePlay = useCallback(() => {
    if (!howl) return;
    if (howl.playing()) {
      howl.pause();
    } else {
      howl.play();
    }
  }, [howl]);

  const pause = useCallback(() => {
    howl?.pause();
  }, [howl]);

  const seek = useCallback((p: number) => {
    if (!howl) return;
    howl.seek(howl.duration() * p);
    setProgress(p);
  }, [howl]);

  const setVolume = useCallback((v: number) => {
    setVolumeState(v);
    if (howl && !isMuted) howl.volume(v);
  }, [howl, isMuted]);

  const toggleMute = useCallback(() => {
    setIsMuted((m) => !m);
  }, []);

  const toggleAmbient = useCallback(() => {
    setAmbientEnabled((a) => !a);
  }, []);

  const closePlayer = useCallback(() => {
    howl?.stop();
    howl?.unload();
    setHowl(null);
    setCurrentTrack(null);
    setIsPlaying(false);
    setProgress(0);
  }, [howl]);

  return (
    <AudioContext.Provider
      value={{
        currentTrack,
        isPlaying,
        progress,
        volume,
        isMuted,
        ambientEnabled,
        playTrack,
        togglePlay,
        pause,
        seek,
        setVolume,
        toggleMute,
        toggleAmbient,
        closePlayer,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
}

export function useAudio() {
  const ctx = useContext(AudioContext);
  if (!ctx) throw new Error("useAudio must be used within AudioProvider");
  return ctx;
}
