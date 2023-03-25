import { ReactEventHandler, useState, useEffect } from "react";
import PhoneInput from "react-phone-number-input";
import DatePicker from "react-datepicker";
import moment from "moment";
import "react-phone-number-input/style.css";
import styles2 from "../auth/auth.module.css";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store";
import {
  logError,
  register,
  updateFormValues,
} from "../../../redux/slices/authSlice";
import { useRouter } from "next/router";

type Props = {
  isLogin: Boolean;
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
};

export interface Obj {
  user?: null;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPass?: string;
  phoneNumber: string;
  dateOfBirth: string;
  promoCode: string;
  cardNumber: string;
  cvv: string;
  expirationDate: string;
  loading?: boolean;
  error?: { type: string; msg: string; code?: "" };
  afterRegistration?: string;
  verification_status?: any;
}

const Register = ({ isLogin, setIsLogin }: Props) => {
  const {
    user,
    firstName,
    lastName,
    email,
    password,
    phoneNumber,
    dateOfBirth,
    confirmPass,
    promoCode,
    cardNumber,
    cvv,
    expirationDate,
    afterRegistration,
  } = useSelector((store: any) => store.user);
  const [tabStatus, setTabStatus] = useState("step1");
  const { error } = useSelector((store: any) => store?.user);
  const { push } = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const handleChange: ReactEventHandler = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value }: { name: string; value: any } = e.target;
    dispatch(updateFormValues({ name, value }));
  };

  const handleNext = () => {
    if (!firstName)
      return dispatch(logError({ type: "firstName", msg: "enter firstname" }));
    if (!lastName)
      return dispatch(logError({ type: "lastName", msg: "enter lastname" }));

    const dateDiff = Math.ceil(
      (new Date(Date.now()).getTime() - new Date(dateOfBirth).getTime()) /
        (1000 * 60 * 60 * 24) /
        365.25
    );

    if (dateDiff < 18) {
      return dispatch(
        logError({ type: "dateOfBirth", msg: "You must be 18 or older" })
      );
    }
    if (!phoneNumber) {
      return dispatch(
        logError({ type: "phoneNumber", msg: "phone number must be filled" })
      );
    }
    const emailRegEx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!email || (email && !email.match(emailRegEx))) {
      return dispatch(
        logError({
          type: "email",
          msg: "invalid email address",
        })
      );
    } else if (email.match(emailRegEx)) {
      dispatch(logError({ type: "", msg: "" }));
    }

    const passRegEx = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
    if (!password || (password && !password.match(passRegEx))) {
      return dispatch(
        logError({
          type: "password",
          msg: "Password should be 6 to 20 characters. Must contain at least one number, one uppercase and one lowercase letter",
        })
      );
    } else if (password.match(passRegEx)) {
      dispatch(logError({ type: "", msg: "" }));
    }

    if (password !== confirmPass)
      return dispatch(
        logError({ type: "confirmPass", msg: "Password does not match" })
      );

    if (error.type === "") setTabStatus("step2");
  };

  const handleSubmit = () => {
    const finalObject: Obj = {
      firstName,
      lastName,
      email,
      password,
      phoneNumber,
      dateOfBirth,
      promoCode,
      cardNumber,
      cvv,
      expirationDate,
    };

    return dispatch(register(finalObject));
  };

  useEffect(() => {
    if (afterRegistration) {
      push("/verify_notify");
    }
  }, [afterRegistration]);

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
            <input
              type={"text"}
              placeholder={"as written on your ID"}
              value={firstName}
              name={"firstName"}
              onChange={handleChange}
            />
          </label>
          {error.type === "firstName" && <h6>{error.msg}</h6>}
          <label>
            Last name :{" "}
            <input
              type={"text"}
              placeholder={"as written on your ID"}
              value={lastName}
              name={"lastName"}
              onChange={handleChange}
            />
          </label>
          {error.type === "lastName" && <h6>{error.msg}</h6>}
          <label>
            Date of birth:{" "}
            <DatePicker
              placeholderText="day/month/year e.g 01/01/2000"
              selected={new Date(dateOfBirth)}
              dateFormat="dd/MM/yyyy"
              onChange={(date: Date) => {
                dispatch(
                  updateFormValues({
                    name: "dateOfBirth",
                    value: moment(date).format(),
                  })
                );
              }}
              showYearDropdown
              scrollableYearDropdown
            />
          </label>
          {error.type === "dateOfBirth" && <h6>{error.msg}</h6>}
          <label>
            Phone :{" "}
            <PhoneInput
              placeholder="enter your phone number"
              value={phoneNumber}
              onChange={() =>
                dispatch(
                  updateFormValues({ name: "phoneNumber", value: phoneNumber })
                )
              }
            />
          </label>
          {error.type === "phoneNumber" && <h6>{error.msg}</h6>}
          <label>
            Email :{" "}
            <input
              value={email}
              name={"email"}
              onChange={handleChange}
              type={"email"}
            />
          </label>
          {error.type === "email" && <h6>{error.msg}</h6>}
          <label>
            Password :{" "}
            <input
              value={password}
              name={"password"}
              onChange={handleChange}
              type={"password"}
            />
          </label>
          {error.type === "password" && <h6>{error.msg}</h6>}
          <label>
            Confirm Password :{" "}
            <input
              value={confirmPass}
              name={"confirmPass"}
              onChange={handleChange}
              type={"password"}
            />
          </label>
          {error.type === "confirmPass" && <h6>{error.msg}</h6>}
          <label>
            PromoCode/ Referral (optional) :{" "}
            <input
              value={promoCode}
              name={"promoCode"}
              onChange={handleChange}
              type={"text"}
            />
          </label>
          {error.type === "promoCode" && <h6>{error.msg}</h6>}
          {error.type === "nextError" && <h6>{error.msg}</h6>}
          <button className={styles2.btn} onClick={handleNext}>
            NEXT
          </button>
        </div>
      )}
      {tabStatus === "step2" && (
        <div className={styles2.account_details}>
          <h5>
            Enter card details for online transaction (You can skip this process
            but it is necessary for donation)
          </h5>
          <label>
            Card Number:{" "}
            <input
              value={cardNumber}
              type={"number"}
              name={"cardNumber"}
              onChange={handleChange}
            />
          </label>
          {error.type === "cardNumber" && <h6>{error.msg}</h6>}
          <div className={styles2.expiration_input}>
            <label>
              Expiration Date:{" "}
              <DatePicker
                selected={new Date(expirationDate)} //use new Date to convert iso string into object
                dateFormat="MM/yy"
                minDate={new Date(Date.now())}
                onChange={(date: Date) => {
                  dispatch(
                    updateFormValues({
                      name: "expirationDate",
                      value: moment(date).format(), //convert date object to acceptable iso string
                    })
                  );
                }}
                showYearDropdown
                scrollableYearDropdown
              />
            </label>
            <label>
              CVC:{" "}
              <input
                type={"number"}
                value={cvv}
                maxLength={3}
                pattern={"text"}
                name={"cvv"}
                onChange={handleChange}
              />
            </label>
          </div>
          {error.type === "expirationDate" && <h6>{error.msg}</h6>}
          {error.type === "cvv" && <h6>{error.msg}</h6>}
          <div className={styles2.back_skip_btns}>
            <button
              className={styles2.btn}
              onClick={() => setTabStatus("step1")}
            >
              {"<-- back"}
            </button>
            <button className={styles2.btn}>{"skip -->"}</button>
          </div>
          {error.type === "submit_error" && <h6>{error.msg}</h6>}
          {error.type === "server_error" && <h6>{error.msg}</h6>}
          <button className={styles2.btn} onClick={handleSubmit}>
            SUBMIT
          </button>
        </div>
      )}
      <p>
        Already have an account?{" "}
        <span onClick={() => setIsLogin(!isLogin)}>Login</span>
      </p>
    </div>
  );
};

export default Register;
