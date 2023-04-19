import { FaList, FaMicrosoft, FaTimesCircle } from "react-icons/fa";
import { IoIosArrowDropdown } from "react-icons/io";
import Deposit_Description from "../deposit/deposit_description";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useEffect, useState, ReactEventHandler } from "react";
import { AppDispatch } from "../../../redux/store";
import {
  acceptEventDeposit,
  getEventDetail,
  getMemberRequestList,
  logError,
  resetEventPaymentInfo,
  updateEventForm,
  uploadMemberRequest,
} from "../../../redux/slices/eventSlice";
import moment from "moment";
import { checkUser } from "@/utils/localstorage";
import { setUser } from "../../../redux/slices/authSlice";
import style2 from "../../pages/events/[eventCategory]/[eventId]/activity_room.module.css";
import style from "../deposit/deposit.module.css";
import Request_Description from "../request/request_description";

const DisputeForm = () => {
  const {
    fullEventDetails,
    memberRequestList,
    totalMemberRequestsAmount,
    requestAmount,
    requestDescription,
    error,
    loading,
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

  return (
    <div className={style2.mainField}>
      <div className={style.add_new_category}>
        <h3>Disputes</h3>
        {/* <div style={{ flexDirection: "column" }}>
          <input
            style={{ width: "100%" }}
            value={requestAmount}
            name="requestAmount"
            type="number"
            placeholder="Request amount"
            onChange={handleChange}
          />
          <textarea
            style={{ width: "100%" }}
            value={requestDescription}
            name="requestDescription"
            placeholder="Request Description"
            onChange={handleChange}
          />
          <button className={style.btn_add} onClick={handleShowModal}>
            Submit Your Request
          </button>
        </div>
        {error?.type === "server_error" && (
          <h5 className={style.warning}>{error?.code}</h5>
        )}
        {error?.type === "deposit_form_error" && (
          <h5 className={style.warning}>{error?.msg}</h5>
        )} */}
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
          <FaList />
          <div>
            <FaMicrosoft />
            <h6>Grid</h6>
          </div>
        </div>
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
                eventId={eventId}
                dispatch={dispatch}
              />
            );
          })}
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
    </div>
  );
};

export default DisputeForm;
