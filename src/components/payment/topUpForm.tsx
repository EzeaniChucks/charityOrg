import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../redux/store";
import {
  handleTopUpModule,
  updateWalletTopUpForm,
} from "../../../redux/slices/walletSlice";
import { FaTimesCircle } from "react-icons/fa";
import { FlutterWaveButton, closePaymentModal } from "flutterwave-react-v3";
import { country_array, currency_array } from "@/utils/fundsArrays";
import style from "../../components/events/events.module.css";
import styles2 from "../../components/auth/auth.module.css";
import { conStringFrontEnd } from "@/utils/conString";
import { fetchChargeRange } from "../../../redux/slices/adminSettingsSlice";

const TopUpForm = () => {
  const {
    showWalletTopUp,
    error,
    public_key,
    tx_ref,
    topup_amount,
    topup_currency,
    topup_country,
  } = useSelector((store: any) => store.wallet);
  const { user } = useSelector((store: any) => store.user);
  const { walletChargeRangeArray } = useSelector(
    (store: any) => store.adminsettings
  );
  const [topUpAmountAndTax, setTopUpAmountPlusTax] = useState(0);
  const [chargePercent, setChargePercent] = useState(0);
  const [chargeAmount, setChargeAmount] = useState(0);
  const dispatch = useDispatch<AppDispatch>();

  const handleChange = (e: any) => {
    let { name, value } = e.target;
    dispatch(updateWalletTopUpForm({ name, value }));

    if (name === "topup_amount") {
      let highestAmount = 0;
      walletChargeRangeArray.map((eachRange: any) => {
        let { to, from, percent } = eachRange;
        to = Number(to);
        from = Number(from);
        percent = Number(percent);
        value = Number(value);
        if (to > highestAmount) {
          highestAmount = to;
        }
        if (value >= from && value <= to) {
          setTopUpAmountPlusTax(value + (value * percent) / 100);
          setChargePercent(percent);
          setChargeAmount((value * percent) / 100);
        }
        if (value >= highestAmount) {
          setTopUpAmountPlusTax(value + (value * percent) / 100);
          setChargePercent(percent);
          setChargeAmount((value * percent) / 100);
        }
      });
    }
  };
  // useEffect(() => {
  //   console.log(topUpAmountAndTax);
  //   console.log(chargeAmount);
  //   console.log(walletChargeRangeArray);
  // }, [topUpAmountAndTax]);
  const config = {
    public_key,
    tx_ref,
    amount: Number(topUpAmountAndTax),
    currency: topup_currency,
    country: topup_country,
    payment_options: "card",
    redirect_url: `${conStringFrontEnd}/dashboard?chargeAmount=${chargeAmount}`,
    customer: {
      email: user.user.email,
      phone_number: "08067268692",
      name: `${user.user.firstName} ${user.user.lastName}`,
    },
    text: "PAY",
    customizations: {
      title: "Charity App Funds",
      description: "Make payment into wallet",
      logo: "https://cdn.iconscout.com/icon/premium/png-256-thumb/payment-2193968-1855546.png",
    },
    callback: function (data: any) {
      // console.log(data);
      // closePaymentModal();
    },
    onClose: function () {
      //close modal
    },
  };
  const handleformcontdisplay = () => {
    if (!showWalletTopUp) return style.eventformcontainer;
    else return [style.eventformcontainer, style.showformcontainer].join(" ");
  };
  const handleformdisplay = () => {
    if (!showWalletTopUp) return style.eventform;
    else return [style.eventform, style.showeventform].join(" ");
  };

  useEffect(() => {
    dispatch(fetchChargeRange());
  }, []);

  return (
    <div className={handleformcontdisplay()}>
      <div style={{ height: "200px" }} className={handleformdisplay()}>
        <FaTimesCircle onClick={() => dispatch(handleTopUpModule())} />
        <h1>Top Up Wallet</h1>
        <div className={[styles2.formContainer, style.formContainer].join(" ")}>
          <div className={styles2.general_details}>
            <label>
              Amount:{" "}
              <input
                value={topup_amount}
                type={"number"}
                name={"topup_amount"}
                onChange={handleChange}
              />
            </label>
            {chargeAmount > 0 && (
              <h6>
                {" "}
                You will be charged {chargeAmount}
                {topup_currency} extra ({chargePercent}%) on this amount.
              </h6>
            )}
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
            {/* {error.type === "timeZone" && <h6>{error.msg}</h6>} */}

            <label>
              Country :{" "}
              <select
                value={topup_country}
                name={"topup_country"}
                onChange={handleChange}
              >
                {country_array.map((item: any, i) => {
                  return <option key={i}>{`${item.country}`}</option>;
                })}
              </select>
            </label>
            {error.type === "currency" && <h6>{error.msg}</h6>}

            {error.type === "amount" && <h6>{error.msg}</h6>}
            {/* {error.type !== "" && <h6>{"An error occured"}</h6>} */}
            <FlutterWaveButton className={styles2.btn} {...config} />
          </div>
        </div>
      </div>
      <div className={style.eventformbackground}></div>
    </div>
  );
};

export default TopUpForm;

{
  /* {error.type === "eventName" && <h6>{error.msg}</h6>}
            <label>
              Card Number:{" "}
              <input
                // value={cardNumber}
                type={"number"}
                name={"cardNumber"}
                onChange={handleChange}
              />
            </label>
            {error.type === "cardNumber" && <h6>{error.msg}</h6>}
            <div className={styles2.expiration_input}>
              <label>
                Expiration Date:{" "}
                <div
                  style={{
                    display: "flex",
                    gap: "10px",
                    alignItems: "center",
                  }}
                >
                  <ReactDatePicker
                    placeholderText="day/month/year e.g 01/01/2000"
                    selected={new Date()}
                    dateFormat="dd/MM"
                    onChange={(date: Date) => {
                      // dispatch(
                      //   updateEventForm({
                      //     name: "eventDate",
                      //     value: moment(date).format(),
                      //   })
                      // );
                    }}
                    showYearDropdown
                    scrollableYearDropdown
                    minDate={new Date()}
                  />
                  CVC:{" "}
                  <input
                    type={"number"}
                    //   value={cvv}
                    maxLength={3}
                    pattern={"text"}
                    name={"cvv"}
                    onChange={handleChange}
                  />
                </div>
              </label>
            </div>
            {error.type === "expirationDate" && <h6>{error.msg}</h6>}
            {error.type === "cvv" && <h6>{error.msg}</h6>} */
}
