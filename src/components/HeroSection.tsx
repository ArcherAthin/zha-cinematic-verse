import { useState, useRef } from 'react';
import { Play, X, Pause } from 'lucide-react';
import { useAdmin } from '../contexts/AdminContext';

const HeroSection = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { contentData } = useAdmin();

  const handlePlayClick = () => {
    setIsPlaying(true);
    if (videoRef.current) {
      videoRef.current.play();
    }
  };

  const handleCloseVideo = () => {
    setIsPlaying(false);
    setIsPaused(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  const handlePauseToggle = () => {
    if (videoRef.current) {
      if (isPaused) {
        videoRef.current.play();
        setIsPaused(false);
      } else {
        videoRef.current.pause();
        setIsPaused(true);
      }
    }
  };

  return (
    <section className="relative h-screen bg-black overflow-hidden">
      {/* Video player overlay */}
      {isPlaying && contentData.hero.videoUrl && (
        <div className="absolute inset-0 z-40 bg-black/80 flex items-center justify-center">
          <div className="relative w-full max-w-4xl mx-4">
            <video
              ref={videoRef}
              className="w-full h-auto max-h-[80vh] rounded-lg"
              controls={false}
              onEnded={handleCloseVideo}
            >
              <source src={contentData.hero.videoUrl} type="video/mp4" />
            </video>
            
            {/* Video controls */}
            <div className="absolute top-4 right-4 flex gap-3">
              <button
                onClick={handlePauseToggle}
                className="bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all"
              >
                {isPaused ? <Play className="h-5 w-5" /> : <Pause className="h-5 w-5" />}
              </button>
              <button
                onClick={handleCloseVideo}
                className="bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Glass morphic panel */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative">
          {/* Glass morphic square panel */}
          <div className="w-80 h-80 bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl shadow-2xl flex flex-col items-center justify-center p-8 hover:bg-white/15 transition-all duration-300">
            {/* Logo */}
            <div className="mb-8">
              <img 
                src="/lovable-uploads/c93cc5c8-daae-40fb-b82b-2fb11fb90229.png" 
                alt="ZHA Productions" 
                className="w-32 h-auto"
              />
            </div>
            
            {/* Tagline */}
            <p className="text-xl font-bold text-white mb-8 text-center tracking-wide">
              {contentData.hero.tagline}
            </p>
            
            {/* Play button */}
            {contentData.hero.videoUrl && (
              <button
                onClick={handlePlayClick}
                className="group bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-full flex items-center gap-3 transition-all duration-300 hover:scale-105 shadow-lg"
              >
                <Play className="h-5 w-5 fill-current" />
                <span className="font-semibold">WATCH REEL</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;