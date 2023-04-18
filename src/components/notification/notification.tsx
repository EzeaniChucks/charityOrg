import { useEffect } from "react";
import {
  get_Notification,
  message_checked_status,
} from "../../../redux/slices/notificationsSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../redux/store";
import { useRouter } from "next/router";
import { conStringFrontEnd } from "@/utils/conString";
import style2 from "../../pages/events/[eventCategory]/[eventId]/activity_room.module.css";
import style from "./notification.module.css";

const Notification = () => {
  const { notifications, notifLogStatus } = useSelector(
    (store: any) => store.notifications
  );
  const { user } = useSelector((store: any) => store.user);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (user) {
      dispatch(get_Notification(user?.user?._id));
    }
  }, [user, notifLogStatus]);

  return (
    <div className={style.notification_container}>
      {notifications.map((item: any) => {
        return (
          <a key={item._id} href={`${item?.link}`}>
            <p
              onClick={() =>
                dispatch(
                  message_checked_status({
                    messageId: item._id,
                    userId: user?.user?._id,
                  })
                )
              }
              className={!item?.has_checked ? style.checkedmessage : ""}
            >
              {item?.message}
            </p>
            <hr />
          </a>
        );
      })}
    </div>
  );
};

export default Notification;
