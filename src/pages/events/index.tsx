import ParticlesComp from "@/components/ParticlesComp";
import {
  IoIosPlanet,
  IoIosNotifications,
  IoMdFootball,
  IoLogoAndroid,
} from "react-icons/io";
import { FaList, FaSearch, FaSearchLocation } from "react-icons/fa";
import {
  academic_related_event,
  health_related_event,
  upcoming_event,
} from "@/utils/arrays";
import Event_Form from "@/components/events/event-form";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useRouter } from "next/router";
import {
  getAllEvents,
  handleEventModule,
} from "../../../redux/slices/eventSlice";
import { checkUser } from "@/utils/localstorage";
import { setUser } from "../../../redux/slices/authSlice";
import { AppDispatch } from "../../../redux/store";
import moment from "moment";
import styles2 from "../../components/auth/auth.module.css";
import style from "../../components/events/events.module.css";

const Events = () => {
  const { user } = useSelector((store: any) => store.user);
  const { allEvents } = useSelector((store: any) => store.event);
  const { push } = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    let userValue = checkUser();
    if (userValue) dispatch(setUser(userValue));
    dispatch(getAllEvents());
  }, []);

  return (
    <main className={styles2.container}>
      <div className={style.section}>
        {/* <div className={styles2.dashboard}></div> */}
        <div className={style.content}>
          <div className={style.headboard}>
            <div className={style.upper_headboard}>
              <FaList />
              <h3>Lagos, Nigeria</h3>
              <IoIosNotifications />
            </div>
            <div className={style.lower_headboard}>
              <div className={style.searchbar}>
                <FaSearch />
                <input type={"text"} placeholder={"Search event"} />
              </div>
            </div>
            <div className={style.floaters}>
              {user && (
                <div onClick={() => dispatch(handleEventModule())}>
                  <IoMdFootball /> Create Event
                </div>
              )}
              <div>
                Filter Events <IoIosPlanet />
              </div>
            </div>
          </div>

          <div className={style.eventcontainer}>
            <div className={style.heading}>
              <h3>Upcoming Events</h3>
              <p>{"See all ->"}</p>
            </div>
            <div className={style.cardcontainer}>
              {upcoming_event.map((item) => {
                return (
                  <div
                    onClick={() =>
                      push(`/events/${item.eventCategory}/${item.id}`)
                    }
                    key={item.id}
                    className={style.card}
                  >
                    <img src={item.eventImageName} alt="event_img" />
                    <div className={style.date}>
                      <h4>
                        {moment(new Date(item.completionDeadline)).format("DD")}
                      </h4>
                      <h5>
                        {moment(new Date(item.completionDeadline)).format("MM")}
                      </h5>
                    </div>
                    <IoLogoAndroid className={style.datesvg} />
                    <h4>{item.eventName}</h4>
                    <div className={style.participant}>
                      <div>
                        <img src={item.participant1} alt="participant" />
                        <img src={item.participant2} alt="participant" />
                        <img src={item.participant3} alt="participant" />
                      </div>
                      <h5>+{item.part_number} going</h5>
                    </div>
                    <div className={style.location}>
                      <FaSearchLocation />
                      <h5>
                        5, Chief Spectacular avenue, off Lagoa highway, Lagos
                      </h5>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className={style.eventcontainer}>
            <div className={style.heading}>
              <h3>Backend Events</h3>
              <p>{"See all ->"}</p>
            </div>
            <div className={style.cardcontainer}>
              {allEvents.map((item: any) => {
                return (
                  <div
                    onClick={() =>
                      push(`/events/${"backend_category"}/${item._id}`)
                    }
                    key={item._id}
                    className={style.card}
                  >
                    <img src={item.eventImageName} alt="event_img" />
                    <div className={style.date}>
                      <h4>
                        {moment(new Date(item.completionDeadline)).format("DD")}
                      </h4>
                      <h5>
                        {moment(new Date(item.completionDeadline)).format(
                          "MMM"
                        )}
                      </h5>
                    </div>
                    <IoLogoAndroid className={style.datesvg} />
                    <h4>{item.eventName}</h4>
                    <div className={style.participant}>
                      <div>
                        <img src={item.participant1} alt="participant" />
                        <img src={item.participant2} alt="participant" />
                        <img src={item.participant3} alt="participant" />
                      </div>
                      <h5>+{10} participant</h5>
                    </div>
                    <div className={style.location}>
                      <FaSearchLocation />
                      <h5>
                        5, Chief Spectacular avenue, off Lagoa highway, Lagos
                      </h5>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className={style.eventcontainer}>
            <div className={style.heading}>
              <h3>Health-Related Events</h3>
              <p>{"See all ->"}</p>
            </div>
            <div className={style.cardcontainer}>
              {health_related_event.map((item) => {
                return (
                  <div
                    onClick={() =>
                      push(`/events/${item.eventCategory}/${item.id}`)
                    }
                    key={item.id}
                    className={style.card}
                  >
                    <img src={item.eventImageName} alt="event_img" />
                    <div className={style.date}>
                      <h4>
                        {moment(new Date(item.completionDeadline)).format("DD")}
                      </h4>
                      <h5>
                        {moment(new Date(item.completionDeadline)).format(
                          "MMM"
                        )}
                      </h5>
                    </div>
                    <IoLogoAndroid className={style.datesvg} />
                    <h4>{item.eventName}</h4>
                    <div className={style.participant}>
                      <div>
                        <img src={item.participant1} alt="participant" />
                        <img src={item.participant2} alt="participant" />
                        <img src={item.participant3} alt="participant" />
                      </div>
                      <h5>+{item.part_number} participants</h5>
                    </div>
                    <div className={style.location}>
                      <FaSearchLocation />
                      <h5>
                        5, Chief Spectacular avenue, off Lagoa highway, Lagos
                      </h5>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className={style.eventcontainer}>
            <div className={style.heading}>
              <h3>Academic Events</h3>
              <p>{"See all ->"}</p>
            </div>
            <div className={style.cardcontainer}>
              {academic_related_event.map((item) => {
                return (
                  <div
                    onClick={() =>
                      push(`/events/${item.eventCategory}/${item.id}`)
                    }
                    key={item.id}
                    className={style.card}
                  >
                    <img src={item.eventImageName} alt="event_img" />
                    <div className={style.date}>
                      <h4>
                        {moment(new Date(item.completionDeadline)).format("DD")}
                      </h4>
                      <h5>
                        {moment(new Date(item.completionDeadline)).format(
                          "MMM"
                        )}
                      </h5>
                    </div>
                    <IoLogoAndroid className={style.datesvg} />
                    <h4>{item.eventName}</h4>
                    <div className={style.participant}>
                      <div>
                        <img src={item.participant1} alt="participant" />
                        <img src={item.participant2} alt="participant" />
                        <img src={item.participant3} alt="participant" />
                      </div>
                      <h5>+{item.part_number} participants</h5>
                    </div>
                    <div className={style.location}>
                      <FaSearchLocation />
                      <h5>
                        5, Chief Spectacular avenue, off Lagoa highway, Lagos
                      </h5>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <Event_Form />
      <div className={styles2.particles}>
        <ParticlesComp />
      </div>
    </main>
  );
};

export default Events;
