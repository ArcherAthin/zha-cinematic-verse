
import { useState, useEffect, useRef } from 'react';
import { Play, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useAdmin } from '../contexts/AdminContext';

const ReferenceWorks = () => {
  const [selectedWork, setSelectedWork] = useState<any>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { contentData } = useAdmin();
  const carouselRef = useRef<HTMLDivElement>(null);

  const defaultWorks = [
    {
      id: 1,
      title: "Cinematic Vision",
      thumbnail: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&h=450&fit=crop",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
    },
    {
      id: 2,
      title: "Visual Storytelling",
      thumbnail: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=800&h=450&fit=crop",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
    },
    {
      id: 3,
      title: "Raw Emotions",
      thumbnail: "https://images.unsplash.com/photo-1500673922987-e212871fec22?w=800&h=450&fit=crop",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
    },
    {
      id: 4,
      title: "Cultural Depth",
      thumbnail: "https://images.unsplash.com/photo-1518877593221-1f28583780b4?w=800&h=450&fit=crop",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
    },
    {
      id: 5,
      title: "Authentic Stories",
      thumbnail: "https://images.unsplash.com/photo-1574267432553-4b4628081c31?w=800&h=450&fit=crop",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
    },
    {
      id: 6,
      title: "Global Impact",
      thumbnail: "https://images.unsplash.com/photo-1489599112328-82c25c8d8f6c?w=800&h=450&fit=crop",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
    }
  ];

  const works = contentData.referenceWorks.length > 0 ? contentData.referenceWorks : defaultWorks;

  // Auto-scroll carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % works.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [works.length]);

  // Update carousel position
  useEffect(() => {
    if (carouselRef.current) {
      const cardWidth = carouselRef.current.offsetWidth / 3;
      carouselRef.current.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
    }
  }, [currentIndex]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % works.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + works.length) % works.length);
  };

  const getVisibleWorks = () => {
    const visible = [];
    for (let i = 0; i < 6; i++) {
      visible.push(works[(currentIndex + i) % works.length]);
    }
    return visible;
  };

  return (
    <section className="py-20 bg-black relative overflow-hidden">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-6xl font-bold text-white mb-12 text-center tracking-wider">
          REFERENCE WORKS
        </h2>
        
        {/* Carousel Container */}
        <div className="relative">
          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          {/* Carousel */}
          <div className="overflow-hidden">
            <div
              ref={carouselRef}
              className="flex transition-transform duration-700 ease-out"
              style={{ width: `${(works.length * 100) / 3}%` }}
            >
              {getVisibleWorks().map((work: any, index: number) => (
                <div
                  key={`${work.id}-${index}`}
                  className="w-1/3 px-3 flex-shrink-0"
                >
                  <div
                    className="relative group cursor-pointer overflow-hidden rounded-lg shadow-lg hover:shadow-red-500/20 transition-all duration-300 aspect-video"
                    onClick={() => setSelectedWork(work)}
                  >
                    <img
                      src={work.thumbnail}
                      alt={work.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <Play className="h-12 w-12 text-white fill-current" />
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                      <h3 className="text-white font-semibold text-lg">{work.title}</h3>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Video Modal */}
      {selectedWork && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <div className="relative w-full max-w-4xl">
            <button
              onClick={() => setSelectedWork(null)}
              className="absolute -top-12 right-0 text-white hover:text-red-500 transition-colors"
            >
              <X className="h-8 w-8" />
            </button>
            <div className="aspect-video bg-black rounded-lg overflow-hidden">
              <iframe
                src={selectedWork.videoUrl}
                title={selectedWork.title}
                className="w-full h-full"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ReferenceWorks;
