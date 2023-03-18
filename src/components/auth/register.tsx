import styles2 from "../auth/auth.module.css";

const Register = ({ isLogin, setIsLogin }) => {
  return (
    <div className={styles2.formContainer}>
      <h1>Register</h1>
      <div className={styles2.stepTabs}>
        <h3>General details</h3>
        <h3>Specific details</h3>
      </div>
      <label>
        First name : <input type={"text"} placeholder={"as seen on your ID"} />
      </label>
      <label>
        Last name : <input type={"text"} placeholder={"as seen on your ID"} />
      </label>
      <label>
        Email : <input type={"email"} />
      </label>
      <label>
        Phone : <input type={"number"} />
      </label>
      <p>
        Already have an account?{" "}
        <span onClick={() => setIsLogin(!isLogin)}>Login</span>
      </p>
    </div>
  );
};

export default Register;
