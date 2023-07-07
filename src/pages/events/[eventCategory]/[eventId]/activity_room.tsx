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
  FaTimesCircle,
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
import {
  getSingleEvent,
  leaveEvents,
  logError,
  setTabState,
} from "../../../../../redux/slices/eventSlice";
import { IoIosNotifications } from "react-icons/io";
import Notification from "@/components/notification/notification";
import {
  get_Notification,
  handleNotifModal,
} from "../../../../../redux/slices/notificationsSlice";
import { AppDispatch } from "../../../../../redux/store";
import { conString } from "@/utils/conString";
import { useRouter } from "next/router";
import { checkUser } from "@/utils/localstorage";
import { setUser } from "../../../../../redux/slices/authSlice";
import { io } from "socket.io-client";
import style from "./activity_room.module.css";
import styles2 from "../../../../components/auth/auth.module.css";

const socket = io(`${conString}`, {
  transports: ["websocket"],
});

const ActivityRoom = () => {
  const {
    tabState,
    fullEventDetails,
    singleEvent,
    joineventNotification,
    loading,
    error,
  } = useSelector((store: any) => store.event);
  const { notifLogStatus, notifModalIsOpen, notifications } = useSelector(
    (store: any) => store.notifications
  );
  const { user } = useSelector((store: any) => store.user);
  const [lowerTab, setLowerTab] = useState<String>("0");
  const [showModal, setShowModal] = useState<any>(false);

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

  useEffect(() => {
    if (eventId) dispatch(getSingleEvent(eventId));
  }, [eventId, joineventNotification]);

  useEffect(() => {
    if (error.type) {
      const timeout = setTimeout(() => {
        dispatch(logError({ type: "", msg: "" }));
      }, 5000);
      return () => clearTimeout(timeout);
    }
  }, [error, dispatch]);

  const isMember = () => {
    if (singleEvent.length > 0) {
      let checkMember = false;
      let checkObserver = false;

      singleEvent[0]?.members?.map((eachMem: any) => {
        if (eachMem?.userId === user?.user?._id) {
          return (checkMember = true);
        }
      });
      singleEvent[0]?.observers?.map((eachMem: any) => {
        if (eachMem.userId === user?.user?._id) {
          return (checkObserver = true);
        }
      });
      if (checkMember || checkObserver) {
        return true;
      } else {
        return false;
      }
    }
  };

  // console.log(isMember(), singleEvent);

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
        <title>Charity Org {/*{fullEventDetails?.eventName}*/}</title>
        <meta name="description" content="Event activity room" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/charityApp.png" />
      </Head>
      <main className={styles2.container}>
        <div className={style.content}>
          <div className={style.heading}>
            <div>
              <h3>{fullEventDetails?.eventName}</h3>
              {isMember() && (
                <h5
                  onClick={() => {
                    setShowModal(!showModal);
                  }}
                >
                  Leave event
                </h5>
              )}
            </div>
            {/* <label>
              Change member status
              <select>
                <option>Observer</option>
                <option>Depositor</option>
              </select>
            </label> */}
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
          {!isMember() && (
            <div className={style.mainField}>
              {`Unathorized access. You have either left this event or are never
              part of it. Go to the event's frontpage and click on the join button`}
            </div>
          )}
          {isMember() && (
            <>
              {tabState === "deposit" && (
                <DepositForm singleEvent={singleEvent} />
              )}
              {tabState === "request" && <RequestForm />}
              {tabState === "dispute" && <DisputeForm />}
              {tabState === "chat" && (
                <ChatRoom socket={socket} user={user} eventId={eventId} />
              )}
            </>
          )}
        </div>
        {notifModalIsOpen && (
          <div className={style.notification_modal}>
            <Notification />
          </div>
        )}
        {showModal && (
          <div className={style.modal}>
            <FaTimesCircle onClick={() => setShowModal(!showModal)} />
            <div>
              <h4>Want to leave event?</h4>
              <h5>
                If you have made deposit, your deposit history will remain. But
                you will no longer get notifications, make requests, lodge
                disputes or participate in the group chat
              </h5>
              <div>
                <button
                  onClick={() => {
                    dispatch(leaveEvents({ eventId, userId: user?.user?._id }));
                    setShowModal(!showModal);
                  }}
                  disabled={loading}
                >
                  Proceed?
                </button>
                <button>Reject</button>
              </div>
            </div>
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
        {error?.type === "server_error" && (
          <h5 className={style.warning}>{error?.code}</h5>
        )}
        {error?.type === "deposit_form_error" && (
          <h5 className={style.warning}>{error?.msg}</h5>
        )}
        <div className={styles2.particles}>
          <ParticlesComp />
        </div>
      </main>
    </>
  );
};

export default ActivityRoom;
