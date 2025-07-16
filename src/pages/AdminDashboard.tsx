import { useState } from 'react';
import { useAdmin } from '../contexts/AdminContext';
import { Eye, EyeOff, Save, Plus, Trash2 } from 'lucide-react';

const AdminDashboard = () => {
  const { isLoggedIn, login, logout, contentData, updateContent } = useAdmin();
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [activeTab, setActiveTab] = useState('hero');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!login(password)) {
      alert('Invalid password');
    }
    setPassword('');
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="bg-gray-900 p-8 rounded-lg border border-gray-800 max-w-md w-full">
          <h1 className="text-2xl font-bold text-white mb-6 text-center">Admin Login</h1>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-red-500 transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-400 hover:text-white"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
            
            <button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'hero', label: 'Hero Section' },
    { id: 'works', label: 'Reference Works' },
    { id: 'ideologies', label: 'Ideologies' },
    { id: 'faqs', label: 'FAQs' },
    { id: 'services', label: 'Services' },
    { id: 'team', label: 'Team' },
    { id: 'contact', label: 'Contact' }
  ];

  return (
    <div className="min-h-screen bg-black pt-20">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-white">Admin Dashboard</h1>
          <button
            onClick={logout}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Logout
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 mb-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                activeTab === tab.id
                  ? 'bg-red-600 text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="bg-gray-900 rounded-lg p-6">
          {activeTab === 'hero' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-white">Hero Section</h2>
              
              <div>
                <label className="block text-white font-semibold mb-2">Tagline</label>
                <input
                  type="text"
                  value={contentData.hero.tagline}
                  onChange={(e) => updateContent('hero', { ...contentData.hero, tagline: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-red-500"
                />
              </div>
              
              <div>
                <label className="block text-white font-semibold mb-2">Video URL</label>
                <input
                  type="text"
                  value={contentData.hero.videoUrl}
                  onChange={(e) => updateContent('hero', { ...contentData.hero, videoUrl: e.target.value })}
                  placeholder="Enter video URL or file path"
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-red-500"
                />
              </div>
            </div>
          )}

          {activeTab === 'ideologies' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-white">Brand Ideologies</h2>
              
              {contentData.ideologies.map((ideology: string, index: number) => (
                <div key={index} className="flex gap-4">
                  <textarea
                    value={ideology}
                    onChange={(e) => {
                      const newIdeologies = [...contentData.ideologies];
                      newIdeologies[index] = e.target.value;
                      updateContent('ideologies', newIdeologies);
                    }}
                    className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-red-500"
                    rows={3}
                  />
                  <button
                    onClick={() => {
                      const newIdeologies = contentData.ideologies.filter((_: any, i: number) => i !== index);
                      updateContent('ideologies', newIdeologies);
                    }}
                    className="text-red-500 hover:text-red-400 p-2"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              ))}
              
              <button
                onClick={() => {
                  const newIdeologies = [...contentData.ideologies, "New ideology"];
                  updateContent('ideologies', newIdeologies);
                }}
                className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                <Plus className="h-5 w-5" />
                Add Ideology
              </button>
            </div>
          )}

          {/* Other tab content would go here */}
          {activeTab !== 'hero' && activeTab !== 'ideologies' && (
            <div className="text-center py-12">
              <p className="text-gray-400 text-lg">
                {tabs.find(t => t.id === activeTab)?.label} management panel coming soon...
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
