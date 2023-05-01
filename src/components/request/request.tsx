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
  setAlertType,
  uploadMemberRequest,
  create_dispute,
} from "../../../redux/slices/eventSlice";
import moment from "moment";
import { checkUser } from "@/utils/localstorage";
import { setUser } from "../../../redux/slices/authSlice";
import style2 from "../../pages/events/[eventCategory]/[eventId]/activity_room.module.css";
import style from "../deposit/deposit.module.css";
import Request_Description from "./request_description";
import { log_Notification } from "../../../redux/slices/notificationsSlice";
import CountDownTime from "../countDownTimer/countdowntimer";

const RequestForm = () => {
  const {
    fullEventDetails,
    memberRequestList,
    totalMemberRequestsAmount,
    requestAmount,
    requestDescription,
    error,
    loading,
    tabStateAlertType,
    disputeDescription,
    requestId,
    requestOwnerId,
    hasDisputeAddedOrRemoved,
    currency,
  } = useSelector((store: any) => store.event);
  const { user } = useSelector((store: any) => store.user);

  const [showModal, setShowModal] = useState<any>(false);

  const dispatch = useDispatch<AppDispatch>();
  const { isReady } = useRouter();
  const { eventId } = useRouter().query;

  useEffect(() => {
    if (isReady) {
      dispatch(getEventDetail(eventId));
      let userValue = checkUser();
      if (userValue) dispatch(setUser(userValue));
    }
  }, [isReady, eventId]);

  useEffect(() => {
    if (eventId) {
      dispatch(getMemberRequestList(eventId));
    }
  }, [eventId, hasDisputeAddedOrRemoved]);
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
    setShowModal(!showModal);
  };
  const handleShowModal = () => {
    // if (requestAmount === "" || requestDescription === "") {
    //   return dispatch(
    //     logError({
    //       type: "deposit_form_error",
    //       msg: "Deposit amount and new category name must be filled",
    //     })
    //   );
    // }
    setShowModal(!showModal);
    dispatch(setAlertType("request submit"));
  };

  const getDateCountDown = (date: any) => {
    const dateVar = Math.ceil(
      (Date.parse(date) - Date.now()) / 1000 / 60 / 60 / 24
    );
    if (dateVar >= 0) return dateVar;
    else return 0;
  };

  const handleDisputeSubmit = () => {
    const data = {
      requestId,
      requestOwnerId,
      dispute_complainerId: user?.user._id,
      eventId,
      description: disputeDescription,
    };
    dispatch(create_dispute(data));
    setShowModal(!showModal);
    dispatch(updateEventForm({ name: "disputeDescription", value: "" }));
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
  // useEffect(() => {
  //   if (memberRequestList) {

  //     // console.log("memberRequestList:", memberRequestList);
  //     console.log(calcDisputes(), calcRequestWithDispute());
  //   }
  // }, [memberRequestList]);

  return (
    <div className={style2.mainField}>
      <div className={style.add_new_category}>
        <h3>Make A Request</h3>
        <div style={{ flexDirection: "column" }}>
          {fullEventDetails.eventParticipantNumber ===
            memberRequestList.length && (
            <div className={style.request_completion}>
              <h3>All Users have made requests.</h3>
              {!calcDisputes() && (
                <>
                  <p className={style.request_ok}>
                    There are no disputes to settle.
                  </p>
                  <p className={style.request_ok}>
                    Awaiting host to move on to the next stage of disbursing
                    payments.
                  </p>
                </>
              )}
              {calcDisputes() > 0 && (
                <>
                  <p className={style.request_notok}>
                    But there are {calcDisputes()} dispute(s) on{" "}
                    {calcRequestWithDispute()} request(s) yet to be settled.
                  </p>
                  <p className={style.request_notok}>
                    If these are not resolved by participants before completion
                    deadline, they will be moved to dispute page for resolution
                  </p>
                </>
              )}
            </div>
          )}
          {fullEventDetails.eventParticipantNumber !==
            memberRequestList.length && (
            <>
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
            </>
          )}
        </div>
        {error?.type === "server_error" && (
          <h5 className={style.warning}>{error?.code}</h5>
        )}
        {error?.type === "deposit_form_error" && (
          <h5 className={style.warning}>{error?.msg}</h5>
        )}
      </div>
      <h3>Summary</h3>
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
            <h4>Request TimeLimit</h4>
          </div>
          <CountDownTime targetDate={fullEventDetails?.requestTimeLimit} />
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
                fullEventDetails={fullEventDetails}
                showModal={showModal}
                setShowModal={setShowModal}
              />
            );
          })}
        </div>
      </div>
      {showModal && (
        <>
          {tabStateAlertType === "request submit" && (
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
          {tabStateAlertType === "request dispute" && (
            <div className={style.modal}>
              <FaTimesCircle onClick={handleShowModal} />
              <div>
                <h4>
                  {`It appears you are dissatisfied with this user's request`}
                </h4>
                <h5>{`Let them know what to adjust in their request.`}</h5>
                <h6 style={{ color: "rgb(100, 30, 30)" }}>
                  {`Your
                identity won't be sent alongside this dispute`}
                </h6>
                <div>
                  <label>
                    <textarea
                      style={{
                        width: "100%",
                        marginBottom: "10px",
                        outline: "none",
                        color: "black",
                        padding: "10px",
                      }}
                      value={disputeDescription}
                      onChange={(e) =>
                        dispatch(
                          updateEventForm({
                            name: "disputeDescription",
                            value: e.target.value,
                          })
                        )
                      }
                      placeholder="Air your dissatisfaction"
                      rows={3}
                    />
                  </label>
                  <button disabled={loading} onClick={handleDisputeSubmit}>
                    Submit Dispute
                  </button>
                  <button onClick={() => setShowModal(!showModal)}>
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default RequestForm;
