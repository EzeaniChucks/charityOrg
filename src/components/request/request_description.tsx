import { depositor_category_arrays } from "@/utils/arrays";
import { RxPerson } from "react-icons/rx";
import { FaArrowAltCircleDown, FaArrowAltCircleUp } from "react-icons/fa";
import { useState } from "react";
import style from "../deposit/deposit.module.css";
import moment from "moment";
import { useSelector } from "react-redux";
import { setCategoryName } from "../../../redux/slices/eventSlice";

const Request_Description = ({
  handleFundDeposit,
  handleChange,
  handleShowModal,
  error,
  dispatch,
  ...item
}: any) => {
  // const{contributors, description, totalCategoryAmount,_id} = item
  const [isexpand, setIsExpand] = useState(false);
  const { depositAmount } = useSelector((store: any) => store.event);
  const expandDropDown = () => {
    return setIsExpand(!isexpand);
  };
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
          <span style={{ fontSize: "0.9rem" }}>
            amount{" "}
            <span style={{ color: "yellowgreen", marginRight: "3px" }}>
              NGN{" "}
            </span>
          </span>
          {item?.amount}
          {!isexpand && <FaArrowAltCircleDown onClick={expandDropDown} />}
          {isexpand && <FaArrowAltCircleUp onClick={expandDropDown} />}
        </h3>
      </div>
      {isexpand && (
        <div className={style.description_body}>
          <div style={{ gridTemplateColumns: "1fr 3fr" }}>
            <h6>{moment(new Date(item?.date)).format("DD/MM/YY mm:ss a")}</h6>
            <h6
              style={{
                textAlign: "right",
                fontSize: "0.8rem",
                display: "flex",
                flexDirection: "column",
                gap: "10px",
              }}
            >
              <span style={{ fontSize: "1rem", color: "grey" }}>
                Description
              </span>
              {item.description}
            </h6>
          </div>
          <div style={{ display: "flex" }}>
            {/* <input
              value={depositAmount}
              name="depositAmount"
              type="number"
              placeholder="Edit amount"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                dispatch(setCategoryName(item?.description));
                handleChange(e);
              }}
            /> */}
            <button
              className={style.btn_add}
              style={{ width: "100%" }}
              onClick={() => {
                handleShowModal();
              }}
            >
              Edit Amount
            </button>
            <button
              style={{ width: "100%" }}
              className={style.btn_add}
              onClick={() => {
                handleShowModal();
              }}
            >
              Delete Request
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Request_Description;
