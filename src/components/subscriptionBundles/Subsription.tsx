import { useDispatch, useSelector } from "react-redux";
import {
  addToSub,
  editValues,
  fetchSubAndBundles,
  setSubscription,
  substractFromSub,
} from "../../../redux/slices/adminSettingsSlice";
import { AppDispatch } from "../../../redux/store";
import styles3 from "../../styles/adminDashboard.module.css";
import { useEffect } from "react";

const Subscription = () => {
  const { user } = useSelector((store: any) => store.user);
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
  } = useSelector((store: any) => store.adminsettings);
  const dispatch = useDispatch<AppDispatch>();
  const onSubChange = (e: any) => {
    const { name, value, checked } = e.target;
    if (checked) return dispatch(addToSub({ name, value }));
    if (
      checked === false &&
      (name === "free" || name === "gold" || name === "platinum")
    ) {
      return dispatch(substractFromSub({ name, value }));
    }
    dispatch(editValues({ name, value }));
  };
  const handleSubscriptionSubmit = () => {
    // console.log({
    //   userId: user?.user?._id,
    //   subObj: {
    //     free,
    //     gold,
    //     platinum,
    //     goldprice: {
    //       value: gold_price_v,
    //       currency: gold_price_c,
    //     },
    //     platinumprice: {
    //       value: platinum_price_v,
    //       currency: platinum_price_c,
    //     },
    //     expiration: {
    //       value: subs_expiration_value,
    //       quantifier: subs_expiration_quantifier,
    //     },
    //   },
    // });
    dispatch(
      setSubscription({
        userId: user?.user?._id,
        subObj: {
          free,
          gold,
          platinum,
          goldprice: {
            value: gold_price_v,
            currency: gold_price_c,
          },
          platinumprice: {
            value: platinum_price_v,
            currency: platinum_price_c,
          },
          expiration: {
            value: subs_expiration_value,
            quantifier: subs_expiration_quantifier,
          },
        },
      })
    );
  };

  useEffect(() => {
    dispatch(fetchSubAndBundles());
  }, []);
  useEffect(() => {
    let obj: any = { free, gold, platinum };
    let newObj: any = {};
    for (let parent in obj) {
      for (let child in obj[parent]) {
        let stringVar = `${parent}_${child}`;
        newObj[stringVar] = true;
      }
    }
    const allCheckboxes = document.querySelectorAll(`.${styles3.checkbox}`);
    allCheckboxes.forEach((eachCheckbox: any) => {
      if (`${eachCheckbox.name}_${eachCheckbox.value}` in newObj) {
        eachCheckbox.checked = true;
      }
    });
  }, [free]);
  return (
    <>
      <h4>Set Subscriptions</h4>
      <div>
        <div>
          Can use crypto--
          <label>
            free:
            <input
              type="checkbox"
              name="free"
              value="can_use_crypto"
              className={styles3.checkbox}
              onChange={onSubChange}
            />
            gold:
            <input
              type="checkbox"
              name="gold"
              value="can_use_crypto"
              className={styles3.checkbox}
              onChange={onSubChange}
            />
            platinum:{" "}
            <input
              type="checkbox"
              name="platinum"
              value="can_use_crypto"
              className={styles3.checkbox}
              onChange={onSubChange}
            />
          </label>
        </div>
        <div>
          Can use currency conversion--
          <label>
            free:
            <input
              type="checkbox"
              name="free"
              value="can_use_currency_conversion"
              className={styles3.checkbox}
              onChange={onSubChange}
            />
            gold:
            <input
              type="checkbox"
              name="gold"
              value="can_use_currency_conversion"
              className={styles3.checkbox}
              onChange={onSubChange}
            />
            platinum:{" "}
            <input
              type="checkbox"
              name="platinum"
              value="can_use_currency_conversion"
              className={styles3.checkbox}
              onChange={onSubChange}
            />
          </label>
        </div>
        <div>
          Can use Pledge Forms--
          <label>
            free:
            <input
              type="checkbox"
              name="free"
              value="can_use_pledge_forms"
              className={styles3.checkbox}
              onChange={onSubChange}
            />
            gold:
            <input
              type="checkbox"
              name="gold"
              value="can_use_pledge_forms"
              className={styles3.checkbox}
              onChange={onSubChange}
            />
            platinum:{" "}
            <input
              type="checkbox"
              name="platinum"
              value="can_use_pledge_forms"
              className={styles3.checkbox}
              onChange={onSubChange}
            />
          </label>
        </div>
        <div>
          Can deposit in multiple event categories--
          <label>
            free:
            <input
              type="checkbox"
              name="free"
              value="dep_in_multi_eventCategories"
              className={styles3.checkbox}
              onChange={onSubChange}
            />
            gold:
            <input
              type="checkbox"
              name="gold"
              value="dep_in_multi_eventCategories"
              className={styles3.checkbox}
              onChange={onSubChange}
            />
            platinum:{" "}
            <input
              type="checkbox"
              name="platinum"
              value="dep_in_multi_eventCategories"
              className={styles3.checkbox}
              onChange={onSubChange}
            />
          </label>
        </div>
        <div>
          Can edit event deposit & completion deadlines
          <label>
            free:
            <input
              type="checkbox"
              name="free"
              value="extend_dep_comp_deadlines"
              className={styles3.checkbox}
              onChange={onSubChange}
            />
            gold:
            <input
              type="checkbox"
              name="gold"
              value="extend_dep_comp_deadlines"
              className={styles3.checkbox}
              onChange={onSubChange}
            />
            platinum:{" "}
            <input
              type="checkbox"
              name="platinum"
              value="extend_dep_comp_deadlines"
              className={styles3.checkbox}
              onChange={onSubChange}
            />
          </label>
        </div>
        <div>
          Set gold price
          <label>
            price :
            <input
              type="number"
              max={12}
              value={gold_price_v}
              name="gold_price_v"
              onChange={onSubChange}
            />
          </label>
          <label>
            currency:{" "}
            <select
              name="gold_price_c"
              value={gold_price_c}
              onChange={onSubChange}
            >
              <option value="USD">USD</option>
              <option value="NGN">NGN</option>
              <option value="GBP">GBP</option>
              <option value="GHS">GHS</option>
            </select>
          </label>
        </div>
        <div>
          Set platinum price
          <label>
            price :
            <input
              type="number"
              max={12}
              value={platinum_price_v}
              name="platinum_price_v"
              onChange={onSubChange}
            />
          </label>
          <label>
            currency:{" "}
            <select
              name="platinum_price_c"
              value={platinum_price_c}
              onChange={onSubChange}
            >
              <option value="USD">USD</option>
              <option value="NGN">NGN</option>
              <option value="GBP">GBP</option>
              <option value="GHS">GHS</option>
            </select>
          </label>
        </div>

        <div>
          set expiration:
          <label>
            value:{" "}
            <input
              type="number"
              max={12}
              name="subs_expiration_value"
              value={subs_expiration_value}
              onChange={onSubChange}
            />
          </label>
          <label>
            number:{" "}
            <select
              name="subs_expiration_quantifier"
              value={subs_expiration_quantifier}
              onChange={onSubChange}
            >
              <option value="hour">hour(s)</option>
              <option value="day">day(s)</option>
              <option value="month">month(s)</option>
              <option value="year">year(s)</option>
            </select>
          </label>
        </div>
        <button onClick={handleSubscriptionSubmit}>Save Changes</button>
      </div>
    </>
  );
};

export default Subscription;
