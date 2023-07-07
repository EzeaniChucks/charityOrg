//subscription onclick
//hows modal, changes modaltype
import { FaTimes } from "react-icons/fa";
import style from "./modal.module.css";
import {
  setUserBundle,
  setUserSubscription,
} from "../../../redux/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../redux/store";
import {
  editValues,
  setBundles,
} from "../../../redux/slices/adminSettingsSlice";
import { useEffect } from "react";
const Modal = ({
  modalType,
  subscriptionType,
  bundleType,
  bundleAmount,
  showModal,
  setShowModal,
}: any) => {
  const { user, userBundleName, userBundlePrice } = useSelector(
    (store: any) => store.user
  );
  const {
    bundle_quantity_to_buy,
    bundle_type_desc,
    bundle_type_variable,
    total_bundle_price,
    selected_bundle_price,
    selected_bundle_currency,
  } = useSelector((store: any) => store.adminsettings);
  const dispatch = useDispatch<AppDispatch>();

  const handleAdminSettingsChange = (e: any) => {
    const { name, value } = e?.target;
    dispatch(editValues({ name, value }));
  };

  useEffect(() => {
    dispatch(
      editValues({
        name: "total_bundle_price",
        value: Number(bundle_quantity_to_buy) * Number(selected_bundle_price),
      })
    );
  }, [bundle_quantity_to_buy]);

  return (
    <div className={style.modal_container}>
      <div>
        <FaTimes onClick={() => setShowModal(!showModal)} />
        {modalType === "chooseSubscription" && (
          <div>
            Change subscription plan to {subscriptionType}?
            <div>
              <button
                onClick={() => {
                  dispatch(
                    setUserSubscription({
                      subType: subscriptionType,
                      userId: user?.user?._id,
                    })
                  );
                  setShowModal(!showModal);
                }}
              >
                Proceed
              </button>
              <button
                onClick={() => setShowModal(!showModal)}
                className={style.cancel_btn}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
        {modalType === "chooseBundle" && (
          <div>
            <h3>Buy Bundle</h3>
            {/* <h4>
              The feature "{bundle_type_desc}" is {selected_bundle_price}{" "}
              {selected_bundle_currency} per bundle.
            </h4> */}
            <div>
              {/* <label>
                Choose quantity:{" "}
                <input
                  type="number"
                  name={"bundle_quantity_to_buy"}
                  value={bundle_quantity_to_buy}
                  onChange={handleAdminSettingsChange}
                />
              </label>
              <h4>
                {bundle_quantity_to_buy && (
                  <span>
                    You are buying {bundle_quantity_to_buy} of this feature at{" "}
                    {total_bundle_price} {selected_bundle_currency}
                  </span>
                )}
                {!bundle_quantity_to_buy && (
                  <span>Bundle quantity must be specified</span>
                )}
              </h4> */}
              <h4>
                You are attampting to buy {userBundleName} bundle at{" "}
                {userBundlePrice} per bundle.
              </h4>
              <button
                onClick={() => {
                  dispatch(
                    setUserBundle({
                      userId: user?.user?._id,
                      frontendBundleName: userBundleName,
                      // bundle_type_variable,
                      // bundle_quantity_to_buy,
                    })
                  );
                  setShowModal(!showModal);
                }}
              >
                Proceed?
              </button>
              <button
                onClick={() => setShowModal(!showModal)}
                className={style.cancel_btn}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default Modal;
