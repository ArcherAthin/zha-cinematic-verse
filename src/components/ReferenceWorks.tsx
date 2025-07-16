
import { useState } from 'react';
import { Play, X } from 'lucide-react';
import { useAdmin } from '../contexts/AdminContext';

const ReferenceWorks = () => {
  const [selectedWork, setSelectedWork] = useState<any>(null);
  const { contentData } = useAdmin();

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
    }
  ];

  const works = contentData.referenceWorks.length > 0 ? contentData.referenceWorks : defaultWorks;

  return (
    <section className="py-20 bg-black">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-6xl font-bold text-white mb-12 text-center tracking-wider">
          REFERENCE WORKS
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {works.map((work: any) => (
            <div
              key={work.id}
              className="relative group cursor-pointer overflow-hidden rounded-lg shadow-lg hover:shadow-red-500/20 transition-all duration-300"
              onClick={() => setSelectedWork(work)}
            >
              <div className="aspect-video relative">
                <img
                  src={work.thumbnail}
                  alt={work.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <Play className="h-12 w-12 text-white fill-current" />
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                <h3 className="text-white font-semibold text-lg">{work.title}</h3>
              </div>
            </div>
          ))}
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
