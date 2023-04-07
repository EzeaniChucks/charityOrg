import ParticlesComp from "@/components/ParticlesComp";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import styles2 from "../components/auth/auth.module.css";

const Verify_Notify = () => {
  const { push } = useRouter();
  const { email } = useSelector((store: any) => store.user);
  return (
    <main className={styles2.container}>
      <nav className={styles2.nav}>
        <img
          onClick={() => push("/")}
          className={styles2.logo}
          src="/charityApp.png"
          alt="CharLogo"
        />
        <ul className={styles2.menu}>
          <li>Wallet</li>
          <li>Event</li>
          <li>Settings</li>
        </ul>
      </nav>
      <div className={styles2.section_flex_center}>
        <h2>Account Created!!!</h2>
        <h3>
          Please check your mailbox <span>{email && `at ${email}`}</span> to
          verify your account
        </h3>
      </div>
      <div className={styles2.particles}>
        <ParticlesComp />
      </div>
    </main>
  );
};

export default Verify_Notify;
