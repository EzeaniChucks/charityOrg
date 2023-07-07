import { useSelector } from "react-redux";
import { useState, useEffect, Fragment } from "react";
import style from "../../pages/user/userProfile.module.css";

const UserSubAndBundleDetails = () => {
  const { user } = useSelector((store: any) => store.user);
  const [userbundles, setUserBundles] = useState<any>([]);
  // let userBundle: any = {};

  const subObj: any = {
    can_use_crypto: "use crypto",
    can_use_currency_conversion: "use currency conversion",
    can_use_pledge_forms: "use pledge forms",
    dep_in_multi_eventCategories: "deposit in multiple event categories",
    extend_dep_comp_deadlines: "extend deposit and completion deadlines",
  };

  useEffect(() => {
    let userBundleIsPresent = user?.user?.bundle;
    let userBundle2: any = {};
    setUserBundles([]);
    if (userBundleIsPresent) {
      userBundleIsPresent.map((eachBundle: any) => {
        return eachBundle.bundleFeatures.map((eachFeature: any) => {
          if (!userBundle2[eachFeature.featureName]) {
            userBundle2[eachFeature.featureName] = 0;
          }
          userBundle2[eachFeature.featureName] += eachFeature.stockLeft;
        });
      });
      // console.log(userBundle2);
      let finalBundle: any = [];
      for (let bundle in userBundle2) {
        let foundMatch = false;
        for (let sub in subObj) {
          if (bundle === sub) {
            finalBundle.push({ [subObj[sub]]: userBundle2[bundle] });
            foundMatch = true;
          }
        }
        if (!foundMatch) {
          finalBundle.push({ [bundle]: userBundle2[bundle] });
        }
      }
      setUserBundles(finalBundle);
    }
  }, [user]);
  return (
    <div className={style.summary_container}>
      <h3>Bundle Summary</h3>
      <div>
        <p>Features</p>
        <p>Bundle available</p>
        {userbundles.map((eachBundle: any, i: number) => {
          return (
            <Fragment key={i}>
              <p>{Object.keys(eachBundle)} </p>
              <p>{Object.values(eachBundle)}</p>
            </Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default UserSubAndBundleDetails;
