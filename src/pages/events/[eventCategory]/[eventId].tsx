import ParticlesComp from "@/components/ParticlesComp";
import { health_related_event, upcoming_event } from "@/utils/arrays";
import { useRouter } from "next/router";
import { useState, useEffect, useCallback } from "react";
import { AiFillProfile, AiTwotoneProfile } from "react-icons/ai";
import { FaArrowLeft, FaCalendar } from "react-icons/fa";
import { IoMdRibbon } from "react-icons/io";
import styles2 from "../../../components/auth/auth.module.css";
import style from "../../../components/events/singleEvent.module.css";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { getAllEvents } from "../../../../redux/slices/eventSlice";
import { AppDispatch } from "../../../../redux/store";

const SingleEvent = () => {
  const { allEvents } = useSelector((store: any) => store.event);
  const { eventId, eventCategory } = useRouter().query;
  const { isReady } = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const generateSingleEvent = () => {
    if (eventCategory === "upcoming_event") {
      return upcoming_event.find((event) => {
        return event.id === Number(eventId);
      });
    }
    if (eventCategory === "health_category") {
      return health_related_event.find((event) => {
        return event.id === Number(eventId);
      });
    }
    if (eventCategory === "academic_category") {
      return health_related_event.find((event) => {
        return event.id === Number(eventId);
      });
    }
    if (eventCategory === "backend_category") {
      const test = allEvents.find((event: any) => {
        return event._id === eventId;
      });
      return test;
    }
  };
  const [singleEvent, setSingleEvent] = useState<any>({});

  const updateEventsArray = useCallback(() => {
    return dispatch(getAllEvents());
  }, [allEvents]);

  useEffect(() => {
    updateEventsArray();
  }, []);
  useEffect(() => {
    if (isReady) {
      setSingleEvent(generateSingleEvent());
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
                  +{singleEvent?.part_number}{" "}
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
                <h3>Event Duration</h3>
                <h6>
                  {moment(new Date()).format("DD, MMM")} -{" "}
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
                <h6>Event Creator</h6>
              </div>
              <button>Follow</button>
            </div>
            <div className={style.aboutcontainer}>
              <h3>
                About{" "}
                {singleEvent?.eventCategory === "upcoming_event"
                  ? "Upcoming "
                  : ""}
                Event
              </h3>
              <p>
                {singleEvent?.eventDescription}
                <br /> <br />
                {singleEvent?.eventDescription}
              </p>
              <button className={style.btn}>Join Event</button>
            </div>
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
