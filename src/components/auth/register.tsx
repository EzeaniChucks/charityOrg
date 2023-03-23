import { useCallback, useState } from "react";
import PhoneInput from "react-phone-number-input";
import DatePicker from "react-datepicker";
import "react-phone-number-input/style.css";
import styles2 from "../auth/auth.module.css";

type Props = {
  isLogin: Boolean;
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
};

const Register = ({ isLogin, setIsLogin }: Props) => {
  const [value, setValue] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [tabStatus, setTabStatus] = useState("step1");

  const handleNext = () => {
    setTabStatus("step2");
  };
  const handleSubmit = () => {
    // setTabStatus("step2");
  };
  return (
    <div className={styles2.formContainer}>
      <h1>Register</h1>
      <div className={styles2.stepTabs}>
        <h3 className={tabStatus === "step1" ? styles2.active : ""}>Step 1</h3>
        <h3 className={tabStatus === "step2" ? styles2.active : ""}>Step 2</h3>
      </div>
      {tabStatus === "step1" && (
        <div className={styles2.general_details}>
          <label>
            First name :{" "}
            <input type={"text"} placeholder={"as seen on your ID"} />
          </label>
          <label>
            Last name :{" "}
            <input type={"text"} placeholder={"as seen on your ID"} />
          </label>
          <label>
            Date of birth:{" "}
            <DatePicker
              placeholderText="enter date"
              selected={selectedDate}
              dateFormat="dd/MM/yyyy"
              onChange={(date: Date) => {
                setSelectedDate(date);
                console.log(date);
              }}
              showYearDropdown
              scrollableYearDropdown
            />
          </label>
          <label>
            Phone :{" "}
            <PhoneInput
              placeholder="enter your phone number"
              value={value}
              onChange={() => setValue(value)}
            />
          </label>
          <label>
            Email : <input type={"email"} />
          </label>
          <label>
            Password : <input type={"password"} />
          </label>
          <label>
            Confirm Password : <input type={"password"} />
          </label>
          <label>
            PromoCode/ Referral (optional) : <input type={"password"} />
          </label>
          <button onClick={handleNext}>NEXT</button>
        </div>
      )}
      {tabStatus === "step2" && (
        <div className={styles2.account_details}>
          <h5>
            Provide card details to use online transaction (You may skip this
            process but it is necessary for donation)
          </h5>
          <label>
            Card Number: <input />
          </label>
          <div className={styles2.expiration_input}>
            <label>
              Expiration Date: <input />
            </label>
            <label>
              CVV: <input />
            </label>
          </div>
          <div className={styles2.back_skip_btns}>
            <button onClick={() => setTabStatus("step1")}>{"<-- back"}</button>
            <button>{"skip -->"}</button>
          </div>
          <button onClick={handleSubmit}>SUBMIT</button>
        </div>
      )}
      <p>
        Already have an step2?{" "}
        <span onClick={() => setIsLogin(!isLogin)}>Login</span>
      </p>
    </div>
  );
};

export default Register;
