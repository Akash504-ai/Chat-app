import { useChatStore } from "../store/useChatStore";

import Sidebar from "../components/Sidebar";
import NoChatSelected from "../components/NoChatSelected";
import ChatContainer from "../components/ChatContainer";

const HomePage = () => {
  const { selectedUser, selectedGroup } = useChatStore();
  const isChatOpen = selectedUser || selectedGroup;

  return (
    <div className="flex h-full w-full bg-base-200 overflow-hidden">

      {/* 📱 MOBILE: FULL SCREEN */}
      <div className="flex h-full w-full md:hidden">
        {!isChatOpen ? <Sidebar /> : <ChatContainer />}
      </div>

      {/* 🖥 DESKTOP: CENTERED NARROW LAYOUT */}
      <div className="hidden md:flex h-full w-full justify-center">
        <div className="flex h-full w-full max-w-6xl bg-base-100 shadow-md">
          <Sidebar />
          <div className="flex-1 overflow-hidden">
            {!isChatOpen ? <NoChatSelected /> : <ChatContainer />}
          </div>
        </div>
      </div>

    </div>
  );
};

export default HomePage;
