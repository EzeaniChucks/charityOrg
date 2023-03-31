import ParticlesComp from "@/components/ParticlesComp";
import { health_related_event, upcoming_event } from "@/utils/arrays";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa";
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
            <div>
              <div>
                <FaArrowLeft />
                <h2>Event Details</h2>
              </div>
              <IoMdRibbon />
            </div>
            <img src={singleEvent?.img} alt={singleEvent?.title} />
          </div>
          <h2>{singleEvent?.title}</h2>
        </div>
      </div>
      <div className={styles2.particles}>
        <ParticlesComp />
      </div>
    </main>
  );
};

export default SingleEvent;
