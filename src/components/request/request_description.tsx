import { useEffect } from "react";
import { depositor_category_arrays } from "@/utils/arrays";
import { RxPerson } from "react-icons/rx";
import { FaArrowAltCircleDown, FaArrowAltCircleUp } from "react-icons/fa";
import { useState, useRef } from "react";
import style from "../deposit/deposit.module.css";
import moment from "moment";
import { useSelector } from "react-redux";
import {
  create_dispute,
  deleteMemberRequest,
  editMemberRequest,
  remove_dispute,
  setAlertType,
  setEditsForRequestPage,
  updateEventForm,
} from "../../../redux/slices/eventSlice";
import { setCategoryName } from "../../../redux/slices/eventSlice";
import { log_Notification } from "../../../redux/slices/notificationsSlice";

const Request_Description = ({
  handleFundDeposit,
  handleChange,
  handleShowModal,
  getMemberRequestList,
  error,
  eventId,
  dispatch,
  fullEventDetails,
  showModal,
  setShowModal,
  eventPageName,
  ...item
}: any) => {
  const [isexpand, setIsExpand] = useState(false);
  const [isedit, setIsEdit] = useState(false);
  const {
    editRequestAmount,
    editRequestDescription,
    hasEditCompleted,
    loading,
  } = useSelector((store: any) => store.event);
  const { user } = useSelector((store: any) => store.user);
  const expandDropDown = () => {
    return setIsExpand(!isexpand);
  };

  useEffect(() => {
    if (hasEditCompleted) {
      setIsEdit(false);
      dispatch(getMemberRequestList(eventId));
    }
    if (item?.disputes?.includes(user.user._id)) {
      if (document?.querySelector<any>(`.dispute-tick${item._id}`)) {
        document.querySelector<any>(`.dispute-tick${item._id}`).checked = true;
      }
    }
  }, [hasEditCompleted]);

  return (
    <div className={style.each_description}>
      <div
        style={{
          gridTemplateColumns:
            eventPageName === "disputes" ? "1fr 1fr 2fr 2fr" : "1fr 2fr 2fr",
          width: "100%",
          fontSize: "0.9rem",
        }}
        className={style.description_head}
      >
        {eventPageName === "disputes" && (
          <>
            {item?.userId !== user?.user?._id && (
              <input
                style={{ padding: "5px", borderRadius: "5px" }}
                type="checkbox"
                className={`dispute-tick${item._id}`}
                onChange={(e) => {
                  if (item?.disputes?.includes(user.user._id)) {
                    const data = {
                      requestId: item?._id,
                      requestOwnerId: item?.userId,
                      dispute_complainerId: user?.user._id,
                      eventId,
                    };
                    e.target.checked = false;
                    dispatch(remove_dispute(data));
                  } else {
                    const data = {
                      requestId: item?._id,
                      requestOwnerId: item?.userId,
                      dispute_complainerId: user?.user._id,
                      eventId,
                      description: "dispute stage disputation",
                    };
                    e.target.checked = true;
                    dispatch(create_dispute(data));
                  }
                  // console.log(e.target.checked);
                }}
                disabled={loading}
              />
            )}
            {item?.userId === user?.user?._id && <div></div>}{" "}
            {/*placeholder Div for styling*/}
          </>
        )}
        <RxPerson />
        <h3>{item?.name}</h3>
        <h3>
          {isedit && (
            <input
              onChange={handleChange}
              name="editRequestAmount"
              placeholder="edit amount"
              value={editRequestAmount}
              type="number"
              style={{ width: "100%" }}
            />
          )}
          {!isedit && (
            <>
              <span style={{ fontSize: "0.9rem" }}>
                amount{" "}
                <span style={{ color: "yellowgreen", marginRight: "3px" }}>
                  NGN{" "}
                </span>
              </span>
              {item?.amount}
            </>
          )}
          {!isexpand && <FaArrowAltCircleDown onClick={expandDropDown} />}
          {isexpand && <FaArrowAltCircleUp onClick={expandDropDown} />}
        </h3>
      </div>
      {isexpand && (
        <div className={style.description_body} id={item?._id}>
          <h2>{item?.disputes?.length} dispute(s)</h2>
          <div style={{ gridTemplateColumns: "1fr 3fr", width: "100%" }}>
            <h6>{moment(new Date(item?.date)).format("DD/MM/YY mm:ss a")}</h6>
            <h6
              style={{
                textAlign: "right",
                fontSize: "0.8rem",
                display: "flex",
                width: "100%",
                flexDirection: "column",
                gap: "10px",
              }}
            >
              <span style={{ fontSize: "1rem", color: "grey" }}>
                Description
              </span>
              {!isedit && item?.description}
              {isedit && (
                <textarea
                  rows={3}
                  placeholder="type new description"
                  style={{ width: "100%" }}
                  value={editRequestDescription}
                  onChange={handleChange}
                  name="editRequestDescription"
                />
              )}
            </h6>
          </div>
          {user?.user?._id === item?.userId &&
            eventPageName !== "disputes" &&
            eventPageName !== "disputes submission" && (
              <div style={{ display: "flex" }}>
                {!isedit && (
                  <button
                    className={style.btn_add}
                    style={{ width: "100%" }}
                    onClick={() => {
                      setIsEdit(!isedit);
                      dispatch(
                        setEditsForRequestPage({
                          requestAmount: item?.amount,
                          requestDescription: item?.description,
                          test: item.amount,
                        })
                      );
                    }}
                  >
                    Edit Request
                  </button>
                )}
                {isedit && (
                  <button
                    className={style.btn_add}
                    style={{ width: "100%" }}
                    onClick={() => {
                      const data = {
                        userId: user?.user?._id,
                        requestOwnerId: item?.userId,
                        eventId,
                        name: item?.name,
                        description: editRequestDescription,
                        amount: editRequestAmount,
                      };
                      dispatch(editMemberRequest({ data }));
                      dispatch(
                        log_Notification({
                          message: `${data?.name} has updated his request amount to NGN${data.amount} in your event ${fullEventDetails.eventName}. Click here to observe changes and dispute if necessary`,
                          userId: user.user._id,
                          link: `/events/backend_category/${eventId}/activity_room`,
                          eventId,
                          type: "request edit",
                          frontEndObjectId: item._id,
                        })
                      );
                    }}
                    disabled={
                      item?.description === editRequestDescription &&
                      item.amount === editRequestAmount
                        ? true
                        : false
                    }
                  >
                    Done
                  </button>
                )}
                {!isedit && (
                  <button
                    style={{ width: "100%" }}
                    className={style.btn_add}
                    onClick={() => {
                      const data = {
                        userId: user.user._id,
                        requestOwnerId: item?.userId,
                        eventId,
                      };
                      dispatch(deleteMemberRequest({ data }));
                      handleShowModal();
                    }}
                  >
                    Delete Request
                  </button>
                )}
                {isedit && (
                  <button
                    style={{
                      width: "100%",
                      backgroundColor: "rgb(97, 60, 52)",
                    }}
                    className={style.btn_add}
                    onClick={() => {
                      dispatch(
                        setEditsForRequestPage({
                          requestAmount: "",
                          requestDescription: "",
                        })
                      );
                      setIsEdit(false);
                    }}
                  >
                    Cancel
                  </button>
                )}
              </div>
            )}
          {user?.user?._id !== item?.userId &&
            eventPageName !== "disputes" &&
            eventPageName !== "disputes submission" && (
              <>
                {!item?.disputes?.includes(user?.user._id) && (
                  <button
                    onClick={() => {
                      dispatch(setAlertType("request dispute"));
                      setShowModal(!showModal);
                      dispatch(
                        updateEventForm({
                          name: "requestId",
                          value: item?._id,
                        })
                      );
                      dispatch(
                        updateEventForm({
                          name: "requestOwnerId",
                          value: item?.userId,
                        })
                      );
                    }}
                    className={style.btn_add}
                  >
                    Dispute This Request
                  </button>
                )}
                {item.disputes.includes(user?.user._id) && (
                  <button
                    className={style.btn_add}
                    style={{
                      width: "100%",
                      backgroundColor: "rgb(49, 25, 10)",
                      color: "rgb(125, 125, 125)",
                    }}
                    onClick={() => {
                      const data = {
                        requestId: item?._id,
                        requestOwnerId: item?.userId,
                        dispute_complainerId: user?.user._id,
                        eventId,
                      };
                      dispatch(remove_dispute(data));
                    }}
                  >
                    Remove dispute
                  </button>
                )}
              </>
            )}
        </div>
      )}
    </div>
  );
};

export default Request_Description;
