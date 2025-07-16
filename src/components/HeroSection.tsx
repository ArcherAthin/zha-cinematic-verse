
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
    <section className="relative h-screen flex items-center justify-center bg-black overflow-hidden">
      {/* Background overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80 z-10" />
      
      {/* Background ambient effect */}
      <div className="absolute inset-0 bg-gradient-radial from-red-900/20 to-transparent" />

      {/* Video player */}
      {isPlaying && contentData.hero.videoUrl && (
        <div className="absolute inset-0 z-20">
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            controls={false}
            onEnded={handleCloseVideo}
          >
            <source src={contentData.hero.videoUrl} type="video/mp4" />
          </video>
          
          {/* Video controls */}
          <div className="absolute top-6 right-6 flex gap-4">
            <button
              onClick={handlePauseToggle}
              className="bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all"
            >
              {isPaused ? <Play className="h-6 w-6" /> : <Pause className="h-6 w-6" />}
            </button>
            <button
              onClick={handleCloseVideo}
              className="bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>
      )}

      {/* Main content card */}
      {!isPlaying && (
        <div className="relative z-30 text-center">
          <div className="bg-black/20 backdrop-blur-sm border border-white/10 rounded-xl p-12 max-w-2xl mx-auto shadow-2xl hover:shadow-red-500/20 transition-all duration-500 hover:scale-105">
            {/* Logo placeholder */}
            <div className="mb-8">
              <h1 className="text-6xl md:text-8xl font-bold tracking-wider text-white">
                ZHA
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 tracking-widest">
                PRODUCTIONS
              </p>
            </div>
            
            {/* Tagline */}
            <p className="text-2xl md:text-3xl font-bold text-red-500 mb-8 tracking-wider">
              {contentData.hero.tagline}
            </p>
            
            {/* Play button */}
            <button
              onClick={handlePlayClick}
              className="group relative bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-full flex items-center gap-3 mx-auto transition-all duration-300 hover:scale-110"
              disabled={!contentData.hero.videoUrl}
            >
              <Play className="h-6 w-6 fill-current" />
              <span className="text-lg font-semibold">PLAY REEL</span>
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default HeroSection;
