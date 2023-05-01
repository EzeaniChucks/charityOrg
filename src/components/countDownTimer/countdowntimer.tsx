import React from "react";
import { useCountdown } from "@/hooks/useCountdown";
import style from "./countDownTimer.module.css";

const DateTimeDisplay = ({
  value,
  type,
  isDanger,
}: {
  value: any;
  type: any;
  isDanger: boolean;
}) => {
  return (
    <div className={isDanger ? style.countdown_danger : style.countdown}>
      <p>{value}</p>
      <span>{type}</span>
    </div>
  );
};

const CountDownTime = ({ targetDate }: { targetDate: any }) => {
  const [days, hours, minutes, seconds] = useCountdown(targetDate);
  if (days + hours + minutes + seconds <= 0) {
    return <div className={style.expired_notice}>Date has expired</div>;
  }
  return (
    <div className={style.show_counter}>
      <div className={style.countdown_comp}>
        <DateTimeDisplay value={days} type={"Days"} isDanger={days <= 2} />
        <div className={style.time}>
          <DateTimeDisplay value={hours} type={"h"} isDanger={false} />
          <DateTimeDisplay value={minutes} type={"m"} isDanger={false} />
          <DateTimeDisplay value={seconds} type={"s"} isDanger={false} />
        </div>
      </div>
    </div>
  );
};

export default CountDownTime;
