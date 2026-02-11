import { useState } from "react";
import { useChatStore } from "../store/useChatStore";

import Sidebar from "../components/Sidebar";
import NoChatSelected from "../components/NoChatSelected";
import ChatContainer from "../components/ChatContainer";

import StatusSidebar from "../components/StatusSidebar";
import StatusViewer from "../components/StatusViewer";

const HomePage = () => {
  const { selectedUser, selectedGroup } = useChatStore();
  const isChatOpen = selectedUser || selectedGroup;

  const [activeTab, setActiveTab] = useState("chats"); // chats | status

  return (
    <div className="flex h-full w-full bg-base-200 overflow-hidden">

      {/* GLOBAL STATUS VIEWER */}
      <StatusViewer />

      {/* 📱 MOBILE */}
      <div className="flex h-full w-full md:hidden">
        {!isChatOpen ? (
          activeTab === "status" ? (
            <StatusSidebar setActiveTab={setActiveTab} />
          ) : (
            <Sidebar setActiveTab={setActiveTab} />
          )
        ) : (
          <ChatContainer />
        )}
      </div>

      {/* 🖥 DESKTOP */}
      <div className="hidden md:flex h-full w-full justify-center">
        <div className="flex h-full w-full max-w-6xl bg-base-100 shadow-md">

          {/* LEFT */}
          <div className="w-[288px] border-r border-base-300">
            {activeTab === "status" ? (
              <StatusSidebar setActiveTab={setActiveTab} />
            ) : (
              <Sidebar setActiveTab={setActiveTab} />
            )}
          </div>

          {/* RIGHT */}
          <div className="flex-1 overflow-hidden">
            {!isChatOpen ? <NoChatSelected /> : <ChatContainer />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
