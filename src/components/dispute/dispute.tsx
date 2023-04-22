import { FaList, FaMicrosoft, FaTimesCircle } from "react-icons/fa";
import { IoIosArrowDropdown } from "react-icons/io";
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
import style2 from "../../pages/events/[eventCategory]/[eventId]/activity_room.module.css";
import style from "../deposit/deposit.module.css";
import Request_Description from "../request/request_description";
import SubmitDispute from "../appointJudges/submitDispute";

const DisputeForm = () => {
  const {
    fullEventDetails,
    memberRequestList,
    eventMembers,
    eventObservers,
    totalMemberRequestsAmount,
    requestAmount,
    requestDescription,
    error,
    loading,
    hasDisputeAddedOrRemoved,
    currency,
  } = useSelector((store: any) => store.event);
  const { user } = useSelector((store: any) => store.user);

  const [showModal, setShowModal] = useState<any>(false);

  const dispatch = useDispatch<AppDispatch>();
  const { isReady } = useRouter();
  const { eventId } = useRouter().query;

  // console.log(isReady, eventId);
  useEffect(() => {
    if (isReady) {
      dispatch(getEventDetail(eventId));
      dispatch(getAllEventMembersAndObservers(eventId));
      let userValue = checkUser();
      if (userValue) dispatch(setUser(userValue));
    }
  }, [isReady]);

  useEffect(() => {
    if (eventId) {
      dispatch(getMemberRequestList(eventId));
    }
  }, [eventId]);

  useEffect(() => {
    if (error.type) {
      const timeout = setTimeout(() => {
        dispatch(logError({ type: "", msg: "" }));
      }, 5000);
      return () => clearTimeout(timeout);
    }
  }, [error]);

  useEffect(() => {
    if (eventId) {
      dispatch(getMemberRequestList(eventId));
    }
  }, [eventId, hasDisputeAddedOrRemoved]);

  const handleChange: ReactEventHandler = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    dispatch(updateEventForm({ name, value }));
  };
  const handleRequestSubmission = () => {
    if (!requestAmount || !requestDescription) {
      return dispatch(
        logError({
          type: "deposit_form_error",
          msg: "Amount can't be zero and request description can't be empty",
        })
      );
    }
    const finalObj = {
      userId: user?.user._id,
      eventId,
      name: `${user?.user.firstName} ${user?.user.lastName}`,
      description: requestDescription,
      amount: requestAmount,
      date: Date.now(),
    };

    dispatch(uploadMemberRequest(finalObj));
    // dispatch(resetEventPaymentInfo());
    setShowModal(!showModal);
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
  const calcRequestWithDispute = () => {
    let number = 0;
    memberRequestList?.map((item: any) => {
      if (item?.disputes.length > 0) {
        return number++;
      }
    });
    return number;
  };
  const calcDisputes = () => {
    let number = 0;
    memberRequestList?.map((item: any) => {
      if (item?.disputes.length > 0) {
        return (number += item.disputes.length);
      }
    });
    return number;
  };
  // console.log(memberRequestList);
  return (
    <div className={style2.mainField}>
      <div className={style.add_new_category}>
        <h3>Disputes</h3>
      </div>
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
            <h4>Completion Deadline</h4>
            <h4>
              {moment(new Date(fullEventDetails.completionDeadline)).format(
                "DD/MM mm:ss a"
              )}
            </h4>
          </div>
          <h4>
            {getDateCountDown(fullEventDetails.completionDeadline)} days left
          </h4>
        </div>
      </div>

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
            {calcDisputes()} disputes
          </span>{" "}
          (out of the{" "}
          <span style={{ color: "rgb(200, 100, 100)" }}>
            {calcRequestWithDispute()} available
          </span>{" "}
          disputes on all requests).
        </h5>
        <h6
          style={{
            textAlign: "justify",
            margin: "-15px 5px 15px 5px",
            fontSize: "0.75rem",
          }}
        >
          You should untick or tick each request below to delete / add disputes
          as you deem fit. If you have disputes, you will be given the option if
          appointing a judge, else await host's response on next stage (which is
          payment).
        </h6>
        <div className={style.depositors}>
          {memberRequestList?.length === 0 && (
            <p style={{ textAlign: "center" }}>
              No Requests Submitted yet. Fill form above to create first request
            </p>
          )}
          {memberRequestList?.map((item: any) => {
            return (
              <Request_Description
                key={item._id}
                {...item}
                handleRequestSubmission={handleRequestSubmission}
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
            {calcDisputes() > 0 && (
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
              <button onClick={handleRequestSubmission} disabled={loading}>
                Proceed?
              </button>
              <button>Reject</button>
            </div>
          </div>
        </div>
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
