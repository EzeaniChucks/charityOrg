import style from "../events/events.module.css";
import styles2 from "../auth/auth.module.css";
import { FaTimesCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../redux/store";
import { handleEventModule } from "../../../redux/slices/eventSlice";
import DatePicker from "react-datepicker";

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
  } = useSelector((store: any) => store.event);
  const { error } = useSelector((store: any) => store.user);
  const dispatch = useDispatch<AppDispatch>();

  const handleCreate = () => {};
  const handleformcontdisplay = () => {
    if (showEventForm) return style.eventformcontainer;
    else return [style.eventformcontainer, style.showformcontainer].join(" ");
  };
  const handleformdisplay = () => {
    if (showEventForm) return style.eventform;
    else return [style.eventform, style.showeventform].join(" ");
  };

  const handleChange = () => {};
  return (
    <div className={handleformcontdisplay()}>
      <div className={handleformdisplay()}>
        <FaTimesCircle
          onClick={() => dispatch(handleEventModule(showEventForm))}
        />
        <h1>Create Event</h1>
        <div className={[styles2.formContainer, style.formContainer].join(" ")}>
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
                  // dispatch(
                  //   updateFormValues({
                  //     name: "dateOfBirth",
                  //     value: moment(date).format(),
                  //   })
                  // );
                }}
                showYearDropdown
                scrollableYearDropdown
              />
            </label>
            {error.type === "eventDate" && <h6>{error.msg}</h6>}
            <label>
              Time Zone :{" "}
              <input
                type={"text"}
                placeholder={""}
                value={timeZone}
                name={"timeZone"}
                onChange={handleChange}
              />
            </label>
            {error.type === "timeZone" && <h6>{error.msg}</h6>}
            <label>
              Host status :{" "}
              <input
                value={hostStatus}
                name={"hostStatus"}
                onChange={handleChange}
                type={"text"}
              />
            </label>
            <label>
              Currency :{" "}
              <input
                value={currency}
                name={"currency"}
                onChange={handleChange}
                type={"text"}
              />
            </label>
            {error.type === "currency" && <h6>{error.msg}</h6>}
            <label>
              Description :{" "}
              <input
                value={eventDescription}
                name={"eventDescription"}
                onChange={handleChange}
                type={"text"}
              />
            </label>
            {error.type === "password" && <h6>{error.msg}</h6>}
            {error.type === "nextError" && <h6>{error.msg}</h6>}
            <button className={styles2.btn} onClick={handleCreate}>
              CREATE
            </button>
          </div>
        </div>
      </div>
      <div className={style.eventformbackground}></div>
    </div>
  );
};

export default Event_Form;
