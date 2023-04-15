import { depositor_category_arrays } from "@/utils/arrays";
import { RxPerson } from "react-icons/rx";
import { FaArrowAltCircleDown, FaArrowAltCircleUp } from "react-icons/fa";
import { useState } from "react";
import style from "./deposit.module.css";
import moment from "moment";
import { useSelector } from "react-redux";
import { setCategoryName } from "../../../redux/slices/eventSlice";

const Deposit_Description = ({
  handleFundDeposit,
  handleChange,
  handleShowModal,
  error,
  dispatch,
  ...item
}: any) => {
  // const{contributors, description, totalCategoryAmount,_id} = item
  const [isexpand, setIsExpand] = useState(false);
  const { depositAmount, categoryDesc } = useSelector(
    (store: any) => store.event
  );

  const expandDropDown = () => {
    return setIsExpand(!isexpand);
  };
  return (
    <div className={style.each_description}>
      <div className={style.description_head}>
        <RxPerson />
        <h3>{item?.description}</h3>
        <h3>
          NGN {item?.totalCategoryAmount}
          {!isexpand && <FaArrowAltCircleDown onClick={expandDropDown} />}
          {isexpand && <FaArrowAltCircleUp onClick={expandDropDown} />}
        </h3>
      </div>
      {isexpand && (
        <div className={style.description_body}>
          <div>
            <h6>Depositor</h6>
            <h6>Date</h6>
            <h6>Amount (NGN)</h6>
          </div>
          <hr />
          {item?.contributors.map((eachcontributor: any) => {
            return (
              <div key={eachcontributor?._id}>
                <p>{eachcontributor?.name}</p>
                <p>
                  {moment(new Date(eachcontributor?.date)).format(
                    "DD/MM/YYYY mm:ss a"
                  )}
                </p>
                <p>{eachcontributor?.amount}</p>
              </div>
            );
          })}
          <div>
            <input
              value={depositAmount}
              name="depositAmount"
              type="number"
              placeholder="Deposit amount"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                dispatch(setCategoryName(item?.description));
                handleChange(e);
              }}
            />
            <button
              className={style.btn_add}
              onClick={() => {
                handleShowModal();
              }}
            >
              Deposit
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Deposit_Description;
