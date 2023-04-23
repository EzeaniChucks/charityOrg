import { useEffect } from "react";
import { depositor_category_arrays } from "@/utils/arrays";
import { RxPerson } from "react-icons/rx";
import { FaArrowAltCircleDown, FaArrowAltCircleUp } from "react-icons/fa";
import { useState, useCallback } from "react";
import style from "../deposit/deposit.module.css";
import moment from "moment";
import { useSelector } from "react-redux";
import { log_Notification } from "../../../redux/slices/notificationsSlice";

const Dispute_Form_Description = ({
  handleFundDeposit,
  handleChange,
  handleShowModal,
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
  const { editRequestAmount, editRequestDescription, hasEditCompleted } =
    useSelector((store: any) => store.event);
  const { user } = useSelector((store: any) => store.user);
  const expandDropDown = () => {
    return setIsExpand(!isexpand);
  };

  //   const memberRequestListCallback = useCallback(() => {
  //     return getMemberRequestList(eventId);
  //   }, []);
  useEffect(() => {
    // if (hasEditCompleted) {
    //   setIsEdit(false);
    //   dispatch(memberRequestListCallback());
    // }
    if (item?.disputes?.includes(user.user._id)) {
      if (document?.querySelector<any>(`.dispute-tick${item._id}`)) {
        document.querySelector<any>(`.dispute-tick${item._id}`).checked = true;
      }
    }
  }, [hasEditCompleted, dispatch, eventId]);

  return (
    <div className={style.each_description}>
      <h5 style={{ margin: "0px 6px", color: "rgb(50, 100, 150)" }}>
        Description:
      </h5>
      <h6 style={{ margin: "-8px 15px 5px 15px" }}>{item?.description}</h6>
      <h5 style={{ margin: "13px 6px 0 6px", color: "rgb(50, 100, 150)" }}>
        List of affected requests
      </h5>
      {item?.disputedRequests.map((indivReq: any) => {
        return (
          <div key={indivReq._id}>
            <div
              key={indivReq._id}
              style={{
                gridTemplateColumns:
                  eventPageName === "disputes"
                    ? "1fr 1fr 2fr 2fr"
                    : "1fr 2fr 2fr",
                width: "100%",
                fontSize: "0.9rem",
              }}
              className={style.description_head}
            >
              <RxPerson />
              <h3>{indivReq?.name}</h3>
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
                      <span
                        style={{ color: "yellowgreen", marginRight: "3px" }}
                      >
                        NGN{" "}
                      </span>
                    </span>
                    {indivReq?.amount}
                  </>
                )}
                {!isexpand && <FaArrowAltCircleDown onClick={expandDropDown} />}
                {isexpand && <FaArrowAltCircleUp onClick={expandDropDown} />}
              </h3>
            </div>
            {isexpand && (
              <div className={style.description_body} id={indivReq?._id}>
                <h2>{indivReq?.disputes?.length} dispute(s)</h2>
                <div style={{ gridTemplateColumns: "1fr 3fr", width: "100%" }}>
                  <h6>
                    {moment(new Date(indivReq?.date)).format(
                      "DD/MM/YY mm:ss a"
                    )}
                  </h6>
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
                    {!isedit && indivReq?.description}
                  </h6>
                </div>
              </div>
            )}
          </div>
        );
      })}
      <h5 style={{ margin: "13px 6px 0 6px", color: "rgb(50, 100, 150)" }}>
        Judge Nominated for this dispute
      </h5>
      <h6 style={{ margin: "-8px 15px 5px 15px" }}>
        {item?.appointedJudge?.name
          ? item.appointedJudge.name
          : item.appointedJudge.userId}
      </h6>
    </div>
  );
};

export default Dispute_Form_Description;
