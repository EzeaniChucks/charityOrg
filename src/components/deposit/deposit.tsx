import {
  FaEdit,
  FaList,
  FaMicrosoft,
  FaTimes,
  FaTimesCircle,
} from "react-icons/fa";
import { IoIosArrowDropdown } from "react-icons/io";
import Deposit_Description from "./deposit_description";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useEffect, useState, ReactEventHandler } from "react";
import { AppDispatch } from "../../../redux/store";
import {
  acceptEventDeposit,
  getEventDetail,
  logError,
  resetDepositAndCompletionDeadlines,
  resetEventPaymentInfo,
  updateEventForm,
} from "../../../redux/slices/eventSlice";
import moment from "moment";
import { checkUser } from "@/utils/localstorage";
import { setUser } from "../../../redux/slices/authSlice";
import style2 from "../../pages/events/[eventCategory]/[eventId]/activity_room.module.css";
import style from "./deposit.module.css";
import {
  get_Notification,
  log_Notification,
} from "../../../redux/slices/notificationsSlice";
import CountDownTimer from "../countDownTimer/countdowntimer";
import ReactDatePicker from "react-datepicker";
import styles3 from "../../styles/adminDashboard.module.css";

const DepositForm = () => {
  const {
    fullEventDetails,
    depositAmount,
    categoryDesc,
    error,
    loading,
    depositDeadline,
    completionDeadline,
    currency,
  } = useSelector((store: any) => store.event);
  const { user } = useSelector((store: any) => store.user);

  const [showModal, setShowModal] = useState<any>(false);
  const [modaltype, setModalType] = useState<any>("deposit_form");
  const [isDepositEdit, setIsDepositEdit] = useState<any>(false);
  const [isCompletionEdit, setIsCompletionEdit] = useState<any>(false);

  const dispatch = useDispatch<AppDispatch>();
  const { isReady } = useRouter();
  const { eventId } = useRouter().query;

  // console.log(fullEventDetails);
  useEffect(() => {
    if (isReady && eventId) {
      dispatch(getEventDetail(eventId));
      let userValue = checkUser();
      if (userValue) dispatch(setUser(userValue));
    }
  }, [isReady, eventId, dispatch]);

  useEffect(() => {
    if (error.type) {
      const timeout = setTimeout(() => {
        dispatch(logError({ type: "", msg: "" }));
      }, 5000);
      return () => clearTimeout(timeout);
    }
  }, [error, dispatch]);

  const handleChange: ReactEventHandler = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    dispatch(updateEventForm({ name, value }));
  };
  const handleFundDeposit = () => {
    // { userId, userName, depositAmount, categoryDesc }
    if (depositAmount === "" || categoryDesc === "") {
      return dispatch(
        logError({
          type: "deposit_form_error",
          msg: "Deposit amount and new category name must be filled",
        })
      );
    }
    const finalObj = {
      userId: user?.user._id,
      userName: `${user?.user.firstName} ${user?.user.lastName}`,
      eventId,
      depositAmount,
      categoryDesc: categoryDesc.toLowerCase(),
      currency: "NGN", //Please make this dynamic
    };
    dispatch(acceptEventDeposit(finalObj));
    dispatch(
      log_Notification({
        message: `${finalObj.userName} has made a deposit of ${finalObj.depositAmount} to your event ${fullEventDetails.eventName}`,
        userId: user.user._id,
        link: `/events/backend_category/${eventId}/activity_room`,
        eventId,
        type: "deposit",
      })
    );
    dispatch(resetEventPaymentInfo());
    setShowModal(!showModal);
  };
  const handleShowModal = () => {
    // if (depositAmount === "" || categoryDesc === "") {
    //   return dispatch(
    //     logError({
    //       type: "deposit_form_error",
    //       msg: "Deposit amount and new category name must be filled",
    //     })
    //   );
    // }
    setModalType("deposit_form");
    return setShowModal(!showModal);
  };
  const getDateCountDown = (date: any) => {
    const dateVar = Math.ceil(
      (Date.parse(date) - Date.now()) / 1000 / 60 / 60 / 24
    );
    if (dateVar >= 0) return dateVar;
    else return 0;
  };
  return (
    <div className={style2.mainField}>
      {getDateCountDown(fullEventDetails.depositDeadline) == 0 && (
        <h5 style={{ color: "tomato" }}>
          {`This event no longer accepts deposits. Deposit Deadline
          is past.`}
        </h5>
      )}
      <h3>Deposit details</h3>
      <div className={style.total_deposit_board}>
        <div className={style.currency}>
          <p>Event summary</p>
          <div>
            Currency
            <IoIosArrowDropdown />
          </div>
        </div>
        <h3>Total Deposited Amount</h3>
        <h2
          style={{
            margin: "-5px 0 10px 0",
            fontSize: "1rem",
            color: "yellowgreen",
          }}
        >
          NGN {fullEventDetails.totalEventAmount}
        </h2>
        <div className={style.deadlines}>
          <div className={styles3.timelimits}>
            <h4>Deposit Deadline</h4>
            <div className={style.deadline_content}>
              {isDepositEdit && (
                <>
                  <h6>
                    <span>
                      <ReactDatePicker
                        placeholderText="day/month/year e.g 01/01/2000"
                        selected={new Date(depositDeadline)}
                        dateFormat="dd/MM/yyyy"
                        onChange={(date: Date) => {
                          dispatch(
                            updateEventForm({
                              name: "depositDeadline",
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
                            depositDeadline
                          ).setHours(Number(e.target.value.slice(0, 2)));
                          // console.log(e.target.value.slice(3, 5));
                          const dateMinutesSet = new Date(
                            dateHourset
                          ).setMinutes(Number(e.target.value.slice(3, 5)));
                          dispatch(
                            updateEventForm({
                              name: "depositDeadline",
                              value: moment(new Date(dateMinutesSet)).format(),
                            })
                          );
                        }}
                      />
                    </span>
                  </h6>
                  <div className={style.deadlineBtns}>
                    <button
                      onClick={() => {
                        setIsDepositEdit(!isDepositEdit);
                        dispatch(
                          resetDepositAndCompletionDeadlines({
                            depositDeadline,
                            completionDeadline,
                            userId: user?.user._id,
                            eventId,
                          })
                        );
                      }}
                    >
                      set
                    </button>
                    <FaTimes
                      onClick={() => setIsDepositEdit(false)}
                      className={style.cancelBtn}
                    />
                  </div>
                </>
              )}
              {!isDepositEdit && (
                <>
                  <h4>
                    {moment(new Date(fullEventDetails?.depositDeadline)).format(
                      "DD/MM hh:mm a"
                    )}
                  </h4>
                  <FaEdit
                    title="edit completion deadline"
                    onClick={() => setIsDepositEdit(!isDepositEdit)}
                  />
                </>
              )}
            </div>
          </div>
          <CountDownTimer targetDate={fullEventDetails?.depositDeadline} />
        </div>
        <div className={style.deadlines}>
          <div className={styles3.timelimits}>
            <h4>Completion Deadline</h4>
            <div className={style.deadline_content}>
              {isCompletionEdit && (
                <>
                  <h6>
                    <span>
                      <ReactDatePicker
                        placeholderText="day/month/year e.g 01/01/2000"
                        selected={new Date(completionDeadline)}
                        dateFormat="dd/MM/yyyy"
                        onChange={(date: Date) => {
                          dispatch(
                            updateEventForm({
                              name: "completionDeadline",
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
                            completionDeadline
                          ).setHours(Number(e.target.value.slice(0, 2)));
                          const dateMinutesSet = new Date(
                            dateHourset
                          ).setMinutes(Number(e.target.value.slice(3, 5)));
                          dispatch(
                            updateEventForm({
                              name: "completionDeadline",
                              value: moment(new Date(dateMinutesSet)).format(),
                            })
                          );
                        }}
                      />
                    </span>
                  </h6>
                  <div className={style.deadlineBtns}>
                    <button
                      onClick={() => {
                        setIsDepositEdit(!isCompletionEdit);
                        dispatch(
                          resetDepositAndCompletionDeadlines({
                            depositDeadline,
                            completionDeadline,
                            userId: user?.user._id,
                            eventId,
                          })
                        );
                      }}
                    >
                      set
                    </button>
                    <FaTimes
                      onClick={() => setIsDepositEdit(false)}
                      className={style.cancelBtn}
                    />
                  </div>
                </>
              )}
              {!isCompletionEdit && (
                <>
                  <h4>
                    {moment(
                      new Date(fullEventDetails?.completionDeadline)
                    ).format("DD/MM hh:mm a")}
                  </h4>
                  <FaEdit
                    title="edit completion deadline"
                    onClick={() => setIsCompletionEdit(!isCompletionEdit)}
                  />
                </>
              )}
            </div>
          </div>
          <CountDownTimer targetDate={fullEventDetails?.completionDeadline} />
        </div>
        <button
          className={style.btn_end}
          onClick={() => {
            dispatch(
              updateEventForm({ name: "depositDeadline", value: Date() })
            );
            dispatch(
              updateEventForm({ name: "completionDeadline", value: Date() })
            );
            setShowModal(!showModal);
            setModalType("end_deposit_stage");
          }}
        >
          End Deposit Stage
        </button>
      </div>
      {getDateCountDown(fullEventDetails?.depositDeadline) > 0 && (
        <div className={style.add_new_category}>
          <h3>Create New Category</h3>
          <h6>
            (or proceed to existing categories below (if any) to make deposit)
          </h6>
          <div>
            <input
              value={categoryDesc}
              name="categoryDesc"
              placeholder="New category name"
              onChange={handleChange}
            />
            <input
              value={depositAmount}
              name="depositAmount"
              type="number"
              placeholder="Deposit amount"
              onChange={handleChange}
            />
            <button className={style.btn_add} onClick={handleShowModal}>
              Make Deposit
            </button>
          </div>
          {error?.type === "server_error" && (
            <h5 className={style.warning}>{error?.code}</h5>
          )}
          {error?.type === "deposit_form_error" && (
            <h5 className={style.warning}>{error?.msg}</h5>
          )}
        </div>
      )}
      <div className={style.depositors_container}>
        <div className={style.bar_handle}></div>
        <div className={style.grid_view}>
          <FaList />
          <div>
            <FaMicrosoft />
            <h6>Grid</h6>
          </div>
        </div>
        <div className={style.depositors}>
          {fullEventDetails?.memberCategories?.map((item: any) => {
            return (
              <Deposit_Description
                key={item._id}
                {...item}
                handleFundDeposit={handleFundDeposit}
                handleChange={handleChange}
                handleShowModal={handleShowModal}
                error={error}
                dispatch={dispatch}
              />
            );
          })}
        </div>
      </div>
      {showModal && (
        <div className={style.modal}>
          <FaTimesCircle onClick={() => setShowModal(!showModal)} />
          {modaltype === "deposit_form" && (
            <div>
              <h4>
                You are about to deposit {depositAmount}
                {" NGN"} into event category: {categoryDesc}
              </h4>
              <h5>Amount will be deducted from your wallet balance</h5>
              <div>
                <button onClick={handleFundDeposit} disabled={loading}>
                  Proceed?
                </button>
                <button onClick={() => setShowModal(!showModal)}>Reject</button>
              </div>
            </div>
          )}
          {modaltype === "end_deposit_stage" && (
            <div>
              <h4>{`You are about to end this event's deposit stage`}</h4>
              <h5
                style={{ margin: "0px 10px 15px 10px" }}
              >{`All members who haven't yet made deposits would be automatically exited from the group.`}</h5>
              <div>
                <button
                  onClick={() => {
                    dispatch(
                      resetDepositAndCompletionDeadlines({
                        depositDeadline,
                        completionDeadline,
                        userId: user?.user?._id,
                        eventId,
                      })
                    );
                    setShowModal(!showModal);
                  }}
                  disabled={loading}
                >
                  Proceed?
                </button>
                <button onClick={() => setShowModal(!showModal)}>Reject</button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DepositForm;
