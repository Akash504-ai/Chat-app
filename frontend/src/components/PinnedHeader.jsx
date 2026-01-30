import { Pin, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useChatStore } from "../store/useChatStore";

const PinnedHeader = () => {
  const { pinnedMessages, messages, togglePin } = useChatStore();

  // Get active pinned IDs
  const pinnedIds = Object.keys(pinnedMessages || {}).filter(
    (id) => pinnedMessages[id]
  );

  if (pinnedIds.length === 0) return null;

  // Get the actual message object to show a preview of the text
  const pinnedId = pinnedIds[pinnedIds.length - 1]; // Show most recently pinned
  const pinnedMsg = messages?.find(m => m._id === pinnedId);

  const scrollToMessage = () => {
    const el = document.getElementById(`msg-${pinnedId}`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
      // Brief highlight effect
      el.classList.add("ring-2", "ring-primary/50", "transition-all");
      setTimeout(() => el.classList.remove("ring-2", "ring-primary/50"), 2000);
    }
  };

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -20, opacity: 0 }}
        className="sticky top-0 z-[45] w-full"
      >
        {/* Glassmorphism Container */}
        <div className="flex items-center justify-between gap-3 px-4 py-2 bg-base-100/80 backdrop-blur-md border-b border-base-content/5 shadow-sm">
          
          <div className="flex items-center gap-3 overflow-hidden flex-1">
            {/* Left Accent Bar */}
            <div className="w-1 h-8 bg-primary rounded-full" />
            
            <button
              onClick={scrollToMessage}
              className="flex flex-col items-start overflow-hidden text-left transition-opacity hover:opacity-80"
            >
              <div className="flex items-center gap-1.5">
                <Pin size={12} className="text-primary fill-primary" />
                <span className="text-[11px] font-bold uppercase tracking-wider text-primary">
                  Pinned Message
                </span>
              </div>
              
              {/* Message Preview */}
              <p className="text-sm text-base-content/70 truncate w-full max-w-md italic">
                {pinnedMsg?.text || (pinnedMsg?.image ? "📷 Image" : "Attachment")}
              </p>
            </button>
          </div>

          <button
            onClick={() => togglePin(pinnedId)}
            className="flex-shrink-0 p-2 rounded-full hover:bg-base-content/10 text-base-content/40 hover:text-base-content transition-colors"
            title="Unpin"
          >
            <X size={16} />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default PinnedHeader;