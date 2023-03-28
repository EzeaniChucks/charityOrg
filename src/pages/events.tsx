import ParticlesComp from "@/components/ParticlesComp";
import styles2 from "../components/auth/auth.module.css";
import style from "../components/events/events.module.css";
import {
  IoIosPlanet,
  IoIosNotifications,
  IoMdFootball,
  IoLogoAndroid,
} from "react-icons/io";
import { FaList, FaSearch, FaSearchLocation } from "react-icons/fa";
import { upcoming_event } from "@/utils/arrays";
import Event_Form from "@/components/events/event-form";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useRouter } from "next/router";

const Events = () => {
  const { user } = useSelector((store: any) => store.user);
  const { push } = useRouter();

  useEffect(() => {
    if (!user) push("/");
  });
  return (
    <main className={styles2.container}>
      <div className={style.form_background}>
        <Event_Form />
      </div>
      <div className={style.section}>
        <div className={styles2.dashboard}></div>
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
              <div>
                <IoMdFootball /> Create Event
              </div>
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
                  <div key={item.id} className={style.card}>
                    <img src={item.img} alt="event_img" />
                    <div className={style.date}>
                      <h4>10</h4>
                      <h5>June</h5>
                    </div>
                    <IoLogoAndroid className={style.datesvg} />
                    <h4>{item.title}</h4>
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
              <h3>Health-Related Events</h3>
              <p>{"See all ->"}</p>
            </div>
            <div className={style.cardcontainer}>
              {upcoming_event.map((item) => {
                return (
                  <div key={item.id} className={style.card}>
                    <img src={item.img} alt="event_img" />
                    <div className={style.date}>
                      <h4>10</h4>
                      <h5>June</h5>
                    </div>
                    <IoLogoAndroid className={style.datesvg} />
                    <h4>{item.title}</h4>
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
              <h3>Upcoming Events</h3>
              <p>{"See all ->"}</p>
            </div>
            <div className={style.cardcontainer}>
              {upcoming_event.map((item) => {
                return (
                  <div key={item.id} className={style.card}>
                    <img src={item.img} alt="event_img" />
                    <div className={style.date}>
                      <h4>10</h4>
                      <h5>June</h5>
                    </div>
                    <IoLogoAndroid className={style.datesvg} />
                    <h4>{item.title}</h4>
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
        </div>
      </div>
      <div className={styles2.particles}>
        <ParticlesComp />
      </div>
    </main>
  );
};

export default Events;
