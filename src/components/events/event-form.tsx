import { FaTimesCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../redux/store";
import {
  createEvent,
  handleEventModule,
  resetEvent,
  switchStep,
  updateEventForm,
} from "../../../redux/slices/eventSlice";
import DatePicker from "react-datepicker";
import { timezone } from "@/utils/arrays";
import moment from "moment";
import { logError } from "../../../redux/slices/authSlice";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { CgMathEqual } from "react-icons/cg";
import style from "../events/events.module.css";
import styles2 from "../auth/auth.module.css";
import { currency_array } from "@/utils/fundsArrays";

const Event_Form = () => {
  const {
    event,
    eventName,
    eventPrivacy,
    timeZone,
    hostStatus,
    currency,
    eventDescription,
    depositDeadline,
    completionDeadline,
    eventImageName,
    eventImagePath,
    invitationEmails,
    showEventForm,
    createEventStep,
    loading,
    creationStatus,
  } = useSelector((store: any) => store.event);
  const { error, user } = useSelector((store: any) => store.user);
  const [imagefile, setImagefile] = useState<any>({ name: "", file: {} });
  const [timeValues, setTimeValue] = useState<any>({
    depositTimeValue: "",
    completionTimeValue: "",
  });

  const dispatch = useDispatch<AppDispatch>();
  const { push } = useRouter();
  const picref = useRef<HTMLInputElement>(null);
  const emailInviteRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<any>) => {
    const { name, value, files } = e.target;
    if (files?.length > 0) {
      const imgObj = files[0];
      const imgPath = URL.createObjectURL(imgObj);
      const imgName = `${Date.now()}${imgObj.name}`;
      setImagefile({ name: imgName, file: imgObj });
      // dispatch(updateEventForm({ name: "eventImageName", value: imgName }));
      return dispatch(
        updateEventForm({ name: "eventImagePath", value: imgPath })
      );
    }
    dispatch(updateEventForm({ name, value }));
  };

  const handleNext = () => {
    if (!eventName) {
      return dispatch(
        logError({ type: "eventName", msg: "fill name of event" })
      );
    } else if (eventName) {
      dispatch(logError({ type: "", msg: "" }));
    }
    if (!eventDescription) {
      return dispatch(
        logError({
          type: "eventDescription",
          msg: "A description is compulsory",
        })
      );
    } else if (eventDescription) {
      dispatch(
        logError({
          type: "",
          msg: "",
        })
      );
    }
    const depDate = new Date(depositDeadline).getTime();
    const compDate = new Date(completionDeadline).getTime();
    if (depDate > compDate) {
      return dispatch(
        logError({
          type: "completionDeadline",
          msg: "completion deadline should be after deposit deadline",
        })
      );
    }

    dispatch(switchStep("step2"));
  };

  const handleCreate = () => {
    const finalObj = {
      creatorId: user.user._id,
      eventName,
      eventPrivacy,
      timeZone,
      hostStatus,
      currency,
      eventDescription,
      depositDeadline,
      completionDeadline,
      eventImageName,
      invitationEmails,
    };
    const { name, file } = imagefile;
    const imageData = new FormData();
    const json = JSON.stringify(finalObj);
    const blob = new Blob([json], { type: "application/json" });
    imageData.append("document", blob, "finalObj");

    if (eventImagePath) {
      imageData.append("image", file, name);
      dispatch(createEvent(imageData));
      // return dispatch(uploadEventImage(imageData));
      return dispatch(handleEventModule(showEventForm));
    }
    dispatch(createEvent(imageData));
    dispatch(handleEventModule(showEventForm));
  };
  const handleformcontdisplay = () => {
    if (!showEventForm) return style.eventformcontainer;
    else return [style.eventformcontainer, style.showformcontainer].join(" ");
  };
  const handleformdisplay = () => {
    if (!showEventForm) return style.eventform;
    else return [style.eventform, style.showeventform].join(" ");
  };
  useEffect(() => {
    if (creationStatus) {
      if (event) {
        dispatch(resetEvent());
        push(`/events/backend_category/${event?.event?._id}`);
      }
    }
  }, [creationStatus, event]);
  return (
    <div className={handleformcontdisplay()}>
      <div className={handleformdisplay()}>
        <FaTimesCircle
          onClick={() => dispatch(handleEventModule(showEventForm))}
        />
        {createEventStep === "step2" && (
          <button
            style={{ margin: "-10px 0 10px 0" }}
            className={style.btn}
            onClick={() => dispatch(switchStep("step1"))}
          >
            {"<-- Back"}
          </button>
        )}
        <h1>
          {createEventStep === "step1" ? "Create Event" : "Almost Done!!!"}
        </h1>
        <div className={[styles2.formContainer, style.formContainer].join(" ")}>
          {createEventStep === "step1" && (
            <div className={styles2.general_details}>
              <label>
                Event name :{" "}
                <input
                  type={"text"}
                  placeholder={""}
                  value={eventName}
                  name={"eventName"}
                  onChange={handleChange}
                />
              </label>
              {error.type === "eventName" && <h6>{error.msg}</h6>}
              {/* <label>
                Event Date:{" "}
                <DatePicker
                  placeholderText="day/month/year e.g 01/01/2000"
                  selected={new Date(eventPrivacy)}
                  dateFormat="dd/MM/yyyy"
                  onChange={(date: Date) => {
                    dispatch(
                      updateEventForm({
                        name: "eventPrivacy",
                        value: moment(date).format(),
                      })
                    );
                  }}
                  showYearDropdown
                  scrollableYearDropdown
                  minDate={new Date()}
                />
              </label> */}
              {error.type === "eventPrivacy" && <h6>{error.msg}</h6>}
              <label>
                Time Zone :{" "}
                <select
                  value={timeZone}
                  name={"timeZone"}
                  onChange={handleChange}
                >
                  {timezone.map((item, i) => {
                    return (
                      <option key={i}>{`${item.name} (${item.offset})`}</option>
                    );
                  })}
                </select>
              </label>
              {error.type === "timeZone" && <h6>{error.msg}</h6>}
              <label>
                Host status :{" "}
                <select
                  value={hostStatus}
                  name={"hostStatus"}
                  onChange={handleChange}
                >
                  <option>Depositor</option>
                  <option>Observer</option>
                </select>
              </label>
              {error.type === "hostStatus" && <h6>{error.msg}</h6>}
              <label>
                Event Privacy:{" "}
                <select
                  value={eventPrivacy}
                  name={"eventPrivacy"}
                  onChange={handleChange}
                >
                  <option>Public</option>
                  <option>Private</option>
                </select>
              </label>
              {error.type === "hostStatus" && <h6>{error.msg}</h6>}
              <label>
                Currency :{" "}
                <select
                  value={currency}
                  name={"currency"}
                  onChange={handleChange}
                >
                  {currency_array.map((item) => {
                    return (
                      <option key={Object.keys(item)[0]}>
                        {Object.values(item)[0]}
                      </option>
                    );
                  })}
                </select>
              </label>
              {error.type === "currency" && <h6>{error.msg}</h6>}
              <label>
                Deposit Deadline:{" "}
                <div className={styles2.depositDeadline}>
                  <div className={styles2.forFullDate}>
                    <DatePicker
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
                  </div>
                  <div className={styles2.forFullTime}>
                    Time:
                    <input
                      type="time"
                      value={timeValues.depositTimeValue}
                      onChange={(e) => {
                        setTimeValue({
                          ...timeValues,
                          depositTimeValue: e.target.value,
                        });
                        const dateHourset = new Date(depositDeadline).setHours(
                          Number(e.target.value.slice(0, 2))
                        );
                        // console.log(e.target.value.slice(3, 5));
                        const dateMinutesSet = new Date(dateHourset).setMinutes(
                          Number(e.target.value.slice(3, 5))
                        );
                        dispatch(
                          updateEventForm({
                            name: "depositDeadline",
                            value: moment(new Date(dateMinutesSet)).format(),
                          })
                        );
                      }}
                    />
                  </div>
                </div>
              </label>
              <span
                onClick={() => {
                  setTimeValue({
                    ...timeValues,
                    completionTimeValue: timeValues.depositTimeValue,
                  });
                  const dateHourset = new Date(depositDeadline).setHours(
                    Number(timeValues.depositTimeValue.slice(0, 2))
                  );
                  // console.log(e.target.value.slice(3, 5));
                  const dateMinutesSet = new Date(dateHourset).setMinutes(
                    Number(timeValues.depositTimeValue.slice(3, 5))
                  );
                  // console.log(dateMinutesSet);
                  dispatch(
                    updateEventForm({
                      name: "completionDeadline",
                      value: moment(new Date(dateMinutesSet)).format(),
                    })
                  );
                }}
              >
                <CgMathEqual />
                equalize dates
                <CgMathEqual />
              </span>
              {error.type === "depositDeadline" && <h6>{error.msg}</h6>}
              <label>
                Completion Deadline:{" "}
                <div className={styles2.depositDeadline}>
                  <div className={styles2.forFullDate}>
                    <DatePicker
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
                      minDate={new Date(depositDeadline)}
                    />
                  </div>
                  <div className={styles2.forFullTime}>
                    Time:
                    <input
                      type="time"
                      value={timeValues.completionTimeValue}
                      onChange={(e) => {
                        setTimeValue({
                          ...timeValues,
                          completionTimeValue: e.target.value,
                        });
                        const dateHourset = new Date(
                          completionDeadline
                        ).setHours(Number(e.target.value.slice(0, 2)));
                        // console.log(e.target.value.slice(3, 5));
                        const dateMinutesSet = new Date(dateHourset).setMinutes(
                          Number(e.target.value.slice(3, 5))
                        );
                        dispatch(
                          updateEventForm({
                            name: "completionDeadline",
                            value: moment(new Date(dateMinutesSet)).format(),
                          })
                        );
                      }}
                    />
                  </div>
                </div>
              </label>
              {error.type === "completionDeadline" && <h6>{error.msg}</h6>}
              <label>
                Description :{" "}
                <textarea
                  value={eventDescription}
                  name={"eventDescription"}
                  rows={3}
                  onChange={handleChange}
                />
              </label>
              {error.type === "eventDescription" && <h6>{error.msg}</h6>}
              {error.type !== "" && <h6>{"An error occured"}</h6>}
              <button className={styles2.btn} onClick={handleNext}>
                NEXT
              </button>
            </div>
          )}
          {createEventStep === "step2" && (
            <div className={style.step2}>
              <div className={style.coverdiv}>
                <p>Events are better with theme photos.</p>
                <p onClick={() => picref?.current?.click()}>
                  {eventImageName ? "Change Image" : "Upload one"}
                </p>
                {eventImageName && (
                  <p
                    onClick={() => {
                      dispatch(
                        updateEventForm({ name: "eventImageName", value: "" })
                      );
                      dispatch(
                        updateEventForm({ name: "eventImagePath", value: "" })
                      );
                    }}
                  >
                    Remove
                  </p>
                )}
                <input
                  type={"file"}
                  ref={picref}
                  accept="image/*"
                  onChange={handleChange}
                />
                <div className={style.image_veil}></div>
                <img
                  src={
                    eventImagePath
                      ? eventImagePath
                      : "/images/helping-hand-moonlight.jpg"
                  }
                  alt="prospective event cover"
                />
              </div>
              <div className={style.invitediv}>
                <p>Invite participants to this event (optional)</p>
                <h6>
                  {`Enter valid email addresses below and 'add to queue', or skip to
                  'finish' button`}
                </h6>
                <label>
                  <input
                    id="invitationEmails"
                    type={"text"}
                    placeholder="enter email address"
                    ref={emailInviteRef}
                  />
                  <button
                    onClick={() => {
                      const email =
                        document.querySelector<any>("#invitationEmails");
                      dispatch(
                        updateEventForm({
                          name: "invitationEmails",
                          value: [...invitationEmails, email.value],
                        })
                      );
                      email.value = "";
                    }}
                  >
                    Add to Queue
                  </button>
                </label>
                <div className={style.emailList}>
                  {invitationEmails.map((item: string, i: number) => {
                    return (
                      <div key={i}>
                        <p>{item}</p>;
                        <FaTimesCircle
                          onClick={() => {
                            const newVal = invitationEmails.filter(
                              (mail: string) => mail !== item
                            );
                            dispatch(
                              updateEventForm({
                                name: "invitationEmails",
                                value: newVal,
                              })
                            );
                          }}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
              <button
                className={styles2.btn}
                onClick={handleCreate}
                disabled={loading}
              >
                CREATE EVENT
              </button>
            </div>
          )}
        </div>
      </div>
      <div className={style.eventformbackground}></div>
    </div>
  );
};

export default Event_Form;
