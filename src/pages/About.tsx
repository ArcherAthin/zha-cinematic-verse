
import { useAdmin } from '../contexts/AdminContext';

const About = () => {
  const { contentData } = useAdmin();

  const defaultTeam = [
    {
      id: 1,
      name: "Director",
      title: "CREATIVE DIRECTOR",
      bio: "Visionary leader with over 15 years of experience in cinematic storytelling and production.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop"
    },
    {
      id: 2,
      name: "Producer",
      title: "EXECUTIVE PRODUCER",
      bio: "Strategic producer specializing in bringing complex projects to life with precision and creativity.",
      image: "https://images.unsplash.com/photo-1494790108755-2616b332e234?w=400&h=600&fit=crop"
    },
    {
      id: 3,
      name: "Cinematographer",
      title: "DIRECTOR OF PHOTOGRAPHY",
      bio: "Award-winning cinematographer with expertise in visual storytelling and technical excellence.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=600&fit=crop"
    },
    {
      id: 4,
      name: "Editor",
      title: "CHIEF EDITOR",
      bio: "Master editor with a keen eye for pacing, rhythm, and emotional impact in post-production.",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=600&fit=crop"
    },
    {
      id: 5,
      name: "Sound Designer",
      title: "AUDIO DIRECTOR",
      bio: "Sound design expert creating immersive audio experiences that enhance storytelling.",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=600&fit=crop"
    },
    {
      id: 6,
      name: "Creative Writer",
      title: "SCRIPT WRITER",
      bio: "Talented writer crafting compelling narratives that resonate with audiences worldwide.",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=600&fit=crop"
    }
  ];

  const team = contentData.team.length > 0 ? contentData.team : defaultTeam;

  return (
    <div className="min-h-screen bg-black pt-20">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-12 text-center tracking-wider">
          MEET THE TEAM
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {team.map((member: any) => (
            <div
              key={member.id}
              className="group relative overflow-hidden rounded-lg bg-gray-900 hover:bg-gray-800 transition-all duration-300"
            >
              <div className="aspect-[3/4] overflow-hidden">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-red-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              
              <div className="p-6">
                <h3 className="text-2xl font-bold text-white mb-2">
                  {member.name}
                </h3>
                <p className="text-red-500 font-semibold text-sm uppercase tracking-wide mb-3">
                  {member.title}
                </p>
                <p className="text-gray-300 text-sm leading-relaxed">
                  {member.bio}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;
