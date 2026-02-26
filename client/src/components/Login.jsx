import React from 'react';
import { LogIn } from 'lucide-react';

const Login = ({ onLogin }) => {
  return (
    <div className="w-full max-w-md bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-10 shadow-2xl">
      <div className="text-center mb-8">
        <div className="bg-blue-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-blue-500/50">
          <LogIn className="text-white" size={32} />
        </div>
        <h2 className="text-3xl font-bold text-white">Welcome Back</h2>
        <p className="text-slate-400 mt-2">Sign in to manage your links</p>
      </div>
      
      <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); onLogin(); }}>
        <input 
          type="email" 
          placeholder="Email" 
          className="w-full bg-white/5 border border-white/10 p-3 rounded-xl text-white outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input 
          type="password" 
          placeholder="Password" 
          className="w-full bg-white/5 border border-white/10 p-3 rounded-xl text-white outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-blue-500/30 active:scale-95">
          Sign In
        </button>
      </form>
    </div>
  );
};

export default Login;