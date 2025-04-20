'use client';

import { useState } from 'react';
import { mockUsers, mockMessages } from './mockData';
import type { Message } from './mockData';


export default function MessagingPage() {
  const [activeUserId, setActiveUserId] = useState<number | null>(1);
  const [input, setInput] = useState('');
  const [localMessages, setLocalMessages] = useState<Record<number, Message[]>>(mockMessages);

  const messages = activeUserId !== null ? localMessages[activeUserId] ?? [] : [];

  const sendMessage = () => {
    if (!input.trim() || activeUserId === null) return;

    const newMessage: Message = {
      from: 'me',
      text: input,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setLocalMessages(prev => ({
      ...prev,
      [activeUserId]: [...(prev[activeUserId] || []), newMessage],
    }));

    setInput('');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside className="w-1/3 border-r bg-white max-w-sm">
        <div className="p-4 font-bold text-lg border-b">Chats</div>
        <ul>
          {mockUsers.map((user) => (
            <li
              key={user.id}
              onClick={() => setActiveUserId(user.id)}
              className={`cursor-pointer px-4 py-3 border-b hover:bg-gray-100 ${
                activeUserId === user.id ? 'bg-gray-200 font-semibold' : ''
              }`}
            >
              <div className="flex justify-between items-center">
                <span>{user.name}</span>
                {user.unread > 0 && (
                  <span className="bg-blue-600 text-white text-xs rounded-full px-2 py-0.5">
                    {user.unread}
                  </span>
                )}
              </div>
            </li>
          ))}
        </ul>
      </aside>

      {/* Main Chat Window */}
      <main className="flex flex-col h-screen w-full">
        <div className="p-4 border-b bg-white font-bold">
          {activeUserId ? mockUsers.find((u) => u.id === activeUserId)?.name : "Select a user"}
        </div>

        {/* Message List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2 flex flex-col">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`max-w-xs px-4 py-2 rounded-xl ${
                msg.from === 'me'
                  ? 'bg-blue-600 text-white self-end ml-auto'
                  : 'bg-gray-200 text-black self-start mr-auto'
              }`}
            >
              {msg.text}
              <div className="text-xs opacity-70 mt-1 text-right">{msg.time}</div>
            </div>
          ))}
        </div>

        {/* Message Input */}
        <div className="p-4 border-t bg-white flex gap-2">
          <input
            type="text"
            placeholder="Type a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            className="flex-1 border rounded-xl px-4 py-2"
          />
          <button
            onClick={sendMessage}
            className="bg-blue-600 text-white px-4 py-2 rounded-xl"
          >
            Send
          </button>
        </div>
      </main>
    </div>
  );
}
