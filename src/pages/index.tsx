import Head from "next/head";
import { Inter } from "next/font/google";
import Login from "../components/auth/login";
import Register from "@/components/auth/register";
import ParticlesComp from "@/components/ParticlesComp";
import styles2 from "../components/auth/auth.module.css";
import { useState, useEffect } from "react";
import { checkUser } from "@/utils/localstorage";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../redux/slices/authSlice";
import { AppDispatch } from "../../redux/store";

// const inter = Inter({ subsets: ["latin"] });
// interface log {
//   isLogin: any
// }
// type Props = {

// }
export default function Home() {
  const [isLogin, setIsLogin] = useState(true);
  const { user } = useSelector((store: any) => store.user);
  // const dispatch = useDispatch<AppDispatch>();

  return (
    <>
      <Head>
        <title>Charity Org</title>
        <meta
          name="description"
          content="Donate to a worthy cause. Do something remarkable!"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/charityApp.png" />
      </Head>

      <main className={styles2.container}>
        <nav className={styles2.nav}>
          <img className={styles2.logo} src="/charityApp.png" alt="CharLogo" />
          <ul className={styles2.menu}>
            <li>Wallet</li>
            <li>Event</li>
            <li>Settings</li>
          </ul>
        </nav>
        <div className={styles2.section}>
          <div className={styles2.left}>
            <h1>Welcome to charity.org</h1>
            <h3>be a part of something profound</h3>
            <h3>donate to a worthy course</h3>
          </div>
          <div className={styles2.right}>
            {isLogin && <Login isLogin={isLogin} setIsLogin={setIsLogin} />}
            {!isLogin && <Register isLogin={isLogin} setIsLogin={setIsLogin} />}
          </div>
        </div>
        <div className={styles2.particles}>
          <ParticlesComp />
        </div>
      </main>
    </>
  );
}
