import { FaTimesCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../redux/store";
import {
  createEvent,
  getAllEventMembersAndObservers,
  handleEventModule,
  resetEvent,
  switchStep,
  updateEventForm,
} from "../../../redux/slices/eventSlice";
import DatePicker from "react-datepicker";
import { timezone } from "@/utils/arrays";
import moment from "moment";
import { logError } from "../../../redux/slices/authSlice";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { CgMathEqual } from "react-icons/cg";
import style from "../events/events.module.css";
import styles2 from "../auth/auth.module.css";
import Request_Description from "../request/request_description";

const SubmitDispute = ({
  memberRequestList,
  eventId,
  eventMembers,
  eventObservers,
}: any) => {
  const {
    event,
    eventName,
    eventDate,
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
    loading,
    creationStatus,
  } = useSelector((store: any) => store.event);
  const { error, user } = useSelector((store: any) => store.user);
  const [imagefile, setImagefile] = useState<any>({ name: "", file: {} });

  const dispatch = useDispatch<AppDispatch>();
  const { push } = useRouter();

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
      eventDate,
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

  const disputed_Events = () => {
    return memberRequestList?.filter((item: any) => {
      return item?.disputes?.includes(user.user._id);
    });
  };
  //   console.log(disputed_Events(), memberRequestList);
  return (
    <div className={handleformcontdisplay()}>
      <div className={handleformdisplay()}>
        <FaTimesCircle
          onClick={() => dispatch(handleEventModule(showEventForm))}
        />
        <h1>Dispute submission</h1>
        <div className={[styles2.formContainer, style.formContainer].join(" ")}>
          <div
            className={styles2.general_details}
            style={{ height: "60vh", overflowY: "auto" }}
          >
            <h5>Your disputed events</h5>
            {disputed_Events()?.map((item: any) => {
              return (
                <Request_Description
                  key={item._id}
                  {...item}
                  //   handleRequestSubmission={handleRequestSubmission}
                  handleChange={handleChange}
                  //   handleShowModal={handleShowModal}
                  //   getMemberRequestList={getMemberRequestList}
                  error={error}
                  eventPageName={"disputes submission"}
                  eventId={eventId}
                  dispatch={dispatch}
                />
              );
            })}
            {error.type === "completionDeadline" && <h6>{error.msg}</h6>}
            <label>
              What do you have against these requests?{" "}
              <textarea
                value={eventDescription}
                name={"eventDescription"}
                rows={3}
                placeholder="Present your case to an event judge"
                onChange={handleChange}
              />
            </label>
            <h5>
              Nominate a judge from the following list of event observers
              <span style={{ fontSize: "0.6rem" }}>
                {" "}
                (Judges with highest nominations will settle entire disputes for
                this event)
              </span>
            </h5>
            <select>
              {eventMembers?.map((item: any) => {
                return <option key={item._id}>{item.userId}</option>;
              })}
            </select>
            {error.type === "eventDescription" && <h6>{error.msg}</h6>}
            {error.type !== "" && <h6>{"An error occured"}</h6>}
            <button className={styles2.btn} onClick={handleNext}>
              PUBLISH
            </button>
          </div>
        </div>
      </div>
      <div className={style.eventformbackground}></div>
    </div>
  );
};

export default SubmitDispute;
