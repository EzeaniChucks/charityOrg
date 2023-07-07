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
import {
  RxAvatar,
  RxMobile,
  RxArrowUp,
  RxArrowDown,
  RxCheck,
} from "react-icons/rx";
// const Pie = dynamic(() => import("../components/charts/Pie"), { ssr: false });
import Example from "@/components/charts/PieChart";
import Doughnut from "@/components/charts/Doughnut";
import {
  FaChartBar,
  FaDashcube,
  FaDatabase,
  FaFileInvoice,
  FaList,
  FaSearch,
} from "react-icons/fa";
import Accounts from "@/components/accounts/accounts";
import { checkUser } from "@/utils/localstorage";
import Events from "./events";
import Notification from "@/components/notification/notification";
import {
  IoIosNotifications,
  IoIosPlanet,
  IoLogoAndroid,
  IoMdFootball,
} from "react-icons/io";
import {
  getAllEvents,
  setEventTimeLimits,
  updateEventForm,
} from "../../redux/slices/eventSlice";
import style from "../components/events/events.module.css";
import { handleNotifModal } from "../../redux/slices/notificationsSlice";
import ReactDatePicker from "react-datepicker";
import {
  addWalletChargeRange,
  chargeRangeDeletion,
  fetchChargeRange,
} from "../../redux/slices/adminSettingsSlice";
import Subscription from "@/components/subscriptionBundles/Subsription";
import Bundle from "@/components/subscriptionBundles/Bundle";
import styles2 from "../components/auth/auth.module.css";
import styles1 from "../styles/dashboard.module.css";
import styles3 from "../styles/adminDashboard.module.css";
import { currency_array } from "@/utils/fundsArrays";
import { CgProfile } from "react-icons/cg";

