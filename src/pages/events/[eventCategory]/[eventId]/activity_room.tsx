import Head from "next/head";
import ParticlesComp from "@/components/ParticlesComp";
import DepositForm from "@/components/deposit/deposit";
import RequestForm from "@/components/request/request";
import DisputeForm from "@/components/dispute/dispute";
import ChatRoom from "@/components/chat/chat";
import style from "./activity_room.module.css";
import styles2 from "../../../../components/auth/auth.module.css";
import {
  FaArrowAltCircleLeft,
  FaGavel,
  FaIdCard,
  FaList,
  FaPiggyBank,
} from "react-icons/fa";
import { HiChatAlt2 } from "react-icons/hi";
import { AiOutlineEllipsis } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { setTabState } from "../../../../../redux/slices/eventSlice";

const ActivityRoom = () => {
  const { tabState } = useSelector((store: any) => store.event);
  const dispatch = useDispatch();
  return (
    <>
      <Head>
        <title>Charity Org</title>
        <meta name="description" content="Event activity room" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/charityApp.png" />
      </Head>
      <main className={styles2.container}>
        <div className={style.content}>
          <div className={style.heading}>
            <FaList />
            <h2>Events Page</h2>
          </div>
          <div className={style.section_logos}>
            <div onClick={() => dispatch(setTabState("deposit"))}>
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
            <div>
              <FaArrowAltCircleLeft />
              All Events
            </div>
            <AiOutlineEllipsis />
          </div>
          {tabState === "deposit" && <DepositForm />}
          {tabState === "request" && <RequestForm />}
          {tabState === "dispute" && <DisputeForm />}
          {tabState === "chat" && <ChatRoom />}
        </div>
        <div className={styles2.particles}>
          <ParticlesComp />
        </div>
      </main>
    </>
  );
};

export default ActivityRoom;
