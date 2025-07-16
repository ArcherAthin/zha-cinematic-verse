
import { ChevronDown } from 'lucide-react';
import { useAdmin } from '../contexts/AdminContext';

const FAQSection = () => {
  const { contentData } = useAdmin();

  return (
    <section className="py-20 bg-black">
      <div className="container mx-auto px-4 max-w-4xl">
        <h2 className="text-4xl md:text-6xl font-bold text-white mb-12 text-center tracking-wider">
          FREQUENTLY ASKED
        </h2>
        
        <div className="space-y-4">
          {contentData.faqs.map((faq: any, index: number) => (
            <details
              key={index}
              className="group border border-gray-800 rounded-lg overflow-hidden hover:border-red-500 transition-colors duration-300"
            >
              <summary className="flex items-center justify-between p-6 cursor-pointer bg-gray-900 hover:bg-gray-800 transition-colors">
                <span className="text-lg font-semibold text-white">
                  {faq.question}
                </span>
                <ChevronDown className="h-5 w-5 text-red-500 transition-transform group-open:rotate-180" />
              </summary>
              <div className="p-6 bg-gray-900/50">
                <p className="text-gray-300 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
