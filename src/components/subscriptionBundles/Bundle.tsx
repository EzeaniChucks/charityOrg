import { useDispatch, useSelector } from "react-redux";
import {
  addToSub,
  editValues,
  setBundles,
  substractFromSub,
} from "../../../redux/slices/adminSettingsSlice";
import { AppDispatch } from "../../../redux/store";
import styles3 from "../../styles/adminDashboard.module.css";
const Bundle = () => {
  const {
    free,
    gold,
    platinum,
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
  const { user } = useSelector((store: any) => store.user);
  const dispatch = useDispatch<AppDispatch>();
  const onBundleChange = (e: any) => {
    const { name, value } = e.target;
    dispatch(editValues({ name, value }));
  };

  const handleSubscriptionSubmit = () => {
    let bundleObj = {
      can_use_crypto: {
        value: can_use_crypto_bp,
        currency: can_use_crypto_bc,
      },
      can_use_currency_conversion: {
        value: can_use_currency_conversion_bp,
        currency: can_use_currency_conversion_bc,
      },
      can_use_pledge_forms: {
        value: can_use_pledge_forms_bp,
        currency: can_use_pledge_forms_bc,
      },
      dep_in_multi_eventCategories: {
        value: dep_in_multi_eventCategories_bp,
        currency: dep_in_multi_eventCategories_bc,
      },
      extend_dep_comp_deadlines: {
        value: extend_dep_comp_deadlines_bp,
        currency: extend_dep_comp_deadlines_bc,
      },
    };
    dispatch(setBundles({ userId: user?.user?._id, bundleObj }));
  };

  return (
    <>
      <h4>Set Bundle Prices</h4>
      <div className={styles3.bundle_container}>
        <div>
          <h4>Can use crypto</h4>
          <div>
            <label>
              price per bundle:
              <input
                type="number"
                max={12}
                value={can_use_crypto_bp}
                name="can_use_crypto_bp"
                onChange={onBundleChange}
              />
            </label>
            <label>
              currency:{" "}
              <select
                name="can_use_crypto_bc"
                value={can_use_crypto_bc}
                onChange={onBundleChange}
              >
                <option value="USD">USD</option>
                <option value="NGN">NGN</option>
                <option value="GBP">GBP</option>
                <option value="GHS">GHS</option>
              </select>
            </label>
          </div>
        </div>
        <div>
          <h4>Can use currency conversion--</h4>
          <div>
            <label>
              price per bundle:
              <input
                type="number"
                max={12}
                value={can_use_currency_conversion_bp}
                name="can_use_currency_conversion_bp"
                onChange={onBundleChange}
              />
            </label>
            <label>
              currency:{" "}
              <select
                name="can_use_currency_conversion_bc"
                value={can_use_currency_conversion_bc}
                onChange={onBundleChange}
              >
                <option value="USD">USD</option>
                <option value="NGN">NGN</option>
                <option value="GBP">GBP</option>
                <option value="GHS">GHS</option>
              </select>
            </label>
          </div>
        </div>
        <div>
          <h4>Can use Pledge Forms--</h4>
          <div>
            <label>
              price per bundle:
              <input
                type="number"
                max={12}
                value={can_use_pledge_forms_bp}
                name="can_use_pledge_forms_bp"
                onChange={onBundleChange}
              />
            </label>
            <label>
              currency:{" "}
              <select
                name="can_use_pledge_forms_bc"
                value={can_use_pledge_forms_bc}
                onChange={onBundleChange}
              >
                <option value="USD">USD</option>
                <option value="NGN">NGN</option>
                <option value="GBP">GBP</option>
                <option value="GHS">GHS</option>
              </select>
            </label>
          </div>
        </div>
        <div>
          <h4>Can deposit in multiple event categories</h4>
          <div>
            <label>
              price per bundle:
              <input
                type="number"
                max={12}
                value={dep_in_multi_eventCategories_bp}
                name="dep_in_multi_eventCategories_bp"
                onChange={onBundleChange}
              />
            </label>
            <label>
              currency:{" "}
              <select
                name="dep_in_multi_eventCategories_bc"
                value={dep_in_multi_eventCategories_bc}
                onChange={onBundleChange}
              >
                <option value="USD">USD</option>
                <option value="NGN">NGN</option>
                <option value="GBP">GBP</option>
                <option value="GHS">GHS</option>
              </select>
            </label>
          </div>
        </div>
        <div>
          <h4>Can extend event deposit & completion deadlines</h4>
          <div>
            <label>
              price per bundle:
              <input
                type="number"
                max={12}
                value={extend_dep_comp_deadlines_bp}
                name="extend_dep_comp_deadlines_bp"
                onChange={onBundleChange}
              />
            </label>
            <label>
              currency:{" "}
              <select
                name="extend_dep_comp_deadlines_bc"
                value={extend_dep_comp_deadlines_bc}
                onChange={onBundleChange}
              >
                <option value="USD">USD</option>
                <option value="NGN">NGN</option>
                <option value="GBP">GBP</option>
                <option value="GHS">GHS</option>
              </select>
            </label>
          </div>
        </div>
        <button onClick={handleSubscriptionSubmit}>Save Changes</button>
      </div>
    </>
  );
};

export default Bundle;
