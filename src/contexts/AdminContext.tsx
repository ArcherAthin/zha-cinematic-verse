import React, { createContext, useContext, useState, useEffect } from 'react';

interface AdminContextType {
  isLoggedIn: boolean;
  login: (password: string) => boolean;
  logout: () => void;
  contentData: any;
  updateContent: (section: string, data: any) => void;
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
  const [contentData, setContentData] = useState({
    hero: {
      tagline: "Raw. Real. Relentless.",
      videoUrl: "",
      logoUrl: ""
    },
    referenceWorks: [],
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
    }
  });

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

  return (
    <AdminContext.Provider value={{
      isLoggedIn,
      login,
      logout,
      contentData,
      updateContent
    }}>
      {children}
    </AdminContext.Provider>
  );
};
