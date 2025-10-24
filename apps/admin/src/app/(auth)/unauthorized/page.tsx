"use client";

import { useAuth } from "@clerk/nextjs";

const Page = () => {
  const { signOut } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-8 text-center text-white">
          {/* Animated Icon */}
          <div className="mb-6 animate-bounce">
            <div className="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center mx-auto border border-red-400/30">
              <svg className="w-10 h-10 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
          </div>

          <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-red-400 to-pink-400 bg-clip-text text-transparent">Access Forbidden</h1>

          <p className="text-gray-300 mb-2 text-lg">Unauthorized Access Attempt</p>
          <p className="text-gray-400 mb-8 text-sm">Your credentials dont grant you access to this resource</p>

          <div className="space-y-4">
            <button onClick={() => signOut()} className="flex-1 bg-red-500/20 text-red-300 py-3 px-4 rounded-xl font-medium hover:bg-red-500/30 transition-colors border border-red-400/30">
              🔓 Sign Out
            </button>
          </div>

          <div className="mt-6 pt-6 border-t border-white/10">
            <p className="text-gray-400 text-xs">If you believe this is an error, please contact support</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
