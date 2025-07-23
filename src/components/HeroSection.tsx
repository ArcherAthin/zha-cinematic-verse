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
      {/* Background Video */}
      {contentData.hero.backgroundVideoUrl && (
        <div className="absolute inset-0 z-0">
          <video
            className="w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
          >
            <source src={contentData.hero.backgroundVideoUrl} type="video/mp4" />
          </video>
        </div>
      )}
      
      {/* Background overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80 z-10" />
      
      {/* Red pulse pattern background */}
      <div className="absolute inset-0 z-5">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-red-500 rounded-full animate-ping opacity-30"></div>
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-red-400 rounded-full animate-ping opacity-40" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-red-600 rounded-full animate-ping opacity-25" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 right-1/4 w-1 h-1 bg-red-500 rounded-full animate-ping opacity-35" style={{ animationDelay: '0.5s' }}></div>
        <div className="absolute bottom-1/3 right-1/2 w-2 h-2 bg-red-400 rounded-full animate-ping opacity-30" style={{ animationDelay: '1.5s' }}></div>
      </div>

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

      {/* Main content card with translucent overlay */}
      {!isPlaying && (
        <div className="relative z-30 text-center">
          <div className="bg-black/30 backdrop-blur-md border border-white/20 rounded-2xl p-12 max-w-xl mx-auto shadow-2xl hover:shadow-red-500/20 transition-all duration-500 hover:scale-105 aspect-square flex flex-col justify-center">
            {/* Logo */}
            <div className="mb-8">
              <img 
                src="/lovable-uploads/bdc796a1-477c-4a1f-9c36-d246afd7f7d4.png" 
                alt="ZHA Productions" 
                className="mx-auto max-w-sm w-full h-auto"
              />
            </div>
            
            {/* Tagline */}
            <p className="text-2xl md:text-3xl font-bold text-red-500 mb-8 tracking-wider">
              {contentData.hero.tagline}
            </p>
            
            {/* Play button */}
            {contentData.hero.videoUrl && (
              <button
                onClick={handlePlayClick}
                className="group relative bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-full flex items-center gap-3 mx-auto transition-all duration-300 hover:scale-110"
              >
                <Play className="h-6 w-6 fill-current" />
                <span className="text-lg font-semibold">PLAY</span>
              </button>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default HeroSection;