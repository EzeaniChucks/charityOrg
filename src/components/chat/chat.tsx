import { useState, useEffect } from "react";
import style from "./chat.module.css";
import moment from "moment";

interface Arr {
  message: String;
  username: String;
  createdAt: String;
}
const ChatRoom = ({
  socket,
  user,
  eventId,
}: {
  socket: any;
  user: any;
  eventId: String | undefined | String[];
}) => {
  const [messages_received, setMessagesReceived] = useState<any>([
    { message: "", username: "", createdAt: "" },
  ]);
  const [messages_sent, setMessagesSent] = useState<any>("");

  const sendMessages = () => {
    if (messages_sent !== "") {
      const createdAt = Date.now();
      socket.emit("send_message", {
        username: user?.user.firstName,
        eventId,
        messages_sent,
        createdAt,
      });
      setMessagesSent("");
    }
  };
  console.log(messages_received);
  useEffect(() => {
    socket.emit("join_room", { username: user?.user?.firstName, eventId });
    socket.on("receive_message", (data: any) => {
      setMessagesReceived([
        ...messages_received,
        {
          message: data.message,
          username: data.username,
          createdAt: data.createdAt,
        },
      ]);
    });
    return () => socket.off("receive_message");
  }, [socket]);

  return (
    <div className={style.chat_container}>
      <div className={style.usersDiv}>Users online</div>
      <div className={style.chatroomDiv}>
        <div className={style.chatroom}>
          {messages_received.map((item: any, i: number) => {
            return (
              <div key={i}>
                <p>{item.username}</p>
                <p>{item.message}</p>
                <p>
                  {item?.createdAt && moment(item?.createdAt).format("mm:ss a")}
                </p>
              </div>
            );
          })}
        </div>
        <div className={style.postChat}>
          <textarea
            placeholder="Type text here"
            value={messages_sent}
            onChange={(e) => setMessagesSent(e.target.value)}
          />
          <button className={style.btn} onClick={sendMessages}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatRoom;