const AdminDashboard = () => {
  const { user } = useSelector((store: any) => store.user);
  const {
    chargeAmount,
    walletBalance,
    latestTx,
    topupStatus,
    loading,
    wallet_currency,
    walletSummary,
  } = useSelector((store: any) => store.wallet);
  const { walletChargeRangeArray } = useSelector(
    (store: any) => store.adminsettings
  );
  const { allEvents, eventSearchValue, disputeTimeLimit, requestTimeLimit } =
    useSelector((store: any) => store.event);
  const { notifModalIsOpen } = useSelector((store: any) => store.notifications);
  const { push, query, isReady } = useRouter();
  const [showDash, setShowDash] = useState(false);
  const [chargeAmountData, setChargeAmountData] = useState<any>({
    from: 0,
    to: 0,
    percent: 0,
  });
  const [adminDashboardOptions, setAdminDashboardOptions] =
    useState("account_overview");
  const dispatch = useDispatch<AppDispatch>();

  const handleDashboardDisplay = () => {
    return setShowDash(!showDash);
  };

  const changeRoute = useCallback(() => {
    if (!user) {
      return push("/");
    }
  }, []);

  const handleEventSearch = (e: any) => {
    //useeffect to handle search data fetching not yet in place
    return dispatch(
      updateEventForm({ name: "eventSearchValue", value: e.target.value })
    );
  };

  const handleChargeInput = (e: any) => {
    const { name, value } = e.target;
    setChargeAmountData({ ...chargeAmountData, [name]: value });
  };
  const sendChargeAmount = () => {
    let { from, to, percent } = chargeAmountData;
    from = Number(from);
    to = Number(to);
    percent = Number(percent);

    if (!from || !percent) {
      return;
    }

    if (from > to && to !== 0) {
      console.log(`'from's value cannot be greater than 'to'`);
      return;
    }
    let decider = false;
    let highestTO = 0;
    let highestFROM = 0;
    let lowestFROM = Infinity;
    walletChargeRangeArray.map((eachRange: any) => {
      if (eachRange.from > highestFROM) {
        highestFROM = eachRange.from;
      }
      if (eachRange.from < lowestFROM) {
        lowestFROM = eachRange.from;
      }
      if (eachRange.to > highestTO) {
        highestTO = eachRange.to;
      }
      if (from >= eachRange.from && to <= eachRange.to) {
        decider = true;
      }
    });
    // console.log(highestFROM, lowestFROM);
    if (decider) {
      console.log("range is already a subset of previously set range");
      return;
    }
    if (
      (from <= lowestFROM && to >= lowestFROM) ||
      (from <= highestTO && to >= highestTO) ||
      (from >= lowestFROM && to <= highestTO)
      // from <= highestTO ||
      // to >= lowestFROM ||
      // to <= highestTO ||
      // (to <= lowestFROM && from >= highestFROM)
    ) {
      console.log(
        `cannot set range between ${lowestFROM} and ${highestTO} as both ranges have been defined.`
      );
      return;
    }
    // if (to <= highestTO && from >= lowestFROM) {
    //   console.log(
    //     `cannot set range between ${lowestFROM} and ${highestTO} as both ranges have been defined.`
    //   );
    // }
    dispatch(addWalletChargeRange(chargeAmountData));
    setChargeAmountData({ ...chargeAmountData, to: 0, from: 0, percent: 0 });
    // console.log(chargeAmountData);
  };
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

    dispatch(getAllEvents(""));
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

  // useEffect(() => {
  //   if (user) {
  //     dispatch(getWalletBalance(user?.user?._id));
  //     dispatch(getLatestTransactions(user?.user?._id));
  //   }
  // }, [user, topupStatus]);

  useEffect(() => {
    dispatch(fetchChargeRange());
  }, []);
  // console.log(walletChargeRangeArray);
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
            <h5>ADMIN DASHBOARD</h5>
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
                <div
                  onClick={() => setAdminDashboardOptions("account_overview")}
                >
                  <FaChartBar />
                  <h5>Account Overview</h5>
                </div>
                <div onClick={() => push(`/user/${user?.user?._id}`)}>
                  <CgProfile />
                  <h5>Profile</h5>
                </div>
                <div onClick={() => setAdminDashboardOptions("events")}>
                  <FaDashcube />
                  <h5>Manage Events</h5>
                </div>
                <div>
                  <FaFileInvoice />
                  <h5>Broadcast Messages</h5>
                </div>
                <div onClick={() => dispatch(handleFillAccountsModule())}>
                  <FaChartBar />
                  <h5>Account Details</h5>
                </div>
                <hr />
                <div onClick={() => setAdminDashboardOptions("settings")}>
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
                  <div
                    onClick={() => setAdminDashboardOptions("account_overview")}
                  >
                    <FaChartBar />
                    <h5>Account Overview</h5>
                  </div>
                  <div onClick={() => push(`/user/${user?.user?._id}`)}>
                    <CgProfile />
                    <h5>Profile</h5>
                  </div>
                  <div onClick={() => setAdminDashboardOptions("events")}>
                    <FaDashcube />
                    <h5>Manage Events</h5>
                  </div>
                  <div>
                    <FaFileInvoice />
                    <h5>Broadcast Messages</h5>
                  </div>

                  <div onClick={() => dispatch(handleFillAccountsModule())}>
                    <FaChartBar />
                    <h5>Account Details</h5>
                  </div>
                  <hr />
                  <div onClick={() => setAdminDashboardOptions("settings")}>
                    <AiOutlineSetting />
                    <h5>Settings</h5>
                  </div>
                  <div className={styles1.logout} onClick={() => push("")}>
                    <h5 onClick={() => dispatch(logout())}>{"<- Log out"}</h5>
                  </div>
                </div>
              </div>
            </div>
            {/* <Events /> */}
            <div className={styles1.content}>
              {adminDashboardOptions === "account_overview" && (
                <>
                  \
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
                              return (
                                <option key={i}>{`${item[item_key]}`}</option>
                              );
                            })}
                          </select>
                        </label>
                        <>
                          <h2>
                            <>
                              {walletBalance}
                              {walletBalance !== 0 && <span>.00</span>}{" "}
                              {wallet_currency}
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
                        <div
                          key={item.id}
                          className={styles1.middle_matrix_card}
                        >
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
                </>
              )}
              {adminDashboardOptions === "events" && (
                <>
                  <div className={style.headboard} style={{ color: "grey" }}>
                    <div
                      className={style.upper_headboard}
                      style={{
                        justifyContent: "center",
                        position: "relative",
                        padding: "0 10px",
                      }}
                    >
                      <div>
                        <h3>Manage Events</h3>
                      </div>
                      <IoIosNotifications
                        style={{ position: "absolute", right: "0" }}
                        onClick={() => dispatch(handleNotifModal())}
                      />
                      {notifModalIsOpen && (
                        <div className={style.notification_modal}>
                          <Notification />
                        </div>
                      )}
                    </div>
                    <div className={style.lower_headboard}>
                      <div className={style.searchbar}>
                        <FaSearch />
                        <input
                          type={"text"}
                          value={eventSearchValue}
                          onChange={handleEventSearch}
                          placeholder={"Search events by name"}
                        />
                      </div>
                    </div>
                    <div className={style.floaters}>
                      {user && (
                        <div
                        // onClick={() => dispatch(handleEventModule())}
                        >
                          <IoMdFootball /> Create Event
                        </div>
                      )}
                      <div>
                        Filter Events <IoIosPlanet />
                      </div>
                    </div>
                  </div>
                  <div className={style.eventcontainer}>
                    <div className={style.heading}>
                      <h3 style={{ color: "white" }}>Event List</h3>
                    </div>
                    <div className={styles3.cardcontainer}>
                      {allEvents.length === 0 && eventSearchValue && (
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "0.9rem",
                            textAlign: "center",
                            height: "40vh",
                            padding: "50px",
                          }}
                        >
                          <h3>
                            No event with this name. Use another search term or
                            visit
                            <span
                              style={{
                                cursor: "pointer",
                                color: "rgb(50, 100, 60)",
                              }}
                              onClick={() => push("/events")}
                            >
                              {" "}
                              main event page
                            </span>{" "}
                            to search the event you seek
                          </h3>
                        </div>
                      )}
                      {allEvents.length === 0 && !eventSearchValue && (
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "0.9rem",
                            textAlign: "center",
                            height: "40vh",
                            padding: "50px",
                          }}
                        >
                          {
                            <h3>
                              You are not part of any events yet. Create a new
                              event or join public events from our{" "}
                              <span
                                style={{
                                  cursor: "pointer",
                                  color: "rgb(50, 100, 60)",
                                }}
                                onClick={() => push("/events")}
                              >
                                All Events
                              </span>{" "}
                              page
                            </h3>
                          }
                        </div>
                      )}
                      {allEvents?.map((item: any) => {
                        return (
                          <div key={item?._id} className={styles3.card}>
                            <div
                              className={styles3.leftside}
                              onClick={() =>
                                push(
                                  `/events/${"backend_category"}/${item?._id}`
                                )
                              }
                            >
                              <img src={item?.eventImageName} alt="event_img" />
                              <div className={styles3.date}>
                                <h4>
                                  {moment(
                                    new Date(item?.completionDeadline)
                                  ).format("DD")}
                                </h4>
                                <h5>
                                  {moment(
                                    new Date(item?.completionDeadline)
                                  ).format("MMM")}
                                </h5>
                              </div>
                              {/* <IoLogoAndroid className={styles3.datesvg} /> */}
                              <h4>{item.eventName}</h4>
                            </div>
                            <div className={styles3.rightside}>
                              <div className={styles3.eventStatus}>
                                {new Date() >
                                  new Date(item?.completionDeadline) && (
                                  <h5 className={styles3.event_end}>
                                    Event has Ended
                                  </h5>
                                )}
                                {new Date() <
                                  new Date(item?.completionDeadline) && (
                                  <h5 className={styles3.event_ongoing}>
                                    Event is ongoing
                                  </h5>
                                )}
                              </div>
                              <div
                                className={[
                                  style.participant,
                                  styles3.participant,
                                ].join(" ")}
                              >
                                {item?.members?.length > 0 && (
                                  <div>
                                    {item?.members?.map((_: any, i: number) => {
                                      if (i < 3) {
                                        return (
                                          <img
                                            key={i}
                                            src={item?.participant1}
                                            alt=""
                                          />
                                        );
                                      }
                                    })}
                                    {/* <img src={item.participant2} alt="" />
                        <img src={item.participant3} alt="" /> */}
                                  </div>
                                )}
                                <h5>{item?.members?.length} participant(s)</h5>
                              </div>
                              <div className={styles3.timelimits}>
                                <h5>{`Set Timelimits On`}</h5>
                                <div>
                                  <h6>
                                    Request:{" "}
                                    <span>
                                      <ReactDatePicker
                                        placeholderText="day/month/year e.g 01/01/2000"
                                        selected={new Date(requestTimeLimit)}
                                        dateFormat="dd/MM/yyyy"
                                        onChange={(date: Date) => {
                                          dispatch(
                                            updateEventForm({
                                              name: "requestTimeLimit",
                                              value: moment(date).format(),
                                            })
                                          );
                                        }}
                                        showYearDropdown
                                        scrollableYearDropdown
                                        minDate={new Date()}
                                      />
                                      <input
                                        type="time"
                                        onChange={(e) => {
                                          const dateHourset = new Date(
                                            requestTimeLimit
                                          ).setHours(
                                            Number(e.target.value.slice(0, 2))
                                          );
                                          // console.log(e.target.value.slice(3, 5));
                                          const dateMinutesSet = new Date(
                                            dateHourset
                                          ).setMinutes(
                                            Number(e.target.value.slice(3, 5))
                                          );
                                          dispatch(
                                            updateEventForm({
                                              name: "requestTimeLimit",
                                              value: moment(
                                                new Date(dateMinutesSet)
                                              ).format(),
                                            })
                                          );
                                        }}
                                      />
                                    </span>
                                  </h6>
                                  <h6>
                                    Dispute:{" "}
                                    <span>
                                      <ReactDatePicker
                                        placeholderText="day/month/year e.g 01/01/2000"
                                        selected={new Date(disputeTimeLimit)}
                                        dateFormat="dd/MM/yyyy"
                                        onChange={(date: Date) => {
                                          dispatch(
                                            updateEventForm({
                                              name: "disputeTimeLimit",
                                              value: moment(date).format(),
                                            })
                                          );
                                        }}
                                        showYearDropdown
                                        scrollableYearDropdown
                                        minDate={new Date()}
                                      />
                                      <input
                                        type="time"
                                        onChange={(e) => {
                                          const dateHourset = new Date(
                                            disputeTimeLimit
                                          ).setHours(
                                            Number(e.target.value.slice(0, 2))
                                          );
                                          // console.log(e.target.value.slice(3, 5));
                                          const dateMinutesSet = new Date(
                                            dateHourset
                                          ).setMinutes(
                                            Number(e.target.value.slice(3, 5))
                                          );
                                          dispatch(
                                            updateEventForm({
                                              name: "disputeTimeLimit",
                                              value: moment(
                                                new Date(dateMinutesSet)
                                              ).format(),
                                            })
                                          );
                                        }}
                                      />
                                    </span>
                                  </h6>
                                  <button
                                    className={styles3.btn}
                                    onClick={() =>
                                      dispatch(
                                        setEventTimeLimits({
                                          requestTimeLimit,
                                          disputeTimeLimit,
                                          eventId: item?._id,
                                          userId: user?.user?._id,
                                        })
                                      )
                                    }
                                    disabled={loading}
                                  >
                                    Save Adjustments
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </>
              )}
              {adminDashboardOptions === "settings" && (
                <>
                  <div className={style.headboard} style={{ color: "grey" }}>
                    <div
                      className={style.upper_headboard}
                      style={{
                        justifyContent: "center",
                        position: "relative",
                        padding: "0 10px",
                      }}
                    >
                      <div>
                        <h3>Manage Events</h3>
                      </div>
                      <IoIosNotifications
                        style={{ position: "absolute", right: "0" }}
                        onClick={() => dispatch(handleNotifModal())}
                      />
                      {notifModalIsOpen && (
                        <div className={style.notification_modal}>
                          <Notification />
                        </div>
                      )}
                    </div>
                    <div className={style.lower_headboard}>
                      <div className={style.searchbar}>
                        <FaSearch />
                        <input
                          type={"text"}
                          value={eventSearchValue}
                          onChange={handleEventSearch}
                          placeholder={"Search events by name"}
                        />
                      </div>
                    </div>
                    <div className={style.floaters}>
                      {user && (
                        <div
                        // onClick={() => dispatch(handleEventModule())}
                        >
                          <IoMdFootball /> Create Event
                        </div>
                      )}
                      <div>
                        Filter Events <IoIosPlanet />
                      </div>
                    </div>
                  </div>
                  <div className={styles3.settingscontainer}>
                    <div className={styles3.wallet_fund_range}>
                      <h4>Wallet fund charges</h4>
                      {walletChargeRangeArray?.length > 0 &&
                        walletChargeRangeArray.map((eachRange: any) => {
                          const { to, from, percent } = eachRange;
                          return (
                            <div
                              className={styles3.available_charge}
                              key={eachRange._id}
                            >
                              <h5>
                                {from} NGN - {to} NGN = {percent}% charge
                              </h5>
                              <button
                                onClick={() =>
                                  dispatch(chargeRangeDeletion(eachRange._id))
                                }
                              >
                                delete
                              </button>
                            </div>
                          );
                        })}
                      <div className={styles3.range}>
                        <h4>Add range</h4>
                        <div>
                          <div>
                            from
                            <span>
                              <input
                                type="number"
                                name="from"
                                value={chargeAmountData.from}
                                onChange={handleChargeInput}
                              />
                              <h6>NGN</h6>
                            </span>
                          </div>
                          <div>
                            to
                            <span>
                              <input
                                type="number"
                                name="to"
                                value={chargeAmountData.to}
                                onChange={handleChargeInput}
                              />
                              <h6>NGN</h6>
                            </span>
                          </div>
                        </div>
                        <div>
                          <div>
                            charge percentage
                            <span>
                              <input
                                type="number"
                                name="percent"
                                value={chargeAmountData.percent}
                                onChange={handleChargeInput}
                              />
                              %
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className={styles3.addrange_submit}>
                        <button onClick={sendChargeAmount}>Add Range</button>
                      </div>
                    </div>
                    <div className={styles3.subscriptions}>
                      <Subscription />
                    </div>
                    <div className={styles3.bundles}>
                      <Bundle />
                    </div>
                  </div>
                </>
              )}
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
export default AdminDashboard;
