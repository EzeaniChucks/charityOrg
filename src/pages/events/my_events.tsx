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
  updateEventForm,
} from "../../../redux/slices/eventSlice";
import { checkUser } from "@/utils/localstorage";
import { setUser } from "../../../redux/slices/authSlice";
import { AppDispatch } from "../../../redux/store";
import moment from "moment";
import styles2 from "../../components/auth/auth.module.css";
import style from "../../components/events/events.module.css";
import Notification from "@/components/notification/notification";
import {
  get_Notification,
  handleNotifModal,
} from "../../../redux/slices/notificationsSlice";

const MyEvents = () => {
  const { user } = useSelector((store: any) => store.user);
  const { allEvents, eventSearchValue } = useSelector(
    (store: any) => store.event
  );
  const { notifLogStatus, notifModalIsOpen, notifications } = useSelector(
    (store: any) => store.notifications
  );
  const { push } = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    let userValue = checkUser();
    if (userValue) dispatch(setUser(userValue));
  }, []);

  useEffect(() => {
    dispatch(getAllEvents(eventSearchValue));
  }, [eventSearchValue]);

  useEffect(() => {
    if (user) {
      dispatch(get_Notification(user?.user?._id));
    }
    // return () => {
    //   dispatch(updateEventForm({ name: "eventSearchValue", value: "" }));
    // };
  }, [user, notifLogStatus]);

  const handleEventSearch = (e: any) => {
    return dispatch(
      updateEventForm({ name: "eventSearchValue", value: e.target.value })
    );
  };

  const PersonalEvents = () => {
    if (allEvents.length > 0) {
      const arr: any = [];
      allEvents?.map((event: any) => {
        event?.members.map((items: any) => {
          if (items.userId === user?.user?._id) {
            arr.push({ ...event, participatingAs: "depositor" });
          }
        });
        event?.observers.map((items: any) => {
          if (items.userId === user?.user?._id) {
            arr.push({ ...event, participatingAs: "observer" });
          }
        });
      });
      return arr;
    } else {
      return [];
    }
  };
  return (
    <main className={styles2.container}>
      <div className={style.section}>
        {/* <div className={styles2.dashboard}></div> */}
        <div className={style.content}>
          <div className={style.headboard}>
            <div className={style.upper_headboard}>
              <FaList />
              <div>
                <h3>My Events</h3>
                <h6 onClick={() => push("/events")}>Go to all events</h6>
              </div>
              <IoIosNotifications
                onClick={() => dispatch(handleNotifModal())}
              />
              {notifModalIsOpen && (
                <div className={style.notification_modal}>
                  <Notification />
                </div>
              )}
            </div>
            <div className={style.lower_headboard}>
              <div className={style.searchbar}>
                <FaSearch />
                <input
                  type={"text"}
                  value={eventSearchValue}
                  onChange={handleEventSearch}
                  placeholder={"Search personal event"}
                />
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
              <h3>My Event List</h3>
            </div>
            <div className={style.cardcontainer_sans_inline}>
              {PersonalEvents().length === 0 && eventSearchValue && (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "0.9rem",
                    textAlign: "center",
                    height: "40vh",
                    padding: "50px",
                  }}
                >
                  <h3>
                    No event with this name. Use another search term or visit
                    <span
                      style={{ cursor: "pointer", color: "rgb(50, 100, 60)" }}
                      onClick={() => push("/events")}
                    >
                      {" "}
                      main event page
                    </span>{" "}
                    to search the event you seek
                  </h3>
                </div>
              )}
              {PersonalEvents().length === 0 && !eventSearchValue && (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "0.9rem",
                    textAlign: "center",
                    height: "40vh",
                    padding: "50px",
                  }}
                >
                  {
                    <h3>
                      You are not part of any events yet. Create a new event or
                      join public events from our{" "}
                      <span
                        style={{ cursor: "pointer", color: "rgb(50, 100, 60)" }}
                        onClick={() => push("/events")}
                      >
                        All Events
                      </span>{" "}
                      page
                    </h3>
                  }
                </div>
              )}
              {PersonalEvents()?.map((item: any) => {
                return (
                  <div
                    onClick={() =>
                      push(`/events/${"backend_category"}/${item?._id}`)
                    }
                    key={item?._id}
                    className={style.card}
                  >
                    <img src={item?.eventImageName} alt="event_img" />
                    <div className={style.date}>
                      <h4>
                        {moment(new Date(item?.completionDeadline)).format(
                          "DD"
                        )}
                      </h4>
                      <h5>
                        {moment(new Date(item?.completionDeadline)).format(
                          "MMM"
                        )}
                      </h5>
                    </div>
                    <IoLogoAndroid className={style.datesvg} />
                    <h4>{item.eventName}</h4>
                    <div className={style.participant}>
                      {item?.members?.length > 0 && (
                        <div>
                          {item?.members?.map((_: any, i: number) => {
                            if (i < 3) {
                              return (
                                <img key={i} src={item?.participant1} alt="" />
                              );
                            }
                          })}
                          {/* <img src={item.participant2} alt="" />
                        <img src={item.participant3} alt="" /> */}
                        </div>
                      )}
                      <h5>{item?.members?.length} participant(s)</h5>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        gap: "5px",
                        fontSize: "0.9rem",
                      }}
                    >
                      <h5>Participating As:</h5>
                      <h5>{item?.participatingAs}</h5>
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

export default MyEvents;
