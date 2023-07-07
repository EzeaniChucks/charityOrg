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
  delete_Pledge,
  editMemberRequest,
  edit_Pledge,
  remove_dispute,
  setAlertType,
  setEditsForPledgeForms,
  setEditsForRequestPage,
  updateEventForm,
} from "../../../redux/slices/eventSlice";
import { setCategoryName } from "../../../redux/slices/eventSlice";
import { log_Notification } from "../../../redux/slices/notificationsSlice";

const PledgeForm = ({
  handleChange,
  handleShowModal,
  error,
  eventId,
  dispatch,
  fullEventDetails,
  showModal,
  setShowModal,
  setModalType,
  eventPageName,
  ...item
}: any) => {
  const [isexpand, setIsExpand] = useState(false);
  const [isedit, setIsEdit] = useState(false);
  const {
    editRequestAmount,
    editRequestDescription,
    editPledgeAmount,
    editPledgeDescription,
    hasEditCompleted,
    loading,
    pledgeForms,
    pledgeDesc,
    pledgeAmount,
    pledgeDate,
  } = useSelector((store: any) => store.event);
  const { user } = useSelector((store: any) => store.user);
  const expandDropDown = () => {
    return setIsExpand(!isexpand);
  };

  useEffect(() => {
    if (hasEditCompleted) {
      setIsEdit(false);
      // dispatch(getMemberRequestList(eventId));
    }
    if (item?.disputes?.includes(user?.user?._id)) {
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
        <RxPerson />
        <h3>{item?.name}</h3>
        <h3>
          {isedit && (
            <input
              onChange={handleChange}
              name="editPledgeAmount"
              placeholder="edit amount"
              value={editPledgeAmount}
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
          <div style={{ gridTemplateColumns: "1fr 3fr", width: "100%" }}>
            <div>
              <h6>Pledge deadline</h6>
              <h6>
                {moment(new Date(item?.pledgeDateDeadline)).format(
                  "DD/MM/YY mm:ss a"
                )}
              </h6>
            </div>
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
                  value={editPledgeDescription}
                  onChange={handleChange}
                  name="editPledgeDescription"
                />
              )}
            </h6>
          </div>
          {user?.user?._id === item?.userId && (
            <div style={{ display: "flex" }}>
              {!isedit && (
                <button
                  className={style.btn_add}
                  style={{ width: "100%" }}
                  onClick={() => {
                    setIsEdit(!isedit);
                    dispatch(
                      setEditsForPledgeForms({
                        pledgeAmount: item?.amount,
                        pledgeDescription: item?.description,
                      })
                    );
                  }}
                >
                  Edit Pledge
                </button>
              )}
              {isedit && (
                <button
                  className={style.btn_add}
                  style={{ width: "100%" }}
                  onClick={() => {
                    dispatch(
                      edit_Pledge({
                        userId: user?.user?._id,
                        eventId,
                        description: editPledgeDescription,
                        pledgeDateDeadline: pledgeDate,
                        amount: editPledgeAmount,
                        name: `${user?.user?.firstName} ${user?.user?.lastName}`,
                      })
                    );
                    // dispatch(
                    //   log_Notification({
                    //     message: `${data?.name} has edited their pledge amount to NGN${data.amount} in your event ${fullEventDetails.eventName}. Click here to observe changes and dispute if necessary`,
                    //     userId: user.user._id,
                    //     link: `/events/backend_category/${eventId}/activity_room`,
                    //     eventId,
                    //     type: "request edit",
                    //     frontEndObjectId: item._id,
                    //   })
                    // );
                  }}
                  disabled={
                    item?.description === editPledgeDescription &&
                    item.amount === editPledgeAmount
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
                    handleShowModal();
                    setModalType("delete_pledge");
                  }}
                >
                  Delete Pledge
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
                      setEditsForPledgeForms({
                        pledgeAmount: "",
                        pledgeDescription: "",
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
        </div>
      )}
    </div>
  );
};

export default PledgeForm;
