
import React, { createContext, useContext, useState, useEffect } from 'react';

interface AdminContextType {
  isLoggedIn: boolean;
  login: (password: string) => boolean;
  logout: () => void;
  contentData: any;
  updateContent: (section: string, data: any) => void;
  addContactMessage: (message: any) => void;
  saveAllContent: () => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [contentData, setContentData] = useState(() => {
    const saved = localStorage.getItem('zha_content');
    return saved ? JSON.parse(saved) : {
    hero: {
      tagline: "Raw. Real. Relentless.",
      videoUrl: "",
      backgroundVideoUrl: "",
      logoUrl: ""
    },
    referenceWorks: [
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
    ],
    ideologies: [
      "Visual storytelling that transcends boundaries",
      "Authentic narratives rooted in culture", 
      "Cinematic excellence without compromise",
      "Innovation in every frame"
    ],
    faqs: [
      {
        question: "What services does Zha Productions offer?",
        answer: "We provide comprehensive media production services including film production, commercial advertising, documentaries, and digital content creation."
      },
      {
        question: "How can I get started with a project?",
        answer: "Contact us through our website or email. We'll schedule a consultation to discuss your vision and project requirements."
      }
    ],
    works: [],
    services: {
      videoUrl: "",
      insights: [
        "Film Production & Direction",
        "Commercial Advertising",
        "Documentary Filmmaking",
        "Digital Content Creation",
        "Post-Production Services"
      ]
    },
    team: [],
    contact: {
      email: "info@zhaproductions.com",
      phone: "+1 (555) 123-4567"
    },
    about: {
      title: "MEET THE TEAM",
      subtitle: "Passionate professionals dedicated to cinematic excellence"
    },
    contactMessages: []
  }});

  useEffect(() => {
    const saved = localStorage.getItem('zha_content');
    if (saved) {
      setContentData(JSON.parse(saved));
    }
  }, []);

  const login = (password: string) => {
    if (password === "Admin@Zha") {
      setIsLoggedIn(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsLoggedIn(false);
  };

  const updateContent = (section: string, data: any) => {
    setContentData(prev => ({
      ...prev,
      [section]: data
    }));
  };

  const addContactMessage = (message: any) => {
    setContentData(prev => ({
      ...prev,
      contactMessages: [...prev.contactMessages, { ...message, id: Date.now(), timestamp: new Date() }]
    }));
  };

  const saveAllContent = () => {
    localStorage.setItem('zha_content', JSON.stringify(contentData));
    // Force a re-render by updating the state
    setContentData(prev => ({ ...prev }));
    alert('All content saved successfully!');
  };

  return (
    <AdminContext.Provider value={{
      isLoggedIn,
      login,
      logout,
      contentData,
      updateContent,
      addContactMessage,
      saveAllContent
    }}>
      {children}
    </AdminContext.Provider>
  );
};
