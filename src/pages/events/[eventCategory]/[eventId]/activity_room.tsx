import Head from "next/head";
import ParticlesComp from "@/components/ParticlesComp";
import DepositForm from "@/components/deposit/deposit";
import RequestForm from "@/components/request/request";
import DisputeForm from "@/components/dispute/dispute";
import ChatRoom from "@/components/chat/chat";
import {
  FaArrowAltCircleLeft,
  FaGavel,
  FaIdCard,
  FaList,
  FaPiggyBank,
} from "react-icons/fa";
import { HiChatAlt2 } from "react-icons/hi";
import {
  AiFillCustomerService,
  AiFillDashboard,
  AiFillEnvironment,
  AiOutlineEllipsis,
} from "react-icons/ai";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTabState } from "../../../../../redux/slices/eventSlice";
import { IoIosNotifications } from "react-icons/io";
import Notification from "@/components/notification/notification";
import {
  get_Notification,
  handleNotifModal,
} from "../../../../../redux/slices/notificationsSlice";
import { AppDispatch } from "../../../../../redux/store";
import { io } from "socket.io-client";
import { conString } from "@/utils/conString";
import { useRouter } from "next/router";
import style from "./activity_room.module.css";
import styles2 from "../../../../components/auth/auth.module.css";
import { checkUser } from "@/utils/localstorage";
import { setUser } from "../../../../../redux/slices/authSlice";

const socket = io(conString, { transports: ["websocket"] });

const ActivityRoom = () => {
  const { tabState, fullEventDetails } = useSelector(
    (store: any) => store.event
  );
  const { notifLogStatus, notifModalIsOpen, notifications } = useSelector(
    (store: any) => store.notifications
  );
  const { user } = useSelector((store: any) => store.user);
  const [lowerTab, setLowerTab] = useState<String>("0");
  const dispatch = useDispatch<AppDispatch>();
  const [arrtest, setArrTest] = useState<any>([]);

  const { push } = useRouter();
  const { eventId } = useRouter().query;

  const testSocket = () => {
    // socket.emit<any>("join_room", { username: user?.user?.firstName, eventId });
    // socket.on("response", (data) => {
    //   setArrTest([...arrtest, data]);
    // });
  };
  // console.log(arrtest);
  useEffect(() => {
    const links = document.querySelectorAll(`.${style.link}`);
    links.forEach((item, i) => {
      item.classList.remove(`${style.active}`);
      if (i === Number(lowerTab)) {
        return item.classList?.add(`${style.active}`);
      }
    });
    const uppertabs = document.querySelector(`.${style.section_logos}`);
    uppertabs?.childNodes.forEach((item: any, i) => {
      item?.classList.remove(`${style.activeUpperTab}`);
      if (tabState === "deposit" && i === 0) {
        return item.classList?.add(`${style.activeUpperTab}`);
      }
      if (tabState === "request" && i === 1) {
        return item.classList?.add(`${style.activeUpperTab}`);
      }
      if (tabState === "dispute" && i === 2) {
        return item.classList?.add(`${style.activeUpperTab}`);
      }
      if (tabState === "chat" && i === 3) {
        return item.classList?.add(`${style.activeUpperTab}`);
      }
    });
  }, [lowerTab, tabState]);

  useEffect(() => {
    if (localStorage?.getItem("charityOrgTabState")) {
      dispatch(setTabState(localStorage.getItem("charityOrgTabState")));
    }
    let userValue = checkUser();
    if (userValue) dispatch(setUser(userValue));
  }, []);

  useEffect(() => {
    if (user) {
      dispatch(get_Notification(user?.user?._id));
    }
  }, [user, notifLogStatus]);

  // useEffect(() => {
  //   if (eventId) {
  //     socket.emit<any>(eventId, { post: "Message from frontend" });
  //   }
  // }, [eventId]);

  const uncheckedMessages = () => {
    let number = 0;
    notifications.map((item: any) => {
      if (item?.has_checked) return;
      return number++;
    });
    return number;
  };

  const setLowerTabState = (state: String) => {
    setLowerTab((prevState) => {
      prevState = state;
      return prevState;
    });
  };
  return (
    <>
      <Head>
        <title>Charity Org: {fullEventDetails?.eventName}</title>
        <meta name="description" content="Event activity room" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/charityApp.png" />
      </Head>
      <main className={styles2.container}>
        <div className={style.content}>
          <div className={style.heading}>
            <h3>{fullEventDetails?.eventName}</h3>
            <label>
              Change member status
              <select>
                <option>Observer</option>
                <option>Depositor</option>
              </select>
            </label>
          </div>
          <div className={style.section_logos}>
            <div
              onClick={() => {
                testSocket();
                dispatch(setTabState("deposit"));
              }}
            >
              <FaPiggyBank />
              <h4>Deposit</h4>
            </div>
            <div onClick={() => dispatch(setTabState("request"))}>
              <FaIdCard />
              <h4>Request</h4>
            </div>
            <div onClick={() => dispatch(setTabState("dispute"))}>
              <FaGavel />
              <h4>Dispute</h4>
            </div>
            <div onClick={() => dispatch(setTabState("chat"))}>
              <HiChatAlt2 />
              <h4>Chat</h4>
            </div>
          </div>
          <div className={style.allEventsDirector}>
            <div onClick={() => push("/events")}>
              <FaArrowAltCircleLeft />
              All Events
            </div>
            <AiOutlineEllipsis onClick={testSocket} />
          </div>
          {tabState === "deposit" && <DepositForm />}
          {tabState === "request" && <RequestForm />}
          {tabState === "dispute" && <DisputeForm />}
          {tabState === "chat" && (
            <ChatRoom socket={socket} user={user} eventId={eventId} />
          )}
        </div>
        {notifModalIsOpen && (
          <div className={style.notification_modal}>
            <Notification />
          </div>
        )}
        <div className={[style.bottom_bar_container].join(" ")}>
          <div className={style.bottom_bar}>
            <div
              onMouseOver={() => setLowerTabState("0")}
              onClick={() => dispatch(handleNotifModal())}
              className={[style.link, style.active].join(" ")}
            >
              {uncheckedMessages() > 0 && (
                <div className={style.notif_alert}>{uncheckedMessages()}</div>
              )}
              <IoIosNotifications />
              <p>Notifications</p>
            </div>
            <div
              onMouseOver={() => setLowerTabState("1")}
              onClick={() => push("/dashboard")}
              className={style.link}
            >
              <AiFillDashboard />
              <p>Dashboard</p>
            </div>
            <div
              onMouseOver={() => setLowerTabState("2")}
              onClick={() => push("/events")}
              className={style.link}
            >
              <AiFillEnvironment />
              <p>All events</p>
            </div>
            <div
              onMouseOver={() => setLowerTabState("3")}
              // onClick={() => setLowerTabState("3")}
              className={[style.link].join(" ")}
            >
              <AiFillCustomerService />
              <p>Customer Service</p>
            </div>
            <div
              // onClick={() => setLowerTabState("4")}
              className={style.indicator}
            ></div>
          </div>
        </div>
        <div className={styles2.particles}>
          <ParticlesComp />
        </div>
      </main>
    </>
  );
};

export default ActivityRoom;
