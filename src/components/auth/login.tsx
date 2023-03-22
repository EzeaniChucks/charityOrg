import styles2 from "../auth/auth.module.css";

type Props = {
  isLogin: Boolean;
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
};

const Login = ({ isLogin, setIsLogin }: Props) => {
  return (
    <div className={styles2.formContainer}>
      <h1>Login</h1>
      <div className={styles2.general_details}>
        <label>
          Email : <input type={"email"} />
        </label>
        <label>
          Password : <input type={"password"} />
        </label>
      </div>
      <h5>Forgot password?</h5>
      <p>
        No account created yet?{" "}
        <span onClick={() => setIsLogin(!isLogin)}>Register</span>
      </p>
    </div>
  );
};

export default Login;
