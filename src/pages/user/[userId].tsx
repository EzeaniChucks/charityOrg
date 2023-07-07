import ParticlesComp from "@/components/ParticlesComp";
import { FaPencilAlt, FaPhoneAlt, FaRegAddressCard } from "react-icons/fa";
import { VscPass } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { AppDispatch } from "../../../redux/store";
import { fetchSubAndBundles } from "../../../redux/slices/adminSettingsSlice";
import { checkUser } from "@/utils/localstorage";
import {
  fetchCompleteUserDetails,
  logError,
  setUser,
} from "../../../redux/slices/authSlice";
import UserSubscriptions from "@/components/userComps/userSubscriptions";
import UserBundles from "@/components/userComps/userBundles";
import UserAccountDetails from "@/components/userComps/userAccountDetails";
import { useRouter } from "next/router";
import Modal from "@/components/modals/modal";
import UserSubAndBundleDetails from "@/components/userComps/userSubAndBundleDetails";
import styles1 from "./userProfile.module.css";
import styles2 from "../../components/auth/auth.module.css";

const UserProfile = () => {
  const { user, error } = useSelector((store: any) => store.user);
  // const { error } = useSelector((store: any) => store.auth);
  const {
    free,
    gold,
    platinum,
    platinum_price_c,
    platinum_price_v,
    gold_price_v,
    gold_price_c,
    subs_expiration_value,
    subs_expiration_quantifier,
    bundle,
    can_use_crypto_bp,
    can_use_crypto_bc,
    can_use_currency_conversion_bp,
    can_use_currency_conversion_bc,
    dep_in_multi_eventCategories_bp,
    dep_in_multi_eventCategories_bc,
    extend_dep_comp_deadlines_bp,
    extend_dep_comp_deadlines_bc,
    can_use_pledge_forms_bp,
    can_use_pledge_forms_bc,
  } = useSelector((store: any) => store.adminsettings);

  const { userId } = useRouter().query;
  const dispatch = useDispatch<AppDispatch>();
  const [plans, setPlans] = useState({ free: {}, gold: {}, platinum: {} });
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(false);
  const [subscriptionType, setSubscriptionType] = useState("");

  useEffect(() => {
    dispatch(fetchSubAndBundles());
    if (!user) {
      let userValue = checkUser();
      if (userValue) {
        dispatch(fetchCompleteUserDetails(userValue?.user?._id));
      }
    } else {
      dispatch(fetchCompleteUserDetails(user?.user?._id));
    }
  }, []);

  const subObj: any = {
    can_use_crypto: "use crypto",
    can_use_currency_conversion: "use currency conversion",
    can_use_pledge_forms: "use pledge forms",
    dep_in_multi_eventCategories: "deposit in multiple event categories",
    extend_dep_comp_deadlines: "extend deposit and completion deadlines",
  };
  useEffect(() => {
    setPlans((prev: any) => {
      let i = 0;
      for (let sub in free) {
        if (sub in subObj) {
          prev.free[subObj[sub]] = i;
          i++;
        }
      }
      for (let sub in gold) {
        if (sub in subObj) {
          prev.gold[subObj[sub]] = i;
          i++;
        }
      }
      for (let sub in platinum) {
        if (sub in subObj) {
          prev.platinum[subObj[sub]] = i;
          i++;
        }
      }
      return prev;
    });
  }, [free]);

  useEffect(() => {
    if (error.type) {
      const timeout = setTimeout(() => {
        dispatch(logError({ type: "", msg: "" }));
      }, 8000);
      return () => clearTimeout(timeout);
    }
  }, [error, dispatch]);
  // console.log(plans);

  return (
    <main className={styles2.container}>
      <div className={styles1.header}>
        <h4>Welcome to your profile</h4>
      </div>
      <div className={styles1.main_content}>
        <div className={styles1.photo_section}>
          <FaPencilAlt />
          <h2 className={styles1.first_name}>{user?.user?.firstName}</h2>
          <h2 className={styles1.last_name}>{user?.user?.lastName}</h2>
          <img src="/images/bearded_man.jpg" alt="profile photo" />
          <div className={styles1.photo_card}>
            <div>
              <h4>about</h4>
              <p>
                {user?.user?.subscription?.subscription_type === "free" &&
                  "Membership type: Free"}
                {user?.user?.subscription?.subscription_type === "gold" && (
                  <>
                    Membership type: <span>Gold</span>
                  </>
                )}
                {user?.user?.subscription?.subscription_type === "platinum" &&
                  "Membership type: Platinum"}
              </p>
              <div>UserId: {user?.user?._id}</div>
              <div>
                <FaRegAddressCard /> No 5, chuci iho oi oihoayeoi oaoip.
              </div>
              <div>
                <FaPhoneAlt /> {user?.user?.phoneNumber}
              </div>
            </div>
          </div>
        </div>
        {userId === user?.user?._id && (
          <div className={styles1.sub_and_bundle_details_container}>
            <UserSubAndBundleDetails />
          </div>
        )}
        {userId === user?.user?._id && (
          <div className={styles1.subscriptions_container}>
            <UserSubscriptions
              user={user}
              plans={plans}
              subs_expiration_value={subs_expiration_value}
              subs_expiration_quantifier={subs_expiration_quantifier}
              platinum_price_c={platinum_price_c}
              platinum_price_v={platinum_price_v}
              gold_price_c={gold_price_c}
              gold_price_v={gold_price_v}
              showModal={showModal}
              setShowModal={setShowModal}
              modalType={modalType}
              setModalType={setModalType}
              subscriptionType={subscriptionType}
              setSubscriptionType={setSubscriptionType}
              dispatch={dispatch}
            />
          </div>
        )}
        {userId === user?.user?._id && (
          <div className={styles1.bundles_container}>
            <UserBundles
              bundle={bundle}
              can_use_crypto_bp={can_use_crypto_bp}
              can_use_crypto_bc={can_use_crypto_bc}
              can_use_currency_conversion_bp={can_use_currency_conversion_bp}
              can_use_currency_conversion_bc={can_use_currency_conversion_bc}
              dep_in_multi_eventCategories_bp={dep_in_multi_eventCategories_bp}
              dep_in_multi_eventCategories_bc={dep_in_multi_eventCategories_bc}
              extend_dep_comp_deadlines_bp={extend_dep_comp_deadlines_bp}
              extend_dep_comp_deadlines_bc={extend_dep_comp_deadlines_bc}
              can_use_pledge_forms_bp={can_use_pledge_forms_bp}
              can_use_pledge_forms_bc={can_use_pledge_forms_bc}
              showModal={showModal}
              setShowModal={setShowModal}
              modalType={modalType}
              setModalType={setModalType}
              dispatch={dispatch}
            />
          </div>
        )}
        {userId === user?.user?._id && (
          <div className={styles1.accountdetails_container}>
            <UserAccountDetails />
          </div>
        )}
      </div>
      {showModal && (
        <>
          <Modal
            showModal={showModal}
            setShowModal={setShowModal}
            modalType={modalType}
            setModalType={setModalType}
            subscriptionType={subscriptionType}
          />
        </>
      )}
      {error?.type === "server_error" && (
        <h5 className={styles1.warning}>{error?.code}</h5>
      )}
      <div className={styles2.particles}>
        <ParticlesComp />
      </div>
    </main>
  );
};

export default UserProfile;
