
import { useEffect, useRef } from 'react';
import { useAdmin } from '../contexts/AdminContext';

const BrandingIdeologies = () => {
  const { contentData } = useAdmin();
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
            entry.target.classList.remove('opacity-0', 'translate-y-10');
          }
        });
      },
      { threshold: 0.3, rootMargin: '0px 0px -100px 0px' }
    );

    const elements = sectionRef.current?.querySelectorAll('.ideology-item');
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 bg-gradient-to-b from-black to-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-6xl font-bold text-white mb-16 text-center tracking-wider">
          OUR PHILOSOPHY
        </h2>
        
        <div className="space-y-16">
          {contentData.ideologies.map((ideology: string, index: number) => (
            <div
              key={index}
              className="ideology-item opacity-0 transform translate-y-10 transition-all duration-1000 ease-out"
            >
              <h3 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white text-center leading-tight tracking-wide px-4">
                {ideology}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrandingIdeologies;
