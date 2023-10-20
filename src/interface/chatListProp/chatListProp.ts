export interface ChatListProps {
    onSelectChat: (chatId: string, Avatarurl: string, name: string,email:string,receiverId:string,joinedOn:string|Date) => void;
  }