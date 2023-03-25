import ParticlesComp from "@/components/ParticlesComp";
import { useSelector } from "react-redux";
import styles2 from "../components/auth/auth.module.css";

const Verify_Notify = () => {
  const { email } = useSelector((store: any) => store.user);
  return (
    <main className={styles2.container}>
      <nav className={styles2.nav}>
        <div className={styles2.logo}>Logo</div>
        <ul className={styles2.menu}>
          <li>Wallet</li>
          <li>Course</li>
          <li>Theme</li>
        </ul>
      </nav>
      <div className={styles2.section_flex_center}>
        <h2>Account Created!!!</h2>
        <h3>
          Please check your inbox at <span>{email}</span> to verify your account
        </h3>
      </div>
      <div className={styles2.particles}>
        <ParticlesComp />
      </div>
    </main>
  );
};

export default Verify_Notify;
