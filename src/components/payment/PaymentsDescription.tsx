import { useEffect } from "react";
import { depositor_category_arrays } from "@/utils/arrays";
import { RxPerson } from "react-icons/rx";
import { FaArrowAltCircleDown, FaArrowAltCircleUp } from "react-icons/fa";
import { useState, useRef } from "react";
import moment from "moment";
import { useSelector } from "react-redux";
import {
  create_dispute,
  deleteMemberRequest,
  editMemberRequest,
  remove_all_disputes,
  remove_dispute,
  setAlertType,
  setEditsForRequestPage,
  updateEventForm,
} from "../../../redux/slices/eventSlice";
import { setCategoryName } from "../../../redux/slices/eventSlice";
import { log_Notification } from "../../../redux/slices/notificationsSlice";
import style from "../deposit/deposit.module.css";

const Payments_Description = ({
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
  eventMembers,
  eventObservers,
  highestNominatedJudge,
  eventObserversUserIds,
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
          <h2>Dispute Descriptions</h2>
          <div
            style={{
              gridTemplateColumns: "1fr",
              width: "100%",
              marginTop: "10px",
            }}
          >
            {/* <h6>{moment(new Date(item?.date)).format("DD/MM/YY mm:ss a")}</h6> */}
            <h6
              style={{
                fontSize: "0.8rem",
                display: "flex",
                width: "100%",
                flexDirection: "column",
                gap: "10px",
              }}
            >
              {item?.disputeFormDescription.map((eachDesc: any) => {
                return <p key={eachDesc.userId}>{eachDesc.description}</p>;
              })}
              {isedit && Number(item.amount) !== Number(editRequestAmount) && (
                <textarea
                  rows={3}
                  placeholder="Describe why you edited requested amount"
                  style={{ width: "100%" }}
                  // value={editRequestDescription}
                  onChange={handleChange}
                  name="editRequestDescription"
                  disabled={
                    Number(item.amount) === Number(editRequestAmount)
                      ? true
                      : false
                  }
                />
              )}
            </h6>
          </div>
          {eventObserversUserIds().includes(user?.user?._id) &&
            highestNominatedJudge().userId === user?.user?._id && (
              // eventPageName !== "disputes" &&
              // eventPageName !== "disputes submission" &&
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
                        })
                      );
                    }}
                  >
                    Edit Amount
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
                      Number(item.amount) === Number(editRequestAmount)
                        ? true
                        : false
                    }
                  >
                    Done
                  </button>
                )}
                {!isedit && (
                  <button
                    onClick={() => {
                      dispatch(setAlertType("request dispute"));
                      setShowModal(!showModal);
                      const data = {
                        requestId: item?._id,
                        userId: user?.user._id,
                        eventId,
                        // eventId,
                        // requestId,
                        // userId,
                      };
                      console.log(data);
                      dispatch(remove_all_disputes({ data }));
                    }}
                    className={style.btn_add}
                    style={{ width: "100%" }}
                  >
                    Remove All Disputes
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
          {/* {user?.user?._id !== item?.userId &&
            eventPageName !== "disputes" &&
            eventPageName !== "disputes submission" && (
              <>
                {!item?.disputes?.includes(user?.user._id) && (
                  <button
                    onClick={() => {
                      dispatch(setAlertType("request dispute"));
                      setShowModal(!showModal);
                      
                    }}
                    className={style.btn_add}
                  >
                    Dispute This Request
                  </button>
                )}
              </>
            )} */}
        </div>
      )}
    </div>
  );
};

export default Payments_Description;
