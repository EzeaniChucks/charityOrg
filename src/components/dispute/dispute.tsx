import {
  FaArrowRight,
  FaList,
  FaMicrosoft,
  FaTimesCircle,
} from "react-icons/fa";
import {
  IoIosArrowDropdown,
  IoMdArrowDropdown,
  IoMdArrowDropup,
} from "react-icons/io";
import Deposit_Description from "../deposit/deposit_description";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useEffect, useState, ReactEventHandler } from "react";
import { AppDispatch } from "../../../redux/store";
import {
  getAllEventMembersAndObservers,
  getEventDetail,
  getMemberRequestList,
  handleEventModule,
  logError,
  updateEventForm,
  uploadMemberRequest,
} from "../../../redux/slices/eventSlice";
import moment from "moment";
import { checkUser } from "@/utils/localstorage";
import { setUser } from "../../../redux/slices/authSlice";
import Request_Description from "../request/request_description";
import SubmitDispute from "../appointJudges/submitDispute";
import SubmittedDisputeForms from "./submittedDisputeForms";
import style2 from "../../pages/events/[eventCategory]/[eventId]/activity_room.module.css";
import style from "../deposit/deposit.module.css";
import { CgArrowLongRightL } from "react-icons/cg";
import CountDownTime from "../countDownTimer/countdowntimer";

