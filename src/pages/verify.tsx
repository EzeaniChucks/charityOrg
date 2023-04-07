import { useEffect } from "react";
import ParticlesComp from "@/components/ParticlesComp";
import { useDispatch, useSelector } from "react-redux";
import { verify } from "../../redux/slices/authSlice";
import { useRouter } from "next/router";
import { AppDispatch } from "../../redux/store";
import Head from "next/head";
import styles from "../components/auth/auth.module.css";
import { storeUser } from "@/utils/localstorage";

const Verify = () => {
  const { user, error, loading } = useSelector((store: any) => store.user);

  const dispatch = useDispatch<AppDispatch>();
  const { query, isReady, push } = useRouter();

  useEffect(() => {
    if (isReady) dispatch(verify(query));
  }, [isReady]);

  useEffect(() => {
    if (user) storeUser(user);
  }, [user]);

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
          <img
            onClick={() => push("/")}
            className={styles.logo}
            src="/charityApp.png"
            alt="CharLogo"
          />
          <ul className={styles.menu}>
            <li>Wallet</li>
            <li>Event</li>
            <li>Settings</li>
          </ul>
        </nav>
        <div className={styles.section_flex_center}>
          {error.type === "server_error" && <h2>{error.msg}</h2>}
          {loading && <p>Verifying account... Please wait</p>}
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
