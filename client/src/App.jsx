import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { LinkIcon, ClipboardIcon, CheckIcon, ExternalLink, Trash2, Search, AlertCircle, X, LogOut, LogIn } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

// --- Separate Login Component for Cleanliness ---
const Login = ({ onLogin }) => {
  return (
    <div className="relative z-10 w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-10 shadow-2xl animate-in fade-in zoom-in-95 duration-500">
      <div className="text-center mb-8">
        <div className="bg-blue-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-blue-500/50">
          <LogIn className="text-white" size={32} />
        </div>
        <h2 className="text-3xl font-bold text-white">Welcome</h2>
        <p className="text-slate-400 mt-2 text-sm">Sign in to manage your links</p>
      </div>
      
      <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); onLogin(); }}>
        <input 
          type="email" 
          placeholder="Email Address" 
          className="w-full bg-white/5 border border-white/10 p-3 rounded-xl text-white outline-none focus:ring-2 focus:ring-blue-500 transition-all"
        />
        <input 
          type="password" 
          placeholder="Password" 
          className="w-full bg-white/5 border border-white/10 p-3 rounded-xl text-white outline-none focus:ring-2 focus:ring-blue-500 transition-all"
        />
        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-blue-500/30 active:scale-95 mt-2">
          Sign In
        </button>
      </form>
    </div>
  );
};

function App() {
  const [url, setUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [copied, setCopied] = useState(false);
  const [urls, setUrls] = useState([]); 
  const [searchTerm, setSearchTerm] = useState('');
  const [isValid, setIsValid] = useState(true);
  
  // Auth & Modal States
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Start as logged out
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [targetId, setTargetId] = useState(null);

  const fetchUrls = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/urls');
      setUrls(res.data);
    } catch (err) {
      console.error("Error fetching URLs:", err);
    }
  };

  useEffect(() => {
    if (isLoggedIn) fetchUrls();
  }, [isLoggedIn]);

  const filteredUrls = urls.filter(item => 
    item.originalUrl.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.shortCode.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!url || !url.startsWith('http')) {
      setIsValid(false);
      toast.error('Invalid URL');
      setTimeout(() => setIsValid(true), 1000);
      return;
    }

    try {
      const res = await axios.post('http://localhost:5000/api/shorten', { originalUrl: url });
      setShortUrl(`http://localhost:5000/${res.data.shortCode}`);
      toast.success('Link Shortened!');
      setUrl(''); 
      fetchUrls(); 
    } catch (err) {
      toast.error('Something went wrong.');
    }
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/urls/${targetId}`);
      toast.success('Link deleted');
      setIsModalOpen(false);
      fetchUrls(); 
    } catch (err) {
      toast.error('Failed to delete');
    }
  };

  return (
    <div 
      className="min-h-screen w-full bg-cover bg-center bg-no-repeat bg-fixed relative flex flex-col items-center justify-center py-12 px-6 font-sans transition-all duration-700"
      style={{ backgroundImage: `url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop')` }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-[3px] pointer-events-none"></div>

      <Toaster position="top-center" />

      {!isLoggedIn ? (
        <Login onLogin={() => {
          setIsLoggedIn(true);
          toast.success('Welcome back, Aaryaman!');
        }} />
      ) : (
        <div className="relative z-10 w-full max-w-4xl flex flex-col items-center animate-in fade-in slide-in-from-bottom-4 duration-700">
          
          {/* Logout Button */}
          <button 
            onClick={() => setIsLoggedIn(false)}
            className="fixed top-6 right-6 bg-white/10 hover:bg-red-500/20 backdrop-blur-md border border-white/20 text-white px-4 py-2 rounded-xl flex items-center gap-2 transition-all active:scale-95 group"
          >
            <LogOut size={18} className="group-hover:text-red-400" /> Logout
          </button>

          {/* URL Shortener Card */}
          <div className="w-full max-w-3xl bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl p-8 mb-10 text-white">
            <h1 className="text-3xl font-bold text-center mb-8 flex items-center justify-center gap-2">
              <LinkIcon className="text-blue-400" /> URL Shortener
            </h1>

            <form onSubmit={handleSubmit} className="flex flex-col gap-2 mb-8">
              <div className="flex gap-2">
                <input
                  type="text"
                  className={`flex-1 p-3 bg-white/5 border rounded-xl transition-all duration-300 outline-none placeholder:text-slate-400 ${
                    !isValid ? 'border-red-500 bg-red-500/10 animate-shake' : 'border-white/10 focus:border-blue-500'
                  }`}
                  placeholder="Paste a long URL..."
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                />
                <button className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-3 rounded-xl font-bold transition shadow-lg active:scale-95">
                  Shorten
                </button>
              </div>
            </form>

            {shortUrl && (
              <div className="bg-blue-600/20 border border-blue-400/30 p-4 rounded-2xl flex items-center justify-between">
                <span className="text-blue-200 font-medium truncate mr-4">{shortUrl}</span>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(shortUrl);
                    toast.success('Copied!');
                  }}
                  className="bg-white/10 p-2 rounded-xl border border-white/20 hover:bg-white/20 transition"
                >
                  <ClipboardIcon size={20} className="text-white" />
                </button>
              </div>
            )}
          </div>

          {/* Activity Table Section */}
          <div className="w-full bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl p-8 text-white">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
              <h2 className="text-xl font-bold">Recent Activity</h2>
              <div className="relative w-full md:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                <input 
                  type="text"
                  placeholder="Search..."
                  className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-white/10 text-slate-400 text-sm uppercase">
                    <th className="pb-4 px-2">Original URL</th>
                    <th className="pb-4 px-2">Short Link</th>
                    <th className="pb-4 px-2 text-center">Clicks</th>
                    <th className="pb-4 px-2 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {filteredUrls.map((item) => (
                    <tr key={item._id} className="hover:bg-white/5 transition-colors">
                      <td className="py-4 px-2 max-w-[200px] truncate text-slate-300 text-sm">{item.originalUrl}</td>
                      <td className="py-4 px-2 text-blue-400 font-medium text-sm">
                        <a href={`http://localhost:5000/${item.shortCode}`} target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:underline">
                          {item.shortCode} <ExternalLink size={14} />
                        </a>
                      </td>
                      <td className="py-4 px-2 text-center">
                        <span className="bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full text-xs font-bold border border-blue-500/20">{item.clicks}</span>
                      </td>
                      <td className="py-4 px-2 text-right">
                        <button onClick={() => { setTargetId(item._id); setIsModalOpen(true); }} className="text-slate-400 hover:text-red-400 transition p-1.5"><Trash2 size={18} /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md">
          <div className="bg-slate-900 border border-white/10 rounded-3xl p-6 w-[90%] max-w-md shadow-2xl text-white">
            <h3 className="text-xl font-bold mb-2">Confirm Delete</h3>
            <p className="text-slate-400 mb-6 text-sm">Are you sure? This action is permanent.</p>
            <div className="flex gap-3">
              <button onClick={() => setIsModalOpen(false)} className="flex-1 py-3 bg-white/5 rounded-xl">Cancel</button>
              <button onClick={confirmDelete} className="flex-1 py-3 bg-red-600 rounded-xl font-bold">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;