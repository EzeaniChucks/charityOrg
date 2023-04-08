import ParticlesComp from "@/components/ParticlesComp";
import Head from "next/head";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { dashbord_item, latest_transaction } from "@/utils/arrays";
import {
  AiOutlineSetting,
  AiOutlineLink,
  AiOutlineUnorderedList,
  AiOutlineCloseCircle,
} from "react-icons/ai";
import { HiTrendingDown, HiOutlineTrendingUp } from "react-icons/hi";
import { middle_matrix_items } from "@/utils/arrays";
import styles2 from "../components/auth/auth.module.css";
import styles1 from "../styles/dashboard.module.css";
import { logout } from "../../redux/slices/authSlice";
import { AppDispatch } from "../../redux/store";
import {
  getWalletBalance,
  getLatestTransactions,
  paymentResponse,
} from "../../redux/slices/walletSlice";
import TopUpForm from "@/components/payment/topUpForm";
import { handleTopUpModule } from "../../redux/slices/walletSlice";
import moment from "moment";

const Dashboard = () => {
  const { user } = useSelector((store: any) => store.user);
  const { walletBalance, latestTx } = useSelector((store: any) => store.wallet);
  const { push, query, isReady } = useRouter();
  const [showDash, setShowDash] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const handleDashboardDisplay = () => {
    return setShowDash(!showDash);
  };

  const changeRoute = useCallback(() => {
    return push("/");
  }, []);

  useEffect(() => {
    if (isReady && query.transaction_id) {
      dispatch(
        paymentResponse({
          transaction_id: query.transaction_id,
          tx_ref: query.tx_ref,
          description: "Wallet Top-up",
        })
      );
    }
  }, [isReady]);

  useEffect(() => {
    if (!user) {
      changeRoute();
    }
    if (user) {
      dispatch(getWalletBalance(user.user._id));
      dispatch(getLatestTransactions(user.user._id));
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
          <nav className={[styles2.nav, styles1.navdisplay].join(" ")}>
            <div className={styles1.logo_div}>
              <img
                onClick={() => push("/")}
                className={styles1.logo}
                src="/charityApp.png"
                alt="CharLogo"
              />
              <div>
                <p>CharityApp</p>
                <h6>
                  Welcome, {user.user.firstName} {user.user.lastName}
                </h6>
              </div>
            </div>
            <AiOutlineUnorderedList onClick={handleDashboardDisplay} />
          </nav>
          <div className={styles1.section}>
            <div className={styles1.dashboard}>
              <div className={styles1.logo_div}>
                <img
                  onClick={() => push("/")}
                  className={styles1.logo}
                  src="/charityApp.png"
                  alt="CharLogo"
                />
                <div>
                  <p>CharityApp</p>
                  <h6>
                    Welcome, {user.user.firstName} {user.user.lastName}
                  </h6>
                </div>
              </div>
              <div className={styles1.list_div}>
                <div onClick={() => dispatch(handleTopUpModule())}>
                  <AiOutlineSetting />
                  <h5>Top up Wallet</h5>
                </div>
                {dashbord_item.map((item) => {
                  return (
                    <div key={item.id} onClick={() => push(item.link)}>
                      <item.logo />
                      <h5>{item.name}</h5>
                    </div>
                  );
                })}
                <hr />
                <div onClick={() => push("")}>
                  <AiOutlineSetting />
                  <h5>Settings</h5>
                </div>
                <div onClick={() => push("")}>
                  <AiOutlineLink />
                  <h5>Link</h5>
                </div>
                <div className={styles1.logout}>
                  <h5 onClick={() => dispatch(logout())}>{"<- Log out"}</h5>
                </div>
              </div>
            </div>
            <div
              className={
                showDash
                  ? [styles1.modal, styles1.show_modal].join(" ")
                  : styles1.modal
              }
            >
              <div
                className={
                  showDash
                    ? [
                        styles1.dashboard_modal,
                        styles1.show_dashboard_modal,
                      ].join(" ")
                    : styles1.dashboard_modal
                }
              >
                <div className={styles1.list_div}>
                  <AiOutlineCloseCircle onClick={() => setShowDash(false)} />
                  <div onClick={() => dispatch(handleTopUpModule())}>
                    <AiOutlineSetting />
                    <h5>Top up Wallet</h5>
                  </div>
                  {dashbord_item.map((item) => {
                    return (
                      <div key={item.id} onClick={() => push(item.link)}>
                        <item.logo />
                        <h5>{item.name}</h5>
                      </div>
                    );
                  })}
                  <hr />
                  <div onClick={() => push("")}>
                    <AiOutlineSetting />
                    <h5>Settings</h5>
                  </div>
                  <div onClick={() => push("")}>
                    <AiOutlineLink />
                    <h5>Link</h5>
                  </div>
                  <div className={styles1.logout} onClick={() => push("")}>
                    <h5 onClick={() => dispatch(logout())}>{"<- Log out"}</h5>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles1.content}>
              <div className={styles1.top_matrix}>
                <div className={styles1.total_balance_card}>
                  <div>
                    <h2>Total Balance</h2>
                    <h3>
                      +{latestTx[0].currency}
                      {latestTx[0]?.amount}
                    </h3>
                    <h6>Last Transaction</h6>
                    <div className={styles1.btn_div}>
                      <button onClick={() => dispatch(handleTopUpModule())}>
                        Top UP
                      </button>
                      <button>WITHDRAWAL</button>
                    </div>
                  </div>
                  <div>
                    <h2>
                      {latestTx[0].currency}
                      {walletBalance}
                      <span>.00</span>
                    </h2>
                    <h6>WALLET AMOUNT</h6>
                  </div>
                </div>
                <div className={styles1.balance_graph_card}>
                  <div>
                    <h2>Report</h2>
                  </div>
                  <div>
                    <h2>Graph</h2>
                    <h6>will be displayed here</h6>
                  </div>
                </div>
              </div>
              <div className={styles1.middle_matrix}>
                {middle_matrix_items.map((item) => {
                  return (
                    <div key={item.id} className={styles1.middle_matrix_card}>
                      <h4>{item.type}</h4>
                      <h2>
                        ${item.amount}
                        <span>.52</span>
                      </h2>
                      <div
                        style={
                          item.uptrend
                            ? { backgroundColor: "rgb(38, 131, 38)" }
                            : { backgroundColor: "rgb(134, 41, 41)" }
                        }
                        className={styles1.trend}
                      >
                        {item.uptrend ? (
                          <HiOutlineTrendingUp />
                        ) : (
                          <HiTrendingDown />
                        )}
                        <h5>{item.percent}%</h5>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className={styles1.bottom_matrix}>
                <div className={styles1.latest_transaction_card}>
                  <h2>Latest Transactions</h2>
                  {latestTx.map((item: any) => {
                    return (
                      <div key={item._id}>
                        <div
                          style={{
                            color: item.font,
                            backgroundColor: item.background,
                          }}
                        >
                          {/* <item.avatar /> */}
                        </div>
                        <div>
                          <p>{item.description}</p>
                          <h6>{item.narration}</h6>
                          <h6>
                            {moment(item.createdAt).format(
                              "D, MMM, yyyy hh:mm A"
                            )}
                          </h6>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className={styles1.month_piechart_card}>
                  <div> Pie Chart Here</div>
                </div>
              </div>
            </div>
          </div>
          <TopUpForm />
          <div className={styles2.particles}>
            <ParticlesComp />
          </div>
        </main>
      )}
    </>
  );
};
export default Dashboard;
