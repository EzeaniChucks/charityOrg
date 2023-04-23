import { FaList, FaMicrosoft } from "react-icons/fa";
import style from "../../components/deposit/deposit.module.css";
import Request_Description from "../request/request_description";
import Dispute_Form_Description from "./disputeFormDescription";
const SubmittedDisputeForms = ({
  disputeForms,
  error,
  isReady,
  dispatch,
  eventId,
}: any) => {
  return (
    <>
      <h3>Submitted Dispute Forms</h3>
      <div className={style.depositors_container}>
        <div className={style.bar_handle}></div>
        <div className={style.grid_view}>
          <div>
            <FaList />
            <h6>List</h6>
          </div>
          <div>
            <FaMicrosoft />
            <h6>Grid</h6>
          </div>
        </div>

        <div className={style.depositors}>
          {disputeForms?.length === 0 && (
            <p style={{ textAlign: "center" }}>
              No Dispute Forms Submitted. Select requests from the list above
              and appoint a judge if you wish to lodge a dispute
            </p>
          )}
          {disputeForms?.map((item: any) => {
            return (
              <Dispute_Form_Description
                key={item._id}
                {...item}
                error={error}
                eventPageName={"disputes form"}
                eventId={eventId}
                dispatch={dispatch}
                isReady={isReady}
              />
            );
          })}
          {/* <div>
            {calcDisputes() > 0 && (
              <button
                className={style.btn_add}
                style={{ width: "100%", backgroundColor: "rgb(120, 50, 50)" }}
                onClick={() => dispatch(handleEventModule())}
              >
                Appoint Judge Over Disputes
              </button>
            )}
          </div> */}
        </div>
      </div>
    </>
  );
};

export default SubmittedDisputeForms;
