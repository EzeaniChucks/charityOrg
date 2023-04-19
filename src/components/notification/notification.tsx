import { useEffect } from "react";
import {
  get_Notification,
  handleNotifModal,
  message_checked_status,
} from "../../../redux/slices/notificationsSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../redux/store";
import { useRouter } from "next/router";
import { conStringFrontEnd } from "@/utils/conString";
import style2 from "../../pages/events/[eventCategory]/[eventId]/activity_room.module.css";
import style from "./notification.module.css";
import { setTabState } from "../../../redux/slices/eventSlice";

const Notification = () => {
  const { notifications, notifLogStatus } = useSelector(
    (store: any) => store.notifications
  );
  const { push } = useRouter();
  const { user } = useSelector((store: any) => store.user);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (user) {
      dispatch(get_Notification(user?.user?._id));
    }
  }, [user, notifLogStatus]);

  return (
    <div className={style.notification_container}>
      <h3>Notifications</h3>
      {notifications.map((item: any) => {
        return (
          <div key={item._id}>
            <p
              onClick={() => {
                push(`${item?.link}`);
                dispatch(handleNotifModal());
                if (item?.type === "request edit") {
                  dispatch(setTabState("request"));
                }
                dispatch(
                  message_checked_status({
                    messageId: item._id,
                    userId: user?.user?._id,
                  })
                );
              }}
              className={!item?.has_checked ? style.checkedmessage : ""}
            >
              {item?.message}
            </p>
            <hr />
          </div>
        );
      })}
    </div>
  );
};

export default Notification;
