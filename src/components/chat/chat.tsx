import { useState, useEffect, useCallback, Fragment } from "react";
import style from "./chat.module.css";
import moment from "moment";

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
  const [messages, setMessages] = useState<any>([]);
  const [textToSend, setTextToSend] = useState<any>("");
  const [joined, setJoined] = useState<boolean>(false);
  const [typingDisplay, setTypingDisplay] = useState<string>("");
  const [usersOnline, setUsersOnline] = useState<any>([]);

  const sendMessages = () => {
    if (messages_sent !== "") {
      const createdAt = Date.now();
      socket.emit("send_message", {
        username: user?.user.firstName,
        userId: user.user._id,
        eventId,
        messages_sent,
        createdAt,
      });
      setMessagesSent("");
    }
  };
  // console.log(messages_received);

  // useEffect(() => {
  //   if (eventId) {
  //     socket.emit("join_room", { username: user?.user?.firstName, eventId });
  //     console.log("amount of time my useffects ran");
  //     socket.on("receive_message", (data: any) => {
  //       console.log(data);
  //       setMessagesReceived((prevState: any) => [
  //         ...prevState,
  //         {
  //           message: data.message,
  //           username: data.username,
  //           createdAt: data.createdAt,
  //         },
  //       ]);
  //     });
  //     socket.on("chatroom_users", (data: any) => {
  //       console.log(data);
  //     });
  //   }
  //   return () => {
  //     socket.off("receive_message");
  //     socket.off("join_room");
  //   };
  // }, []);

  const join = () => {
    socket.emit(
      "join",
      {
        name: `${user?.user?.firstName} ${user?.user?.lastName}`,
        userId: user?.user?._id,
        eventId,
      },
      (names: any) => {}
    );
    socket.on("joined", (names: any) => {
      setUsersOnline(names);
    });
    socket.on("someoneDisconnect", (names: any) => {
      setUsersOnline(names);
    });
  };
  useEffect(() => {
    socket.emit("findAllMessages", { eventId }, (response: any) => {
      setMessages(response);
    });
    join();
    // console.log("amount of time i render");
  }, []);

  const listenForMessages = useCallback(() => {
    socket.on("message", (message: any) => {
      setMessages([...messages, message]);
    });
    socket.on(
      "typing",
      ({ name, isTyping }: { name: string; isTyping: boolean }) => {
        if (isTyping) {
          setTypingDisplay(`${name} is typing`);
        } else {
          setTypingDisplay("");
        }
      }
    );
  }, [messages, typingDisplay]);

  useEffect(() => {
    listenForMessages();
    return () => {
      socket.off("message", () => {
        console.log("Socket disconnected");
      });
    };
  }, [listenForMessages]);

  let timeout = setTimeout(() => {}, 1000);

  const emitTyping = () => {
    socket.emit("typing", { isTyping: true, eventId });
    timeout = setTimeout(() => {
      socket.emit("typing", { isTyping: false, eventId });
    }, 3000);
  };

  const sendMessage = () => {
    socket.emit(
      "createMessage",
      {
        text: textToSend,
        name: `${user?.user?.firstName} ${user?.user?.lastName}`,
        createdAt: new Date(),
        eventId,
      },
      () => {
        setTextToSend("");
      }
    );
  };

  useEffect(() => {
    // console.log(messages);
    return clearTimeout(timeout);
  }, [typingDisplay]);

  // console.log(messages);
  return (
    <div className={style.chat_container}>
      <div className={style.usersDiv}>
        Users online
        <div>
          {usersOnline?.map((eachUser: any, i: number) => {
            const value: any = Object.keys(eachUser)[0];
            return (
              <div key={i}>
                <p>{value.split(" ")[0]}</p>
                <span></span>
              </div>
            );
          })}
        </div>
      </div>
      <div className={style.chatroomDiv}>
        <div className={style.chatroom}>
          <p>{typingDisplay ? typingDisplay : <span>Event: EventName</span>}</p>
          {messages?.map((item: any, i: number) => {
            return (
              <div key={i}>
                <p>{item.name}</p>
                <p>{item.text}</p>
                <p>
                  {item?.createdAt && moment(item?.createdAt).format("hh:mm a")}
                </p>
              </div>
            );
          })}
        </div>
        <div className={style.postChat}>
          <textarea
            placeholder="Type text here"
            value={textToSend}
            onChange={(e) => {
              setTextToSend(e.target.value);
              emitTyping();
            }}
          />
          <button className={style.btn} onClick={sendMessage}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatRoom;
