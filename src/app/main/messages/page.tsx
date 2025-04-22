'use client';

import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Badge } from "~/components/ui/badge";
import { Search, Send, MoreVertical, Phone, Video, User, Paperclip } from "lucide-react";

// Mock data for users and messages
type User = {
  id: number;
  name: string;
  unread: number;
  avatar?: string;
  status?: "online" | "offline" | "away";
  lastSeen?: string;
};

type Message = {
  from: 'me' | 'them';
  text: string;
  time: string;
};

const mockUsers: User[] = [
  { id: 1, name: "Sofia Davis", unread: 3, status: "online" },
  { id: 2, name: "Jackson Lee", unread: 0, status: "away", lastSeen: "1h ago" },
  { id: 3, name: "Isabella Nguyen", unread: 1, status: "offline", lastSeen: "3h ago" },
  { id: 4, name: "Ethan Wilson", unread: 0, status: "online" },
  { id: 5, name: "Maria Rodriguez", unread: 2, status: "offline", lastSeen: "1d ago" }
];

const mockMessages: Record<number, Message[]> = {
  1: [
    { from: 'them', text: 'Hi, I wanted to discuss the project details', time: '10:24 AM' },
    { from: 'me', text: 'Sure, what specifically would you like to know?', time: '10:26 AM' },
    { from: 'them', text: 'When do you think you can deliver the first draft?', time: '10:28 AM' },
    { from: 'me', text: 'I can have something ready by tomorrow afternoon, is that workable for you?', time: '10:30 AM' },
  ],
  2: [
    { from: 'them', text: 'Hello, are you available for a quick call?', time: '9:15 AM' },
    { from: 'me', text: 'In about an hour I should be free', time: '9:17 AM' },
  ],
  3: [
    { from: 'them', text: 'I reviewed your proposal and have some feedback', time: 'Yesterday' },
    { from: 'me', text: 'That would be great! Please share when you can', time: 'Yesterday' },
    { from: 'them', text: 'Just sent it to your email', time: 'Yesterday' },
  ]
};

export default function MessagingPage() {
  const [activeUserId, setActiveUserId] = useState<number | null>(1);
  const [input, setInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [localMessages, setLocalMessages] = useState<Record<number, Message[]>>(mockMessages);
  
  const messages = activeUserId !== null ? localMessages[activeUserId] ?? [] : [];
  const activeUser = mockUsers.find(u => u.id === activeUserId);
  
  const filteredUsers = searchQuery 
    ? mockUsers.filter(user => 
        user.name.toLowerCase().includes(searchQuery.toLowerCase()))
    : mockUsers;
  
  const sendMessage = () => {
    if (!input.trim() || activeUserId === null) return;
    
    const newMessage: Message = {
      from: 'me',
      text: input,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    
    setLocalMessages(prev => ({
      ...prev,
      [activeUserId]: [...(prev[activeUserId] ?? []), newMessage],
    }));
    
    setInput('');
  };

  return (
    <div className="min-h-screen bg-[#141414] flex">
      {/* Sidebar */}
      <aside className="w-80 border-r border-gray-800 bg-[#1c1c1c] flex flex-col">
        <div className="p-4 border-b border-gray-800">
          <h2 className="text-lg font-medium text-white mb-4">Messages</h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search conversations"
              className="pl-10 bg-[#252525] border-gray-700 text-white"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto">
          {filteredUsers.map((user) => (
            <div
              key={user.id}
              onClick={() => setActiveUserId(user.id)}
              className={`cursor-pointer p-4 border-b border-gray-800 hover:bg-[#252525] transition-colors ${
                activeUserId === user.id ? 'bg-[#252525]' : ''
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Avatar className="h-10 w-10 bg-gray-800">
                    <AvatarImage src={user.avatar ?? "/api/placeholder/32/32"} />
                    <AvatarFallback className="bg-gray-800 text-white">
                      {user.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  {user.status === "online" && (
                    <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-[#1c1c1c]"></span>
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center">
                    <p className="text-sm font-medium text-white truncate">{user.name}</p>
                    <span className="text-xs text-gray-400">
                      {user.status === "online" 
                        ? "Online" 
                        : user.lastSeen ?? "Offline"}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center mt-1">
                    <p className="text-xs text-gray-400 truncate">
                      {localMessages[user.id] 
                        ? localMessages[user.id][localMessages[user.id].length - 1]?.text.substring(0, 25) + (localMessages[user.id][localMessages[user.id].length - 1]?.text.length > 25 ? '...' : '')
                        : 'No messages yet'}
                    </p>
                    {user.unread > 0 && (
                      <Badge className="bg-green-500 hover:bg-green-600 text-black text-xs">
                        {user.unread}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </aside>
      
      {/* Main Chat Window */}
      <main className="flex-1 flex flex-col">
        {activeUserId ? (
          <>
            {/* Chat header */}
            <div className="p-4 border-b border-gray-800 bg-[#1c1c1c] flex justify-between items-center">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10 bg-gray-800">
                  <AvatarImage src={activeUser?.avatar ?? "/api/placeholder/32/32"} />
                  <AvatarFallback className="bg-gray-800 text-white">
                    {activeUser?.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-white">{activeUser?.name}</p>
                  <p className="text-xs text-gray-400">
                    {activeUser?.status === "online" 
                      ? "Online" 
                      : activeUser?.lastSeen 
                        ? `Last seen ${activeUser.lastSeen}` 
                        : "Offline"}
                  </p>
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white hover:bg-[#252525]">
                  <Phone className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white hover:bg-[#252525]">
                  <Video className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white hover:bg-[#252525]">
                  <MoreVertical className="h-5 w-5" />
                </Button>
              </div>
            </div>
            
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 flex flex-col bg-[#141414]">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${msg.from === 'me' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs md:max-w-md lg:max-w-lg px-4 py-3 rounded-lg ${
                      msg.from === 'me'
                        ? 'bg-green-500 text-black'
                        : 'bg-[#1c1c1c] text-white'
                    }`}
                  >
                    <div>{msg.text}</div>
                    <div className={`text-xs mt-1 text-right ${msg.from === 'me' ? 'text-black/70' : 'text-gray-400'}`}>
                      {msg.time}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Message Input */}
            <div className="p-4 border-t border-gray-800 bg-[#1c1c1c] flex gap-3 items-center">
              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white hover:bg-[#252525]">
                <Paperclip className="h-5 w-5" />
              </Button>
              <Input
                type="text"
                placeholder="Type a message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                className="flex-1 bg-[#252525] border-gray-700 text-white"
              />
              <Button 
                onClick={sendMessage}
                className="bg-green-500 hover:bg-green-600 text-black"
                size="icon"
              >
                <Send className="h-5 w-5" />
              </Button>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center bg-[#141414] text-gray-400 flex-col gap-4">
            <div className="bg-[#1c1c1c] rounded-full p-6">
              <User className="h-10 w-10" />
            </div>
            <p className="text-lg">Select a conversation to start messaging</p>
          </div>
        )}
      </main>
    </div>
  );
}