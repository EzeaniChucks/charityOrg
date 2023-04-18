import { useEffect } from "react";
import { depositor_category_arrays } from "@/utils/arrays";
import { RxPerson } from "react-icons/rx";
import { FaArrowAltCircleDown, FaArrowAltCircleUp } from "react-icons/fa";
import { useState, useRef } from "react";
import style from "../deposit/deposit.module.css";
import moment from "moment";
import { useSelector } from "react-redux";
import {
  deleteMemberRequest,
  editMemberRequest,
  setEditsForRequestPage,
} from "../../../redux/slices/eventSlice";
import { setCategoryName } from "../../../redux/slices/eventSlice";

const Request_Description = ({
  handleFundDeposit,
  handleChange,
  handleShowModal,
  getMemberRequestList,
  error,
  eventId,
  dispatch,
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

  useEffect(() => {
    if (hasEditCompleted) {
      setIsEdit(false);
      dispatch(getMemberRequestList(eventId));
    }
  }, [hasEditCompleted]);

  return (
    <div className={style.each_description}>
      <div
        style={{
          gridTemplateColumns: "1fr 2fr 2fr",
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
        <div className={style.description_body}>
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
          {user?.user?._id === item?.userId && (
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
                  style={{ width: "100%", backgroundColor: "rgb(97, 60, 52)" }}
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
        </div>
      )}
    </div>
  );
};

export default Request_Description;
