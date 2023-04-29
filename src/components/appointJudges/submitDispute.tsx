import { FaCopy, FaShareAltSquare, FaTimesCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../redux/store";
import {
  createEvent,
  getAllEventMembersAndObservers,
  handleEventModule,
  log_dispute_form,
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
import style3 from "../../components/events/singleEvent.module.css";
import Request_Description from "../request/request_description";

const SubmitDispute = ({
  memberRequestList,
  eventId,
  eventMembers,
  eventObservers,
}: any) => {
  const {
    disputeFormDescription,
    disputeFormJudge,
    eventDescription,
    showEventForm,
    loading,
    creationStatus,
  } = useSelector((store: any) => store.event);
  const { error, user } = useSelector((store: any) => store.user);
  const [imagefile, setImagefile] = useState<any>({ name: "", file: {} });

  const dispatch = useDispatch<AppDispatch>();
  const { push, asPath } = useRouter();
  const linkcopyref = useRef<any>(null);

  const handleChange = (e: React.ChangeEvent<any>) => {
    const { name, value } = e.target;
    dispatch(updateEventForm({ name, value }));
  };

  const handleDisputeFormPublish = () => {
    if (
      !disputeFormDescription ||
      Object.keys(disputeFormJudge).length === 0 ||
      disputed_Events().length === 0
    ) {
      console.log("All up all fields");
      return;
    }

    const data = {
      disputeLogger: user?.user?._id,
      description: disputeFormDescription,
      appointedJudge: disputeFormJudge,
      disputedRequests: disputed_Events(),
      eventId,
    };
    dispatch(log_dispute_form(data));
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
      return item?.disputes?.includes(user?.user?._id);
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
                value={disputeFormDescription}
                name={"disputeFormDescription"}
                rows={3}
                placeholder="Present your case to an event judge"
                onChange={handleChange}
              />
            </label>
            {eventObservers.length > 0 && (
              <>
                <h5>
                  Nominate a judge from the following list of event observers
                  <span style={{ fontSize: "0.6rem" }}>
                    {" "}
                    (Judges with highest nominations will settle entire disputes
                    for this event)
                  </span>
                </h5>
                <div>
                  {eventObservers?.map((item: any) => {
                    return (
                      <p
                        style={{ cursor: "pointer" }}
                        key={item?._id}
                        onClick={() => {
                          return dispatch(
                            updateEventForm({
                              name: "disputeFormJudge",
                              value: { userId: item?.userId, name: item?.name },
                            })
                          );
                        }}
                      >
                        {item?.name ? item.name : "Yet to be named"}
                      </p>
                    );
                  })}
                </div>
              </>
            )}
            {eventObservers.length === 0 && (
              <>
                <h5>
                  No observer is present in this event. But you can share the
                  link to invite someone to join event as an observer
                </h5>
                <div className={style3.shareEvent}>
                  <h4>
                    <FaShareAltSquare /> INVITE FRIENDS TO THIS EVENT
                  </h4>
                  <div
                    onClick={() => {
                      navigator.clipboard.writeText(
                        `https://charityorg.vercel.app${asPath}`
                      );
                      if (linkcopyref.current)
                        linkcopyref.current.textContent = "Link copied";
                      setTimeout(() => {
                        linkcopyref.current.textContent = "";
                      }, 2000);
                    }}
                  >
                    <h4>Copy Link</h4>
                    <FaCopy />
                    <h5 ref={linkcopyref}></h5>
                  </div>
                </div>
              </>
            )}
            {error.type === "eventDescription" && <h6>{error.msg}</h6>}
            {error.type !== "" && <h6>{"An error occured"}</h6>}
            <button
              className={styles2.btn}
              onClick={() => {
                handleDisputeFormPublish();
                dispatch(handleEventModule());
              }}
            >
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
