import { useDispatch, useSelector } from "react-redux";
// import style from "./accounts..module.css";
import { useEffect } from "react";
import { FaTimesCircle } from "react-icons/fa";
import style from "../../components/events/events.module.css";
import styles2 from "../../components/auth/auth.module.css";
import { currency_array } from "@/utils/fundsArrays";
import { AppDispatch } from "../../../redux/store";
import {
  get_country_banks,
  handleFillAccountsModule,
  updateWalletTopUpForm,
} from "../../../redux/slices/walletSlice";
const Accounts = () => {
  const {
    showFillAccounts,
    error,
    account_number,
    topup_currency,
    country_banks,
  } = useSelector((store: any) => store.wallet);
  const { user } = useSelector((store: any) => store.user);
  const dispatch = useDispatch<AppDispatch>();

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    dispatch(updateWalletTopUpForm({ name, value }));
  };

  useEffect(() => {
    if (topup_currency !== "") {
      dispatch(get_country_banks(topup_currency.slice(0, 2)));
    }
  }, [topup_currency]);

  const handleformcontdisplay = () => {
    if (!showFillAccounts) return style.eventformcontainer;
    else return [style.eventformcontainer, style.showformcontainer].join(" ");
  };
  const handleformdisplay = () => {
    if (!showFillAccounts) return style.eventform;
    else return [style.eventform, style.showeventform].join(" ");
  };
  return (
    // <div className={style.accounts_container}>
    //   <div className={style.accounts}>
    //     <h3>Accounts</h3>
    //     <label>
    //       account bank:
    //       <select>
    //         <option>GTB</option>
    //         <option>FirstBank</option>
    //       </select>
    //     </label>
    //     <label>
    //       account number:
    //       <input />
    //     </label>
    //   </div>
    // </div>
    <div className={handleformcontdisplay()}>
      <div style={{ height: "200px" }} className={handleformdisplay()}>
        <FaTimesCircle onClick={() => dispatch(handleFillAccountsModule())} />
        <h1>Account Details</h1>
        <div className={[styles2.formContainer, style.formContainer].join(" ")}>
          <div className={styles2.general_details}>
            <label>
              Currency :{" "}
              <select
                value={topup_currency}
                name={"topup_currency"}
                onChange={handleChange}
              >
                {currency_array.map((item: any, i) => {
                  const item_key = Object.keys(item)[0];
                  return <option key={i}>{`${item[item_key]}`}</option>;
                })}
              </select>
            </label>
            <label>
              Bank Name:{" "}
              <select
                // value={}
                name={""}
                onChange={handleChange}
              >
                {country_banks?.map((item: any) => {
                  return <option key={item.id}>{`${item.name}`}</option>;
                })}
              </select>
            </label>
            {error.type === "account_bank" && <h6>{error.msg}</h6>}
            <label>
              Account Number:{" "}
              <input
                value={account_number}
                type={"number"}
                name={"account_number"}
                onChange={handleChange}
              />
            </label>
            {error.type === "account_number" && <h6>{error.msg}</h6>}
            <button
              className={styles2.btn}
              //   onClick={() => dispatch(get_country_banks("XF"))}
            >
              Save
            </button>
          </div>
        </div>
      </div>
      <div className={style.eventformbackground}></div>
    </div>
  );
};

export default Accounts;
