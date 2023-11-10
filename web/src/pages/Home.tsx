import { useEffect, useState } from "react";
import { CreateMessage } from "../components/CreateMessage";
import { api } from "@/api";
import { Messages } from "../components/Messages";
import { useCookies } from "react-cookie";
import { Profile } from "@/components/Profile";

interface Message {
  id: string;
  title: string;
  message: string;
  created_at: Date;
}

export function Home() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [cookie] = useCookies(["token"]);
  const token = cookie["token"];

  useEffect(() => {
    const getMessages = async () => {
      const response = await api.get("/messages", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setMessages(response.data);
    };
    getMessages();
  }, []);

  return (
    <div className="w-[980px] h-screen mx-auto">
      <Profile />

      <CreateMessage />

      <h1 className="text-slate-200 font-bold text-4xl mx-5 my-8">Feed</h1>

      {messages.length == 0 ? (
        <h1 className="text-white text-4xl text-center">
          Sem mensagens no momento
        </h1>
      ) : (
        messages.map((msg) => (
          <Messages key={msg.id} title={msg.title} message={msg.message} />
        ))
      )}
    </div>
  );
}
