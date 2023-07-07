import { VscPass } from "react-icons/vsc";
import styles1 from "../../pages/user/userProfile.module.css";
import { setUserSubscription } from "../../../redux/slices/authSlice";

const UserSubscriptions = ({
  user,
  plans,
  subs_expiration_value,
  subs_expiration_quantifier,
  platinum_price_c,
  platinum_price_v,
  gold_price_c,
  gold_price_v,
  showModal,
  setShowModal,
  setModalType,
  subscriptionType,
  setSubscriptionType,
  dispatch,
}: {
  user: any;
  plans: any;
  subs_expiration_value: any;
  subs_expiration_quantifier: any;
  platinum_price_c: any;
  platinum_price_v: any;
  gold_price_c: any;
  gold_price_v: any;
  showModal: any;
  setShowModal: any;
  modalType: any;
  setModalType: any;
  subscriptionType: any;
  setSubscriptionType: any;
  dispatch: any;
}) => {
  return (
    <>
      <h4>CHOOSE SUBSCRIPTION</h4>
      <div>
        <div
          className={
            user?.user?.subscription?.subscription_type === "free"
              ? styles1.currentSubscription
              : ""
          }
          onClick={() => {
            const subType = "free";
            const userId = user?.user?._id;
            setShowModal(!showModal);
            setModalType("chooseSubscription");
            setSubscriptionType("free");
            // dispatch(setUserSubscription({ subType, userId }));
          }}
        >
          <h4>
            {user?.user?.subscription?.subscription_type === "free"
              ? "You are currently on Free Plan"
              : "Free plan features"}
          </h4>
          <h5>You can:</h5>
          {Object.keys(plans?.free).map((eachSub: any, i: number) => {
            return (
              <div key={i}>
                <VscPass />
                <p>{eachSub}</p>
              </div>
            );
          })}
          <h4>Price: Free</h4>
        </div>
        <div
          className={
            user?.user?.subscription?.subscription_type === "gold"
              ? styles1.currentSubscription
              : ""
          }
          onClick={() => {
            const subType = "gold";
            const userId = user?.user?._id;
            setShowModal(!showModal);
            setModalType("chooseSubscription");
            setSubscriptionType("gold");
            // dispatch(setUserSubscription({ subType, userId }));
          }}
        >
          <h4>
            {user?.user?.subscription?.subscription_type === "gold" &&
              "You are currently on Gold Plan"}
            {user?.user?.subscription?.subscription_type === "free" &&
              "Upgrade to Gold plan"}
            {user?.user?.subscription?.subscription_type === "platinum" &&
              "Downgrade to Gold plan"}
          </h4>
          <h5>You can:</h5>
          {Object.keys(plans?.gold).map((eachSub: any, i: number) => {
            return (
              <div key={i}>
                <VscPass />
                <p>{eachSub}</p>
              </div>
            );
          })}
          <h4>
            Price: {gold_price_v} {gold_price_c}
          </h4>
          <h6>
            autorenewed every {subs_expiration_value}{" "}
            {subs_expiration_quantifier}(s)
          </h6>
        </div>
        <div
          className={
            user?.user?.subscription?.subscription_type === "platinum"
              ? styles1.currentSubscription
              : ""
          }
          onClick={() => {
            const subType = "platinum";
            const userId = user?.user?._id;
            setShowModal(!showModal);
            setModalType("chooseSubscription");
            setSubscriptionType("platinum");
            // dispatch(setUserSubscription({ subType, userId }));
          }}
        >
          <h4>
            {user?.user?.subscription?.subscription_type === "platinum" &&
              "You are currently on Platinum Plan"}
            {user?.user?.subscription?.subscription_type === "free" &&
              "Upgrade to Platinum plan"}
            {user?.user?.subscription?.subscription_type === "gold" &&
              "Upgrade to Platinum plan"}
          </h4>
          <h5>You can:</h5>
          {Object.keys(plans?.platinum).map((eachSub: any, i: number) => {
            return (
              <div key={i}>
                <VscPass />
                <p>{eachSub}</p>
              </div>
            );
          })}
          <h4>
            Price: {platinum_price_v} {platinum_price_c}
          </h4>
          <h6>
            autorenewed every {subs_expiration_value}{" "}
            {subs_expiration_quantifier}(s)
          </h6>
        </div>
      </div>
    </>
  );
};

export default UserSubscriptions;
