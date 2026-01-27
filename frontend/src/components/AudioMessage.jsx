import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";

const AudioMessage = ({ audioUrl, isMe }) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onLoadedMetadata = () => setDuration(audio.duration);
    const onTimeUpdate = () => setCurrentTime(audio.currentTime);
    const onEnded = () => setIsPlaying(false);

    audio.addEventListener("loadedmetadata", onLoadedMetadata);
    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("ended", onEnded);

    return () => {
      audio.removeEventListener("loadedmetadata", onLoadedMetadata);
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("ended", onEnded);
    };
  }, []);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const formatTime = (time = 0) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const progress = duration ? (currentTime / duration) * 100 : 0;

  return (
    <div
      className={`flex items-center gap-3 rounded-xl px-3 py-2 w-[240px]
        ${isMe ? "bg-primary text-primary-content" : "bg-base-200"}
      `}
    >
      <button
        onClick={togglePlay}
        className={`btn btn-circle btn-sm
          ${isMe ? "btn-ghost text-primary-content" : "btn-ghost"}
        `}
      >
        {isPlaying ? <Pause size={16} /> : <Play size={16} />}
      </button>

      <div className="flex-1">
        {/* Progress bar */}
        <div className="h-1 w-full rounded-full bg-black/20 overflow-hidden">
          <div
            className={`h-full transition-all duration-100
              ${isMe ? "bg-primary-content" : "bg-primary"}
            `}
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Time */}
        <div className="flex justify-between text-[11px] mt-1 opacity-70">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      <audio ref={audioRef} src={audioUrl} preload="metadata" />
    </div>
  );
};

export default AudioMessage;