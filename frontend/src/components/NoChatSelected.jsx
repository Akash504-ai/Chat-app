import { MessageSquare, Users, Sparkles, ShieldCheck } from "lucide-react";

const NoChatSelected = () => {
  return (
    <div className="mt-[20px] w-full flex flex-1 flex-col items-center justify-center p-6 sm:p-16 bg-base-100 relative overflow-hidden">
      
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: `radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)`, backgroundSize: '24px 24px' }}>
      </div>

      <div className="max-w-md text-center space-y-8 relative z-10">
        
        {/* Animated Icon Display */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            {/* Background Glow */}
            <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full animate-pulse"></div>
            
            <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center border border-primary/20 shadow-2xl animate-bounce">
              <MessageSquare className="w-10 h-10 sm:w-12 sm:h-12 text-primary" />
              
              {/* Decorative mini-icons */}
              <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-base-100 shadow-lg flex items-center justify-center animate-pulse">
                <Sparkles className="w-4 h-4 text-warning" />
              </div>
            </div>
          </div>
        </div>

        {/* Welcome Text */}
        <div className="space-y-2">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Welcome to <span className="text-primary bg-clip-text">PASO</span>
          </h2>
          <p className="text-base-content/60 text-base sm:text-lg max-w-[320px] mx-auto">
            Select a conversation from the sidebar to start chatting with friends or AI.
          </p>
        </div>

        {/* Feature Grid - Adds "Life" to the empty state */}
        <div className="grid grid-cols-3 gap-4 pt-8 border-t border-base-300/50">
          <div className="flex flex-col items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-base-200 flex items-center justify-center">
              <Users className="w-5 h-5 opacity-70" />
            </div>
            <span className="text-[10px] uppercase tracking-wider font-bold opacity-40">Groups</span>
          </div>
          
          <div className="flex flex-col items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-base-200 flex items-center justify-center">
              <Sparkles className="w-5 h-5 opacity-70" />
            </div>
            <span className="text-[10px] uppercase tracking-wider font-bold opacity-40">AI Chat</span>
          </div>

          <div className="flex flex-col items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-base-200 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 opacity-70" />
            </div>
            <span className="text-[10px] uppercase tracking-wider font-bold opacity-40">Secure</span>
          </div>
        </div>
      </div>

      {/* Footer Branding */}
      <div className="absolute bottom-8 flex items-center gap-2 opacity-20 hover:opacity-50 transition-opacity">
        <div className="w-2 h-2 rounded-full bg-success animate-ping"></div>
        <span className="text-xs font-medium uppercase tracking-widest">End-to-End Encrypted</span>
      </div>
    </div>
  );
};

export default NoChatSelected;