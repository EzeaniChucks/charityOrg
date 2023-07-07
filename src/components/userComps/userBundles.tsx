import { useSelector } from "react-redux";
import styles1 from "../../pages/user/userProfile.module.css";
import { editValues } from "../../../redux/slices/adminSettingsSlice";
import { Fragment } from "react";
import { updateFormValues } from "../../../redux/slices/authSlice";

const UserBundles = ({
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
  showModal,
  setShowModal,
  modalType,
  setModalType,
  subscriptionType,
  setSubscriptionType,
  dispatch,
}: any) => {
  const { userBundleName } = useSelector((state: any) => state?.user);
  const handleDispatches = (
    bundle_type_variable: string,
    bundle_type_desc: string,
    selected_bundle_price: string,
    selected_bundle_currency: string
  ) => {
    dispatch(
      editValues({
        name: "bundle_type_variable",
        value: bundle_type_variable,
      })
    );
    dispatch(
      editValues({
        name: "bundle_type_desc",
        value: bundle_type_desc,
      })
    );
    dispatch(
      editValues({
        name: "selected_bundle_price",
        value: selected_bundle_price,
      })
    );
    dispatch(
      editValues({
        name: "selected_bundle_currency",
        value: selected_bundle_currency,
      })
    );
  };
  return (
    <>
      <h3>Or Purchase Bundles</h3>
      {/* <div>
        <div
          onClick={() => {
            setShowModal(!showModal);
            setModalType("chooseBundle");
            handleDispatches(
              "can_use_crypto",
              "Use Crypto",
              can_use_crypto_bp,
              can_use_crypto_bc
            );
          }}
        >
          Use crypto
          <h4>
            Price per bundle: {can_use_crypto_bp} {can_use_crypto_bc}
          </h4>
        </div>
        <div
          onClick={() => {
            setShowModal(!showModal);
            setModalType("chooseBundle");
            handleDispatches(
              "can_use_currency_conversion",
              "Use Currency Conversion",
              can_use_currency_conversion_bp,
              can_use_currency_conversion_bc
            );
          }}
        >
          Use currency conversion
          <h4>
            Price per bundle: {can_use_currency_conversion_bp}
            {""}
            {can_use_currency_conversion_bc}
          </h4>
        </div>
        <div
          onClick={() => {
            setShowModal(!showModal);
            setModalType("chooseBundle");
            handleDispatches(
              "dep_in_multi_eventCategories",
              "Deposit in multiple event categories",
              dep_in_multi_eventCategories_bp,
              dep_in_multi_eventCategories_bc
            );
          }}
        >
          Deposit in multiple event category
          <h4>
            Price per bundle: {dep_in_multi_eventCategories_bp}
            {""}
            {dep_in_multi_eventCategories_bc}
          </h4>
        </div>
        <div
          onClick={() => {
            setShowModal(!showModal);
            setModalType("chooseBundle");
            handleDispatches(
              "extend_dep_comp_deadlines",
              "Extend deposit and completion deadlines",
              extend_dep_comp_deadlines_bp,
              extend_dep_comp_deadlines_bc
            );
          }}
        >
          Extend deposit or completion deadlines
          <h4>
            Price per bundle: {extend_dep_comp_deadlines_bp}
            {""}
            {extend_dep_comp_deadlines_bc}
          </h4>
        </div>
        <div>
          Use pledge forms
          <h4
            onClick={() => {
              setShowModal(!showModal);
              setModalType("chooseBundle");
              handleDispatches(
                "can_use_pledge_forms",
                "Use pledge forms",
                can_use_pledge_forms_bp,
                can_use_pledge_forms_bc
              );
            }}
          >
            Price per bundle: {can_use_pledge_forms_bp}
            {""}
            {can_use_pledge_forms_bc}
          </h4>
        </div>
      </div> */}
      <div>
        {bundle.map((eachBundle: any, index: number) => {
          return (
            <div
              key={eachBundle._id || index}
              onClick={() => {
                setShowModal(!showModal);
                setModalType("chooseBundle");
                // handleDispatches(
                //   "can_use_pledge_forms",
                //   "Use pledge forms",
                //   can_use_pledge_forms_bp,
                //   can_use_pledge_forms_bc
                // );
                dispatch(
                  updateFormValues({
                    name: "userBundleName",
                    value: eachBundle?.bundleName,
                  })
                );
                dispatch(
                  updateFormValues({
                    name: "userBundlePrice",
                    value: `${eachBundle?.bundlePrice} ${eachBundle?.bundleCurrency}`,
                  })
                );
              }}
            >
              {eachBundle?.bundleName}
              <h6>Feature name and quantity</h6>
              {eachBundle?.bundleFeatures.map((eachFeature: any, i: number) => {
                return (
                  <h5 key={eachFeature._id || i}>
                    {eachFeature?.featureName}:{" "}
                    <span>{eachFeature?.featureStock}</span>
                  </h5>
                );
              })}
              <h4>
                Total bundle price: {eachBundle?.bundlePrice}
                {eachBundle?.bundleCurrency}
              </h4>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default UserBundles;
