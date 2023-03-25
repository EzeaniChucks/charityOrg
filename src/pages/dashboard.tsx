import ParticlesComp from "@/components/ParticlesComp";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import styles2 from "../components/auth/auth.module.css";

const Dashboard = () => {
  const { user } = useSelector((store: any) => store.user);
  const { push } = useRouter();
  useEffect(() => {
    if (!user) {
      push("/");
    }
  }, [user]);
  return (
    <>
      <Head>
        <title>Charity Org</title>
        <meta name="description" content="Dashboard" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/charityApp.png" />
      </Head>
      {user && (
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
            <h3>
              Welcome,{" "}
              <span>
                {user?.user?.firstName} {user?.user?.lastName}
              </span>
            </h3>
            <p>This will be your dashboard. This is being worked on!!!</p>
          </div>
          <div className={styles2.particles}>
            <ParticlesComp />
          </div>
        </main>
      )}
    </>
  );
};
export default Dashboard;
