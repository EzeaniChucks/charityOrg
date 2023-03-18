import styles2 from "../auth/auth.module.css";

const Login = ({ isLogin, setIsLogin }) => {
  return (
    <div className={styles2.formContainer}>
      <h1>Login</h1>
      <label>
        Email : <input type={"email"} />
      </label>
      <label>
        Password : <input type={"password"} />
      </label>
      <p>
        No account created yet?{" "}
        <span onClick={() => setIsLogin(!isLogin)}>Register</span>
      </p>
    </div>
  );
};

export default Login;
