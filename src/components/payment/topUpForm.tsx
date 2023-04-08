import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../redux/store";
import { handleTopUpModule } from "../../../redux/slices/walletSlice";
import { FaTimesCircle } from "react-icons/fa";
import { FlutterWaveButton, closePaymentModal } from "flutterwave-react-v3";
import { country_array, currency_array } from "@/utils/fundsArrays";
import style from "../../components/events/events.module.css";
import styles2 from "../../components/auth/auth.module.css";
import ReactDatePicker from "react-datepicker";

// const conString = "http://localhost:3000/dashboard";
const conString = "https://charityorg.vercel.app/dashboard";

const TopUpForm = () => {
  const {
    showWalletTopUp,
    error,
    public_key,
    tx_ref,
    amount,
    currency,
    country,
  } = useSelector((store: any) => store.wallet);
  const { user } = useSelector((store: any) => store.user);
  const dispatch = useDispatch<AppDispatch>();

  const handleChange = () => {};
  const config = {
    public_key,
    tx_ref,
    amount: 459,
    currency: "NGN",
    country: "NG",
    payment_options: "card,mobilemoney,ussd",
    redirect_url: conString,
    customer: {
      email: user.user.email,
      phone_number: "+2348067268692",
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
                // value={cardNumber}
                type={"number"}
                name={"amount"}
                onChange={handleChange}
              />
            </label>
            <label>
              Currency :{" "}
              <select
                // value={timeZone}
                name={"currency"}
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
                // value={currency}
                name={"country"}
                onChange={handleChange}
              >
                {country_array.map((item: any, i) => {
                  return <option key={i}>{`${item.country}`}</option>;
                })}
              </select>
            </label>
            {error.type === "currency" && <h6>{error.msg}</h6>}

            {error.type === "amount" && <h6>{error.msg}</h6>}
            {error.type !== "" && <h6>{"An error occured"}</h6>}
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
