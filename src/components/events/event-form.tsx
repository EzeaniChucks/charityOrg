import style from "../events/events.module.css";
import styles2 from "../auth/auth.module.css";
import { FaTimesCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../redux/store";
import {
  handleEventModule,
  switchStep,
  updateEventForm,
} from "../../../redux/slices/eventSlice";
import DatePicker from "react-datepicker";
import { timezone } from "@/utils/arrays";
import moment from "moment";
import { logError } from "../../../redux/slices/authSlice";
import { useRef } from "react";

const Event_Form = () => {
  const {
    eventName,
    eventDate,
    timeZone,
    hostStatus,
    currency,
    eventDescription,
    depositDeadline,
    completionDeadline,
    showEventForm,
    createEventStep,
  } = useSelector((store: any) => store.event);
  const { error } = useSelector((store: any) => store.user);
  const dispatch = useDispatch<AppDispatch>();
  const picref = useRef<HTMLInputElement>(null);
  const handleChange = (e: React.ChangeEvent<any>) => {
    const { name, value } = e.target;
    dispatch(updateEventForm({ name, value }));
  };

  const handleCreate = () => {
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

    dispatch(switchStep("step2"));
    // const finalObj = {
    //   eventName,
    //   eventDate,
    //   timeZone,
    //   hostStatus,
    //   currency,
    //   eventDescription,
    //   depositDeadline,
    //   completionDeadline,
    // };
    // console.log(finalObj);
  };
  const handleformcontdisplay = () => {
    if (showEventForm) return style.eventformcontainer;
    else return [style.eventformcontainer, style.showformcontainer].join(" ");
  };
  const handleformdisplay = () => {
    if (showEventForm) return style.eventform;
    else return [style.eventform, style.showeventform].join(" ");
  };

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
              <label>
                Event Date:{" "}
                <DatePicker
                  placeholderText="day/month/year e.g 01/01/2000"
                  selected={new Date(eventDate)}
                  dateFormat="dd/MM/yyyy"
                  onChange={(date: Date) => {
                    dispatch(
                      updateEventForm({
                        name: "eventDate",
                        value: moment(date).format(),
                      })
                    );
                  }}
                  showYearDropdown
                  scrollableYearDropdown
                  minDate={new Date()}
                />
              </label>
              {error.type === "eventDate" && <h6>{error.msg}</h6>}
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
                Currency :{" "}
                <select
                  value={currency}
                  name={"currency"}
                  onChange={handleChange}
                >
                  <option>USD</option>
                  <option>Euro</option>
                  <option>Naira</option>
                </select>
              </label>
              {error.type === "currency" && <h6>{error.msg}</h6>}
              <label>
                Deposit Deadline:{" "}
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
              </label>
              {error.type === "depositDeadline" && <h6>{error.msg}</h6>}
              <label>
                Completion Deadline:{" "}
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
              </label>
              <h6 style={{ color: "grey" }}>
                Note that completion date must be on or after deposit deadline
              </h6>
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
              <button className={styles2.btn} onClick={handleCreate}>
                CREATE
              </button>
            </div>
          )}
          {createEventStep === "step2" && (
            <div className={style.step2}>
              <div className={style.coverdiv}>
                <p>Events are better with theme photos.</p>
                <p onClick={() => picref?.current?.click()}>Upload one</p>
                <input type={"file"} ref={picref} accept="image/*" />
                <img
                  src="/images/helping-hand-moonlight.jpg"
                  alt="prospective event cover"
                />
              </div>
              <div className={style.invitediv}>
                <p>Invite participants to this event</p>
                <label>
                  Send Invitation
                  <input type={"text"} placeholder="enter email address" />
                </label>
              </div>
              <button className={styles2.btn} onClick={handleCreate}>
                FINISH
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
