import { useEffect } from "react";
import ParticlesComp from "@/components/ParticlesComp";
import { useDispatch, useSelector } from "react-redux";
import { verify } from "../../redux/slices/authSlice";
import { useRouter } from "next/router";
import { AppDispatch } from "../../redux/store";
import Head from "next/head";
import styles from "../components/auth/auth.module.css";
// import styles2 from "../styles/Home.module.css";

const Verify = () => {
  const { verification_status, user, error } = useSelector(
    (store: any) => store.user
  );

  const dispatch = useDispatch<AppDispatch>();
  const { query, isReady, push } = useRouter();

  useEffect(() => {
    if (isReady) dispatch(verify(query));
    else return;
  }, [isReady]);

  return (
    <>
      <Head>
        <title>Charity Org</title>
        <meta name="description" content="CharityOrg Verification" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/charityApp.png" />
      </Head>
      <main className={styles.container}>
        <nav className={styles.nav}>
          <div className={styles.logo}>Logo</div>
          <ul className={styles.menu}>
            <li>Wallet</li>
            <li>Course</li>
            <li>Theme</li>
          </ul>
        </nav>
        <div className={styles.section_flex_center}>
          {error.type === "server_error" && <h2>{error.msg}</h2>}
          {user && (
            <>
              <h2>Hi, {user.user.firstName}</h2>
              <h3>{user.msg}</h3>
              <p>
                You can now login.{" "}
                <span onClick={() => push("/")}>Click here</span>
              </p>
            </>
          )}
        </div>
        <div className={styles.particles}>
          <ParticlesComp />
        </div>
      </main>
    </>
  );
};

export default Verify;
