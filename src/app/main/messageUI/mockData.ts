// messageUI/mockData.ts

export type Message = {
    from: string;
    text: string;
    time: string;
  };
  
  export type User = {
    id: number;
    name: string;
    unread: number;
  };
  
  export const mockUsers: User[] = [
    { id: 1, name: "Alice", unread: 2 },
    { id: 2, name: "Bob", unread: 0 },
    { id: 3, name: "Charlie", unread: 1 },
  ];
  
  export const mockMessages: Record<number, Message[]> = {
    1: [
      { from: "Alice", text: "Hey there!", time: "10:00 AM" },
      { from: "me", text: "Hi Alice!", time: "10:01 AM" },
    ],
    2: [
      { from: "Bob", text: "Hello!", time: "9:30 AM" },
      { from: "me", text: "Hey Bob!", time: "9:31 AM" },
    ],
    3: [
      { from: "Charlie", text: "What's up?", time: "11:00 AM" },
      { from: "me", text: "All good, Charlie.", time: "11:01 AM" },
    ],
  };
  