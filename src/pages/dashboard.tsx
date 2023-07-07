import ParticlesComp from "@/components/ParticlesComp";
import Head from "next/head";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { dashbord_item } from "@/utils/arrays";
import {
  AiOutlineSetting,
  AiOutlineLink,
  AiOutlineUnorderedList,
  AiOutlineCloseCircle,
} from "react-icons/ai";
import { HiTrendingDown, HiOutlineTrendingUp } from "react-icons/hi";
import { middle_matrix_items } from "@/utils/arrays";
import { logout, setUser } from "../../redux/slices/authSlice";
import { AppDispatch } from "../../redux/store";
import {
  getWalletBalance,
  getLatestTransactions,
  paymentResponse,
  handleFillAccountsModule,
  updateWalletTopUpForm,
} from "../../redux/slices/walletSlice";
import TopUpForm from "@/components/payment/topUpForm";
import { handleTopUpModule } from "../../redux/slices/walletSlice";
import moment from "moment";
import { RxArrowUp, RxArrowDown } from "react-icons/rx";
// const Pie = dynamic(() => import("../components/charts/Pie"), { ssr: false });
import Example from "@/components/charts/PieChart";
import Doughnut from "@/components/charts/Doughnut";
import { FaChartBar, FaDatabase } from "react-icons/fa";
import Accounts from "@/components/accounts/accounts";
import { currency_array } from "@/utils/fundsArrays";
import styles2 from "../components/auth/auth.module.css";
import styles1 from "../styles/dashboard.module.css";
import { CgProfile } from "react-icons/cg";
import { checkUser } from "@/utils/localstorage";

