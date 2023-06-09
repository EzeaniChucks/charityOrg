import { useDispatch, useSelector } from "react-redux";
import { ReactEventHandler } from "react";
import Router from "next/router";
import { useEffect } from "react";
import {
  login,
  updateFormValues,
  logError,
  setUser,
} from "../../../redux/slices/authSlice";
import styles2 from "../auth/auth.module.css";
import { AppDispatch } from "../../../redux/store";
import { checkUser, storeUser } from "@/utils/localstorage";

type Props = {
  isLogin: Boolean;
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
};

const Login = ({ isLogin, setIsLogin }: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const { push } = Router;
  const { error, password, email, user, loading } = useSelector(
    (store: any) => store.user
  );

  const handleSubmit = async () => {
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
    const finalObject: { email: string; password: string } = {
      email,
      password,
    };
    await dispatch(login(finalObject));
  };
  const handleChange: ReactEventHandler = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value }: { name: string; value: any } = e.target;
    dispatch(updateFormValues({ name, value }));
  };
  useEffect(() => {
    if (user) {
      storeUser(user);
      push("/dashboard");
    } else {
      let userValue = checkUser();
      if (userValue) dispatch(setUser(userValue));
    }
  }, [user, push, dispatch]);

  return (
    <div className={styles2.formContainer}>
      <h1>Login</h1>
      <div className={styles2.general_details}>
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
      </div>
      <h5>Forgot password?</h5>
      {error.type === "server_error" && <h6>{error.msg}</h6>}
      <button className={styles2.btn} onClick={handleSubmit} disabled={loading}>
        {loading ? "Connecting" : "SUBMIT"}
      </button>
      <p>
        No account created yet?{" "}
        <span onClick={() => setIsLogin(!isLogin)}>Register</span>
      </p>
    </div>
  );
};

export default Login;
