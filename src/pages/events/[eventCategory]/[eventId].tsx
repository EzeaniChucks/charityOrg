import ParticlesComp from "@/components/ParticlesComp";
import { health_related_event, upcoming_event } from "@/utils/arrays";
import { useRouter } from "next/router";
import { useState, useEffect, useCallback, useRef } from "react";
import { AiFillProfile, AiTwotoneProfile } from "react-icons/ai";
import {
  FaArrowLeft,
  FaCalendar,
  FaCopy,
  FaShareAltSquare,
} from "react-icons/fa";
import { IoMdRibbon } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import {
  fetchEventCreatorDetails,
  getAllEvents,
  joinEvents,
  joinEventsAsObserver,
  resetCreator,
} from "../../../../redux/slices/eventSlice";
import { AppDispatch } from "../../../../redux/store";
import { checkUser, storeUser } from "@/utils/localstorage";
import { setUser } from "../../../../redux/slices/authSlice";
import styles2 from "../../../components/auth/auth.module.css";
import style from "../../../components/events/singleEvent.module.css";

const SingleEvent = () => {
  const { allEvents, eventCreator, loading, joineventNotification } =
    useSelector((store: any) => store.event);
  const { eventId, eventCategory } = useRouter().query;
  const { isReady, asPath, push } = useRouter();
  const linkcopyref = useRef<any>(null);

  // console.log(useRouter().route);

  const generateSingleEvent = () => {
    if (eventCategory === "upcoming_event") {
      dispatch(resetCreator());
      return upcoming_event.find((event) => {
        return event.id === Number(eventId);
      });
    }
    if (eventCategory === "health_category") {
      dispatch(resetCreator());
      return health_related_event.find((event) => {
        return event.id === Number(eventId);
      });
    }
    if (eventCategory === "academic_category") {
      dispatch(resetCreator());
      return health_related_event.find((event) => {
        return event.id === Number(eventId);
      });
    }
    if (eventCategory === "backend_category") {
      dispatch(resetCreator());
      const event = allEvents.find((event: any) => {
        return event._id === eventId;
      });
      if (event) dispatch(fetchEventCreatorDetails(event?.creatorId));
      return event;
    }
  };

  const isEventMemberOrObserver = () => {
    const memberExists = singleEvent?.members?.find((item: any) => {
      return item?.userId === user?.user?._id;
    });
    const observerExists = singleEvent?.observers?.find((item: any) => {
      return item?.userId === user?.user?._id;
    });

    if (memberExists || observerExists) return true;
    else return false;
  };

  const [singleEvent, setSingleEvent] = useState<any>({});
  const { user } = useSelector((store: any) => store.user);
  const dispatch = useDispatch<AppDispatch>();

  const updateEventsArray = useCallback(() => {
    return dispatch(getAllEvents());
  }, [allEvents]);

  // console.log(eventCreator?._id, user?.user._id);

  useEffect(() => {
    updateEventsArray();
    let userValue = checkUser();
    if (userValue) dispatch(setUser(userValue));
  }, [joineventNotification]);

  useEffect(() => {
    if (isReady) {
      setSingleEvent(generateSingleEvent());
      isEventMemberOrObserver();
    }
  }, [isReady, allEvents]);

  return (
    <main className={styles2.container}>
      <div className={style.content}>
        <div className={style.eventCard}>
          <div className={style.hero}>
            <div className={style.herotop}>
              <div>
                <FaArrowLeft />
                <h2>Event Details</h2>
              </div>
              <IoMdRibbon />
            </div>
            <div className={style.participant}>
              <div>
                <img
                  src={singleEvent?.participant1}
                  alt={singleEvent?.participant1}
                />
                <img
                  src={singleEvent?.participant2}
                  alt={singleEvent?.participant2}
                />
                <img
                  src={singleEvent?.participant3}
                  alt={singleEvent?.participant3}
                />
                <h5>
                  {singleEvent?.members?.length}{" "}
                  {singleEvent?.eventCategory === "upcoming_event"
                    ? "going"
                    : "participants"}
                </h5>
              </div>
              <button className={style.btn}>View</button>
            </div>
            <img src={singleEvent?.eventImageName} alt={singleEvent?.title} />
          </div>
          <div className={style.eventcardbody}>
            <h2>{singleEvent?.eventName}</h2>
            <div className={style.datecontainer}>
              <FaCalendar />
              <div>
                <h3>Event Deadline</h3>
                <h6>
                  {/* {moment(new Date()).format("DD, MMM")} -{" "} */}
                  {moment(new Date(singleEvent?.completionDeadline)).format(
                    "DD, MMM"
                  )}
                </h6>
              </div>
            </div>
            <div className={style.creatorcontainer}>
              <img src="/images/female-social-profile.jpg" />
              <div>
                <h3>{singleEvent?.eventCreator}</h3>
                <h5>
                  {eventCreator?.firstName} {eventCreator?.lastName}
                </h5>
                <h6>Event Creator</h6>
              </div>
              {eventCreator?._id !== user?.user._id && <button>Follow</button>}
            </div>
            <div className={style.aboutcontainer}>
              <h3>
                About{" "}
                {singleEvent?.eventCategory === "upcoming_event"
                  ? "Upcoming "
                  : ""}
                Event
              </h3>
              <p>{singleEvent?.eventDescription}</p>
            </div>
            <div className={style.shareEvent}>
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
            {isEventMemberOrObserver() && (
              <button
                className={style.btn}
                onClick={() =>
                  push(`/events/${eventCategory}/${eventId}/activity_room`)
                }
              >
                Open Event
              </button>
            )}
            {!isEventMemberOrObserver() && (
              <button
                className={style.btn}
                onClick={() => {
                  dispatch(joinEvents({ eventId, userId: user?.user._id }));
                }}
                disabled={loading}
              >
                Join Event As Member
              </button>
            )}
            {!isEventMemberOrObserver() && (
              <button
                className={style.btn}
                onClick={() => {
                  dispatch(
                    joinEventsAsObserver({ eventId, userId: user?.user._id })
                  );
                }}
                disabled={loading}
              >
                Join As Observer
              </button>
            )}
          </div>
        </div>
      </div>
      <div className={styles2.particles}>
        <ParticlesComp />
      </div>
    </main>
  );
};

export default SingleEvent;
