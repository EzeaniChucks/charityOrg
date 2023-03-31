import ParticlesComp from "@/components/ParticlesComp";
import { health_related_event, upcoming_event } from "@/utils/arrays";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { AiFillProfile, AiTwotoneProfile } from "react-icons/ai";
import { FaArrowLeft, FaCalendar } from "react-icons/fa";
import { IoMdRibbon } from "react-icons/io";
import styles2 from "../../../components/auth/auth.module.css";
import style from "../../../components/events/singleEvent.module.css";

const SingleEvent = () => {
  const { eventId, eventCategory } = useRouter().query;
  const { isReady } = useRouter();

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
  };

  useEffect(() => {
    if (isReady) setSingleEvent(generateSingleEvent());
  }, [isReady]);

  const [singleEvent, setSingleEvent] = useState<any>({});

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
                  {singleEvent.eventCategory === "upcoming_event"
                    ? "going"
                    : "participants"}
                </h5>
              </div>
              <button className={style.btn}>View</button>
            </div>
            <img src={singleEvent?.img} alt={singleEvent?.title} />
          </div>
          <div className={style.eventcardbody}>
            <h2>{singleEvent?.title}</h2>
            <div className={style.datecontainer}>
              <FaCalendar />
              <div>
                <h3>Event Duration</h3>
                <h6>13 Jan, 2023 - 2 Feb, 2023</h6>
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
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Consequuntur officiis quis magnam aliquid repudiandae nisi
                delectus quo aliquam quam. Sequi dolorem accusantium cumque sit
                temporibus nemo porro molestias numquam deserunt.
                <br /> <br />
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Consequuntur officiis quis magnam aliquid repudiandae nisi
                delectus quo aliquam quam. Sequi dolorem accusantium cumque sit
                temporibus nemo porro molestias numquam deserunt .
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