const DisputeForm = () => {
  const {
    fullEventDetails,
    memberRequestList,
    eventMembers,
    eventObservers,
    totalMemberRequestsAmount,
    requestAmount,
    requestDescription,
    disputeForms,
    error,
    loading,
    hasDisputeAddedOrRemoved,
    currency,
  } = useSelector((store: any) => store.event);
  const { user } = useSelector((store: any) => store.user);

  const [showModal, setShowModal] = useState<any>(false);

  const dispatch = useDispatch<AppDispatch>();
  const { isReady, push } = useRouter();
  const { eventId } = useRouter().query;

  const [showNominations, setShowNominations] = useState(false);
  // console.log(isReady, eventId);
  useEffect(() => {
    if (isReady) {
      dispatch(getEventDetail(eventId));
      dispatch(getAllEventMembersAndObservers(eventId));
      let userValue = checkUser();
      if (userValue) dispatch(setUser(userValue));
    }
  }, [isReady, dispatch]);

  useEffect(() => {
    dispatch(
      updateEventForm({
        name: "disputeForms",
        value: fullEventDetails.disputeForms,
      })
    );
  }, [fullEventDetails, dispatch]);

  useEffect(() => {
    if (eventId) {
      dispatch(getMemberRequestList(eventId));
    }
  }, [eventId, hasDisputeAddedOrRemoved, dispatch]);

  useEffect(() => {
    if (error.type) {
      const timeout = setTimeout(() => {
        dispatch(logError({ type: "", msg: "" }));
      }, 5000);
      return () => clearTimeout(timeout);
    }
  }, [error, dispatch]);

  const highestNominatedJudge = () => {
    let obj = { name: "", nominations: 0, userId: "" };
    let count = 0;
    eventObservers.map((item: any) => {
      if (item.nominations > count) {
        count = item.nominations;
        return (obj = item);
      }
    });
    return obj;
  };

  const handleChange: ReactEventHandler = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    dispatch(updateEventForm({ name, value }));
  };

  const handleShowModal = () => {
    return setShowModal(!showModal);
  };
  const getDateCountDown = (date: any) => {
    const dateVar = Math.ceil(
      (Date.parse(date) - Date.now()) / 1000 / 60 / 60 / 24
    );
    if (dateVar >= 0) return dateVar;
    else return 0;
  };
  // const calcRequestWithDispute = () => {
  //   let number = 0;
  //   memberRequestList?.map((item: any) => {
  //     if (item?.disputes.length > 0) {
  //       return number++;
  //     }
  //   });
  //   return number;
  // };
  const eventObserversUserIds = () => {
    const arr: any = [];
    eventObservers.map((item: any) => {
      return arr.push(item.userId);
    });
    return arr;
  };
  const calcAllDisputes = () => {
    let number = 0;
    memberRequestList?.map((item: any) => {
      if (item?.disputes.length > 0) {
        return (number += item.disputes.length);
      }
    });
    return number;
  };
  const calcOwnDisputes = () => {
    let number = 0;
    memberRequestList?.map((item: any) => {
      if (item?.disputes.includes(user?.user?._id)) {
        return number++;
      }
    });
    return number;
  };
  // console.log(highestNominatedJudge());
  return (
    <div className={style2.mainField} style={{ paddingBottom: "100px" }}>
      <div
        className={style.add_new_category}
        style={{ flexDirection: "row", justifyContent: "space-between" }}
      >
        <h3>Disputes</h3>
        <h5
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            cursor: "pointer",
            position: "relative",
          }}
        >
          <span
            style={{ display: "flex", alignItems: "center" }}
            onClick={() => setShowNominations(!showNominations)}
          >
            Nominated Judges List{" "}
            {!showNominations ? (
              <IoMdArrowDropdown style={{ fontSize: "1.3rem" }} />
            ) : (
              <IoMdArrowDropup style={{ fontSize: "1.3rem" }} />
            )}
          </span>
          {showNominations && (
            <span
              style={{
                position: "absolute",
                bottom: "-100px",
                right: "0",
                color: "rgb(20, 150, 50)",
                background: "rgb(20, 20, 60,0.8)",
                padding: "10px",
                minHeight: "100px",
                width: "100%",
              }}
            >
              {eventObservers.map((eachObserver: any) => {
                return (
                  <p
                    key={eachObserver?.userId}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    {eachObserver.name || "No name yet"} <FaArrowRight />{" "}
                    <span style={{ color: "red" }}>
                      {eachObserver.nominations || 0}
                    </span>
                  </p>
                );
              })}
            </span>
          )}
        </h5>
      </div>
      {eventObserversUserIds().includes(user?.user?._id) &&
        highestNominatedJudge().userId === user?.user?._id && (
          <div className={style.total_deposit_board}>
            <h2
              style={{
                margin: "-5px 0 10px 0",
                fontSize: "0.9rem",
                textAlign: "center",
                color: "rgb(50,150, 70)",
              }}
            >
              Hi{" "}
              <span style={{ color: "rgb(100, 150, 50)" }}>
                {highestNominatedJudge()?.name}
              </span>
              , you have been selected as the judge for this event !!!
            </h2>
            <h5 style={{ margin: "5px 0 10px 0", textAlign: "center" }}>
              {`As the observer with the highest nominations from members of this event, you will settle payment disputes arising from payment requests`}
            </h5>
            <h5 style={{ margin: "5px 0 10px 0", textAlign: "center" }}>
              Please click the button below to see the description on every
              disputed payment request and make a decision on payout based on
              your judgement
            </h5>
            <button
              className={style.btn_add}
              onClick={() =>
                push(`/events/backendCategory/${eventId}/payments`)
              }
            >
              Settle dispute/Payout
            </button>
          </div>
        )}
      <div className={style.total_deposit_board}>
        <div className={style.currency}>
          <p>Event summary</p>
          <div>
            Currency
            <IoIosArrowDropdown />
          </div>
        </div>
        <h3>Total Deposited Amount</h3>
        <h2
          style={{
            margin: "-5px 0 10px 0",
            fontSize: "1rem",
            color: "yellowgreen",
          }}
        >
          NGN {fullEventDetails.totalEventAmount}
        </h2>
        <h3>Requested Amount</h3>
        <h2
          style={{
            margin: "-5px 0 10px 0",
            fontSize: "1rem",
            color: "tomato",
          }}
        >
          NGN {totalMemberRequestsAmount}
        </h2>
        <div className={style.deadlines}>
          <div>
            <h4>Dispute TimeLimit</h4>
          </div>
          <h4>
            <CountDownTime targetDate={fullEventDetails?.disputeTimeLimit} />
          </h4>
        </div>
      </div>

      {!eventObserversUserIds().includes(user?.user?._id) && (
        <div className={style.depositors_container}>
          <div className={style.bar_handle}></div>
          <div className={style.grid_view}>
            <div>
              <FaList />
              <h6>List</h6>
            </div>
            <div>
              <FaMicrosoft />
              <h6>Grid</h6>
            </div>
          </div>
          <h5
            style={{
              textAlign: "center",
              margin: "10px 5px 15px 5px",
            }}
          >
            You lodged{" "}
            <span style={{ color: "rgb(200, 100, 100)" }}>
              {calcOwnDisputes()} dispute(s)
            </span>{" "}
            (out of the{" "}
            <span style={{ color: "rgb(200, 100, 100)" }}>
              {calcAllDisputes()} available
            </span>{" "}
            dispute(s) on all requests).
          </h5>
          <h6
            style={{
              textAlign: "justify",
              margin: "-15px 5px 15px 5px",
              fontSize: "0.75rem",
            }}
          >
            You should untick or tick each request below to delete / add
            disputes as you deem fit. If you have disputes, you will be given
            the option if appointing a judge, else await host's response on next
            stage (which is payment).
          </h6>
          <div className={style.depositors}>
            {memberRequestList?.length === 0 && (
              <p style={{ textAlign: "center" }}>
                No Requests Submitted yet. Fill form above to create first
                request
              </p>
            )}
            {memberRequestList?.map((item: any) => {
              return (
                <Request_Description
                  key={item._id}
                  {...item}
                  handleChange={handleChange}
                  handleShowModal={handleShowModal}
                  getMemberRequestList={getMemberRequestList}
                  error={error}
                  eventPageName={"disputes"}
                  eventId={eventId}
                  dispatch={dispatch}
                  isReady={isReady}
                />
              );
            })}
            <div>
              {calcOwnDisputes() > 0 && (
                <button
                  className={style.btn_add}
                  style={{ width: "100%", backgroundColor: "rgb(120, 50, 50)" }}
                  onClick={() => dispatch(handleEventModule())}
                >
                  Appoint Judge Over Disputes
                </button>
              )}
            </div>
          </div>
        </div>
      )}
      {showModal && (
        <div className={style.modal}>
          <FaTimesCircle onClick={handleShowModal} />
          <div>
            <h4>
              You are about to request {requestAmount}
              {" NGN"} from this event
            </h4>
            <h5>
              This amount will be sent to your bank account after all event
              disputes have been settled
            </h5>
            <div>
              <button disabled={loading}>Proceed?</button>
              <button>Reject</button>
            </div>
          </div>
        </div>
      )}
      {!eventObserversUserIds().includes(user?.user?._id) && (
        <div>
          <SubmittedDisputeForms
            disputeForms={disputeForms}
            error={error}
            isReady={isReady}
            dispatch={dispatch}
            eventId={eventId}
          />
        </div>
      )}
      {eventObserversUserIds().includes(user?.user?._id) &&
        !highestNominatedJudge().userId === user?.user?._id && (
          <h3 style={{ textAlign: "center", fontSize: "0.9rem" }}>
            You are viewing this page as an Observer. We will let you know if
            you are selected as a judge to settle disputes
          </h3>
        )}
      <SubmitDispute
        memberRequestList={memberRequestList}
        eventId={eventId}
        eventMembers={eventMembers}
        eventObservers={eventObservers}
      />
    </div>
  );
};

export default DisputeForm;
