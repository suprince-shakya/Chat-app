import { useChatStore } from "../store/useChatStore";
import { useEffect } from "react";
import Sidebar from "../components/Sidebar";
import NoChatSelected from "../components/NoChatSelected";
import ChatContainer from "../components/ChatContainer";

const HomePage = () => {
  const { selectedUser, subscribeToMessages, unsubscribeFromMessages } =
    useChatStore();

  useEffect(() => {
    subscribeToMessages();

    return () => unsubscribeFromMessages();
  }, [subscribeToMessages, unsubscribeFromMessages]);

  return (
    <div className="h-screen bg-base-200">
      <div className="flex items-center justify-center pt-16 px-2 h-screen">
        <div className="bg-base-100 rounded-lg shadow-cl w-full max-w-6xl h-[calc(100vh-5rem)]">
          <div className="flex h-full rounded-lg overflow-hidden">
            <Sidebar />

            {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
          </div>
        </div>
      </div>
    </div>
  );
};
export default HomePage;
