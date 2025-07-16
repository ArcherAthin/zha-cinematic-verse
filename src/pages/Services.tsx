
import { useAdmin } from '../contexts/AdminContext';

const Services = () => {
  const { contentData } = useAdmin();

  return (
    <div className="min-h-screen bg-black pt-20">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-12 text-center tracking-wider">
          SERVICES
        </h1>
        
        {/* Explainer Video Section */}
        <div className="mb-20">
          <div className="aspect-video bg-gray-900 rounded-lg overflow-hidden max-w-4xl mx-auto">
            {contentData.services.videoUrl ? (
              <iframe
                src={contentData.services.videoUrl}
                title="Services Explainer"
                className="w-full h-full"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <p className="text-gray-400 text-xl">Explainer video will be displayed here</p>
              </div>
            )}
          </div>
        </div>
        
        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {contentData.services.insights.map((service: string, index: number) => (
            <div
              key={index}
              className="bg-gray-900 p-8 rounded-lg border border-gray-800 hover:border-red-500 transition-colors duration-300"
            >
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 tracking-wide uppercase">
                {service}
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Professional {service.toLowerCase()} services tailored to bring your vision to life with cinematic excellence.
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;