const Dashboard = () => {
  const { user } = useSelector((store: any) => store.user);
  const {
    walletBalance,
    latestTx,
    topupStatus,
    topup_currency,
    wallet_currency,
    walletSummary,
  } = useSelector((store: any) => store.wallet);

  const { push, query, isReady } = useRouter();
  const [showDash, setShowDash] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const handleDashboardDisplay = () => {
    return setShowDash(!showDash);
  };

  const changeRoute = useCallback(() => {
    return push("/");
  }, []);

  const pieData = Object.values(
    latestTx.reduce((total: any, item: any) => {
      const { description, amount } = item;
      if (!description) return total;
      if (!total[description]) {
        total[description] = {
          label: description,
          value: amount,
        };
      } else {
        total[description] = {
          ...total[description],
          value: total[description].value + amount,
        };
      }
      return total;
    }, {})
  );

  const handleChange = (e: any) => {
    let { name, value } = e.target;
    dispatch(updateWalletTopUpForm({ name, value }));
    // if (name === "topup_amount") {
    //   let highestAmount = 0;
    //   // walletChargeRangeArray.map((eachRange: any) => {
    //   //   let { to, from, percent } = eachRange;
    //   //   to = Number(to);
    //   //   from = Number(from);
    //   //   percent = Number(percent);
    //   //   value = Number(value);
    //   //   if (to > highestAmount) {
    //   //     highestAmount = to;
    //   //   }
    //   //   if (value >= from && value <= to) {
    //   //     setTopUpAmountPlusTax(value + (value * percent) / 100);
    //   //     setChargePercent(percent);
    //   //     setChargeAmount((value * percent) / 100);
    //   //   }
    //   //   if (value >= highestAmount) {
    //   //     setTopUpAmountPlusTax(value + (value * percent) / 100);
    //   //     setChargePercent(percent);
    //   //     setChargeAmount((value * percent) / 100);
    //   //   }
    //   // });
    // }
  };
  useEffect(() => {
    if (isReady && query.transaction_id) {
      dispatch(
        paymentResponse({
          transaction_id: query.transaction_id,
          tx_ref: query.tx_ref,
          chargeAmount: query.chargeAmount,
          description: "Wallet Top-up",
        })
      );
    }
  }, [isReady]);

  useEffect(() => {
    if (user) {
      dispatch(
        getWalletBalance({ userId: user?.user?._id, currency: wallet_currency })
      );
    } else {
      let userValue = checkUser();
      if (userValue) {
        dispatch(setUser(userValue));
      } else {
        changeRoute();
      }
    }
  }, [user, topupStatus, wallet_currency]);

  useEffect(() => {
    if (user) {
      dispatch(getLatestTransactions(user?.user?._id));
    }
  }, [user, topupStatus]);

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
                  <FaDatabase />
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
                <div onClick={() => push(`/user/${user?.user?._id}`)}>
                  <CgProfile />
                  <h5>Profile</h5>
                </div>
                <div onClick={() => push("")}>
                  <AiOutlineSetting />
                  <h5>Settings</h5>
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
                    <FaDatabase />
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
                  <div onClick={() => dispatch(handleFillAccountsModule())}>
                    <FaChartBar />
                    <h5>Account Details</h5>
                  </div>
                  <hr />
                  <div onClick={() => push(`/user/${user?.user?._id}`)}>
                    <CgProfile />
                    <h5>Profile</h5>
                  </div>
                  <div onClick={() => push("")}>
                    <AiOutlineSetting />
                    <h5>Settings</h5>
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
                    <h3
                      style={{
                        color:
                          latestTx[0]?.description?.includes("Top-up") ||
                          latestTx[0]?.description?.includes("Income")
                            ? "green"
                            : "red",
                      }}
                    >
                      {latestTx[0]?.description?.includes("Top-up") ||
                      latestTx[0]?.description?.includes("Income")
                        ? "+"
                        : "-"}
                      {latestTx[0]?.amount} {latestTx[0]?.currency}
                    </h3>
                    <h6>Last Transaction</h6>
                    <div className={styles1.btn_div}>
                      <button onClick={() => dispatch(handleTopUpModule())}>
                        Top UP
                      </button>
                      <button>WITHDRAWAL</button>
                      <button>In-app Transfer</button>
                      <button>Currency conversion</button>
                    </div>
                  </div>
                  <div>
                    <label>
                      Currency Options
                      <select
                        value={wallet_currency}
                        name={"wallet_currency"}
                        onChange={handleChange}
                      >
                        {currency_array.map((item: any, i) => {
                          const item_key = Object.keys(item)[0];
                          return <option key={i}>{`${item[item_key]}`}</option>;
                        })}
                      </select>
                    </label>
                    <>
                      <h2>
                        <>
                          {walletBalance} {wallet_currency}
                        </>
                      </h2>
                      <h6>WALLET AMOUNT</h6>
                    </>
                  </div>
                </div>
                <div className={styles1.balance_graph_card}>
                  <Example />
                </div>
              </div>
              <div className={styles1.middle_matrix}>
                {walletSummary.map((item: any) => {
                  return (
                    <div key={item.id} className={styles1.middle_matrix_card}>
                      <h4>{item.type}</h4>
                      <h2>
                        {wallet_currency} {item.amount}
                        <span>.00</span>
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
                  {latestTx.length === 0 && (
                    <div>
                      <p>No transaction history yet</p>
                    </div>
                  )}
                  {latestTx.map((item: any) => {
                    return (
                      <div key={item._id}>
                        <div>
                          {(item.description.includes("Top-up") ||
                            item.description.includes("Income")) && (
                            <RxArrowUp
                              style={{
                                background: "rgb(11, 100, 140)",
                                font: "rgb(14, 109, 50)",
                                borderRadius: "50%",
                                width: "35px",
                                height: "35px",
                              }}
                            />
                          )}
                          {(item.description === "Wallet Withdraw" ||
                            item.description.includes("Debit") ||
                            item.description.includes("Purchase") ||
                            item.description === "Event Deposit") && (
                            <RxArrowDown
                              style={{
                                background: "rgb(200, 10, 140)",
                                font: "rgb(14, 10, 50)",
                                borderRadius: "50%",
                                width: "35px",
                                height: "35px",
                              }}
                            />
                          )}
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
                  <Doughnut />
                </div>
              </div>
            </div>
          </div>
          <TopUpForm />
          <Accounts />
          <div className={styles2.particles}>
            <ParticlesComp />
          </div>
        </main>
      )}
    </>
  );
};
export default Dashboard;
