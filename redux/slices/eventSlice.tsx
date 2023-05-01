import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import axios from "axios";
import { ParsedUrlQuery } from "querystring";
import { conString } from "@/utils/conString";
import { log_Notification } from "./notificationsSlice";

interface Obj {
  event?: any;
  allEvents: any;
  allEventsAfterSearch: any;
  singleEvent: any;
  eventCreator: any;
  eventSearchValue: String;
  eventMembers: any;
  eventObservers: any;
  eventName: String;
  eventPrivacy: String;
  eventDate: String;
  fullEventDetails: any;
  timeZone: String;
  hostStatus: String;
  currency: String;
  eventDescription: String;
  depositDeadline: String;
  completionDeadline: String;
  requestTimeLimit: String;
  disputeTimeLimit: String;
  eventImageName?: String;
  eventImagePath?: String;
  invitationEmails?: String[];
  loading: Boolean;
  error: { type: String; msg: String; code: String };
  success: { type: String; msg: String; code: String };
  depositAmount: String;
  requestId: String;
  requestOwnerId: String;
  categoryDesc: String;
  requestAmount: String | Number;
  requestDescription: String;
  editRequestAmount: String;
  editRequestDescription: String;
  disputeDescription: String;
  disputeFormDescription: String;
  disputeFormJudge: { userId: String; name: String };
  disputeForms: any;
  hasEditCompleted: Boolean;
  hasDisputeAddedOrRemoved: Boolean;
  memberRequestList: any;
  totalMemberRequestsAmount: String | Number;
  creationStatus: Boolean;
  showEventForm?: Boolean;
  createEventStep?: String;
  joineventNotification: String;
  tabState: String;
  tabStateAlertType: String;
  disputeCalc: { disputes: String; requestWithDisputes: String };
}

export const createEvent = createAsyncThunk(
  "event/createEvent",
  async (prop: any, thunk) => {
    try {
      const { data }: { data: any } = await axios.post(
        `${conString}/create_event`,
        prop
      );
      return data;
    } catch (err: any) {
      return (
        thunk.rejectWithValue(err.response.data.msg) || "Something went wrong"
      );
    }
  }
);
export const fetchEventCreatorDetails = createAsyncThunk(
  "event/fetchEventCreatorDetails",
  async (prop: any, thunk) => {
    try {
      const { data }: { data: any } = await axios.get(
        `${conString}/event_creator_details/${prop}`,
        prop
      );
      return data;
    } catch (err: any) {
      return (
        thunk.rejectWithValue(err.response.data.msg) || "Something went wrong"
      );
    }
  }
);
export const getSingleEvent = createAsyncThunk(
  "event/getSingleEvent",
  async (prop: any, thunk) => {
    try {
      const { data }: { data: any } = await axios.get(
        `${conString}/get_single_event/${prop}`
      );
      return data;
    } catch (err: any) {
      return (
        thunk.rejectWithValue(err.response.data.msg) || "Something went wrong"
      );
    }
  }
);
export const getAllEvents = createAsyncThunk(
  "event/getAllEvents",
  async (prop: any, thunk) => {
    try {
      if (prop) {
        const { data }: { data: any } = await axios.get(
          `${conString}/get_all_events?eventName=${prop}`
        );
        return data;
      } else {
        const { data }: { data: any } = await axios.get(
          `${conString}/get_all_events`
        );
        return data;
      }
    } catch (err: any) {
      return (
        thunk.rejectWithValue(err.response.data.msg) || "Something went wrong"
      );
    }
  }
);
export const joinEventsAsObserver = createAsyncThunk(
  "event/joinEventsAsObserver",
  async (prop: any, thunk) => {
    try {
      const { data }: { data: any } = await axios.post(
        `${conString}/join_event_as_observer`,
        prop
      );
      return data;
    } catch (err: any) {
      return (
        thunk.rejectWithValue(err.response.data.msg) || "Something went wrong"
      );
    }
  }
);
export const leaveEvents = createAsyncThunk(
  "event/leaveEvents",
  async (prop: any, thunk) => {
    try {
      const { data }: { data: any } = await axios.post(
        `${conString}/leave_event`,
        prop
      );
      return data;
    } catch (err: any) {
      return (
        thunk.rejectWithValue(err.response.data.msg) || "Something went wrong"
      );
    }
  }
);
export const joinEvents = createAsyncThunk(
  "event/joinEvents",
  async (prop: any, thunk) => {
    try {
      const { data }: { data: any } = await axios.post(
        `${conString}/join_event`,
        prop
      );
      return data;
    } catch (err: any) {
      return (
        thunk.rejectWithValue(err.response.data.msg) || "Something went wrong"
      );
    }
  }
);
export const getEventDetail = createAsyncThunk(
  "event/getEventDetail",
  async (prop: any, thunk) => {
    try {
      const { data }: { data: any } = await axios.get(
        `${conString}/${prop}/get_event_details`
      );
      return data;
    } catch (err: any) {
      return (
        thunk.rejectWithValue(err.response.data.msg) || "Something went wrong"
      );
    }
  }
);
export const acceptEventDeposit = createAsyncThunk(
  "event/acceptEventDeposit",
  async (prop: any, thunk) => {
    try {
      const { data }: { data: any } = await axios.post(
        `${conString}/accept_event_deposit`,
        prop
      );
      return data;
    } catch (err: any) {
      return (
        thunk.rejectWithValue(err.response.data.msg) || "Something went wrong"
      );
    }
  }
);
export const editMemberRequest = createAsyncThunk(
  "event/editMemberRequest",
  async (prop: any, thunk) => {
    try {
      const { data }: { data: any } = await axios.put(
        `${conString}/edit_member_request`,
        prop?.data
      );
      return data;
    } catch (err: any) {
      return (
        thunk.rejectWithValue(err.response.data.msg) || "Something went wrong"
      );
    }
  }
);
export const deleteMemberRequest = createAsyncThunk(
  "event/deleteMemberRequest",
  async (prop: any, thunk) => {
    try {
      const { data }: { data: any } = await axios.delete(
        `${conString}/delete_member_request`,
        prop
      );
      return data;
    } catch (err: any) {
      return (
        thunk.rejectWithValue(err.response.data.msg) || "Something went wrong"
      );
    }
  }
);
export const getMemberRequestList = createAsyncThunk(
  "event/getMemberRequestList",
  async (prop: any, thunk) => {
    try {
      const { data }: { data: any } = await axios.get(
        `${conString}/get_member_request_list/${prop}`
      );
      return data;
    } catch (err: any) {
      return (
        thunk.rejectWithValue(err.response.data.msg) || "Something went wrong"
      );
    }
  }
);
export const getAllEventMembersAndObservers = createAsyncThunk(
  "event/getAllEventMembersAndObservers",
  async (prop: any, thunk) => {
    try {
      const { data }: { data: any } = await axios.get(
        `${conString}/get_members_and_obervers/${prop}`
      );
      return data;
    } catch (err: any) {
      return (
        thunk.rejectWithValue(err.response.data.msg) || "Something went wrong"
      );
    }
  }
);
export const uploadMemberRequest = createAsyncThunk(
  "event/uploadMemberRequest",
  async (prop: any, thunk: any) => {
    try {
      const { data }: { data: any } = await axios.post(
        `${conString}/upload_member_request`,
        prop
      );
      const eventState = thunk.getState().event;
      const userState = thunk.getState().user.user.user;
      thunk.dispatch(
        log_Notification({
          message: `${userState?.firstName} ${userState?.lastName} has reqested ${eventState.requestAmount}NGN from event, ${eventState?.fullEventDetails?.eventName}`,
          userId: userState._id,
          link: `/events/backend_category/${eventState.fullEventDetails.eventId}/activity_room`,
          eventId: eventState.fullEventDetails.eventId,
          type: "request",
        })
      );
      return data;
    } catch (err: any) {
      return (
        thunk.rejectWithValue(err.response.data.msg) || "Something went wrong"
      );
    }
  }
);
export const create_dispute = createAsyncThunk(
  "event/create_dispute",
  async (prop: any, thunk) => {
    try {
      const { data }: { data: any } = await axios.post(
        `${conString}/add_dispute`,
        prop
      );
      return data;
    } catch (err: any) {
      return (
        thunk.rejectWithValue(err.response.data.msg) || "Something went wrong"
      );
    }
  }
);
export const remove_dispute = createAsyncThunk(
  "event/remove_dispute",
  async (prop: any, thunk) => {
    try {
      const { data }: { data: any } = await axios.put(
        `${conString}/remove_dispute`,
        prop
      );
      return data;
    } catch (err: any) {
      return (
        thunk.rejectWithValue(err.response.data.msg) || "Something went wrong"
      );
    }
  }
);
export const remove_all_disputes = createAsyncThunk(
  "event/remove_all_disputes",
  async (prop: any, thunk) => {
    try {
      const { data }: { data: any } = await axios.delete(
        `${conString}/remove_all_disputes`,
        prop
      );
      return data;
    } catch (err: any) {
      return (
        thunk.rejectWithValue(err.response.data.msg) || "Something went wrong"
      );
    }
  }
);
export const log_dispute_form = createAsyncThunk(
  "event/log_dispute_form",
  async (prop: any, thunk) => {
    try {
      const { data }: { data: any } = await axios.post(
        `${conString}/log_dispute_form`,
        prop
      );
      return data;
    } catch (err: any) {
      return (
        thunk.rejectWithValue(err.response.data.msg) || "Something went wrong"
      );
    }
  }
);
export const resetDepositAndCompletionDeadlines = createAsyncThunk(
  "event/resetDepositAndCompletionDeadlines",
  async (prop: any, thunk) => {
    try {
      const { data }: { data: any } = await axios.post(
        `${conString}/set_deposit_and_completion_deadlines`,
        prop
      );

      thunk.dispatch(getEventDetail(prop.eventId));
      return data;
    } catch (err: any) {
      return (
        thunk.rejectWithValue(err.response.data.msg) || "Something went wrong"
      );
    }
  }
);
export const setEventTimeLimits = createAsyncThunk(
  "event/setEventTimeLimits",
  async (prop: any, thunk) => {
    try {
      const { data }: { data: any } = await axios.post(
        `${conString}/set_event_timelimit`,
        prop
      );
      return data;
    } catch (err: any) {
      return (
        thunk.rejectWithValue(err.response.data.msg) || "Something went wrong"
      );
    }
  }
);

const initialState: Obj = {
  event: null,
  allEvents: [],
  allEventsAfterSearch: [],
  singleEvent: [],
  eventCreator: null,
  eventMembers: [],
  eventObservers: [],
  eventSearchValue: "",
  eventName: "",
  eventPrivacy: "Public",
  eventDate: Date(),
  fullEventDetails: [],
  timeZone: "Etc/GMT-12 (GMT-12:00)",
  hostStatus: "Depositor",
  currency: "NGN",
  eventDescription: "",
  depositDeadline: Date(),
  completionDeadline: Date(),
  requestTimeLimit: String(new Date()),
  disputeTimeLimit: String(new Date()),
  eventImageName: "",
  eventImagePath: "",
  invitationEmails: [],
  depositAmount: "",
  categoryDesc: "",
  requestAmount: "" || 0,
  requestId: "",
  requestOwnerId: "",
  requestDescription: "",
  editRequestAmount: "",
  editRequestDescription: "",
  memberRequestList: [],
  totalMemberRequestsAmount: 0,
  hasEditCompleted: false,
  hasDisputeAddedOrRemoved: false,
  disputeDescription: "",
  disputeFormDescription: "",
  disputeFormJudge: { userId: "", name: "" },
  disputeForms: [],
  loading: false,
  error: { type: "", msg: "", code: "" },
  success: { type: "", msg: "", code: "" },
  creationStatus: false,
  showEventForm: false,
  createEventStep: "step1",
  joineventNotification: "",
  tabState: "deposit",
  tabStateAlertType: "",
  disputeCalc: { disputes: "", requestWithDisputes: "" },
};

const eventSlice = createSlice({
  name: "eventSlice",
  initialState,
  reducers: {
    handleEventModule: (state) => {
      state.showEventForm = !state.showEventForm;
    },
    updateEventForm: (state: any, action: PayloadAction<any>) => {
      const { name, value } = action.payload;
      state[name] = value;
    },
    switchStep: (state, action: PayloadAction<any>) => {
      state.createEventStep = action.payload;
    },
    resetEvent: (state) => {
      state.event = null;
    },
    resetCreator: (state) => {
      state.eventCreator = null;
    },
    resetEventPaymentInfo: (state) => {
      state.depositAmount = "";
      state.categoryDesc = "";
    },
    setCategoryName: (state, { payload }) => {
      state.categoryDesc = payload;
    },
    setTabState: (state, { payload }) => {
      state.tabState = payload;
      localStorage.setItem("charityOrgTabState", payload);
    },
    setEditsForRequestPage: (state: any, { payload }) => {
      state.editRequestAmount = payload.requestAmount;
      state.editRequestDescription = payload.requestDescription;
    },
    setAlertType: (state: any, { payload }) => {
      state.tabStateAlertType = payload;
    },
    logError: (state, { payload }) => {
      state.error = payload;
    },
  },
  extraReducers: (builder) => {
    //CREATE EVENT
    builder.addCase(createEvent.pending, (state: any) => {
      state.loading = true;
      state.creationStatus = false;
    });
    builder.addCase(createEvent.fulfilled, (state: any, { payload }) => {
      state.loading = false;
      state.event = payload;
      state.eventName = "";
      state.eventImageName = "";
      state.eventImagePath = "";
      state.invitationEmails = [];
      state.eventDescription = "";
      state.creationStatus = true;
    });
    builder.addCase(createEvent.rejected, (state: any, { payload }) => {
      state.loading = false;
      state.creationStatus = false;
      state.error = {
        type: "server_error",
        msg: "please resubmision again",
        code: payload,
      };
    });

    //Get All Events
    builder.addCase(getAllEvents.pending, (state: any) => {
      state.loading = true;
    });
    builder.addCase(getAllEvents.fulfilled, (state: any, { payload }) => {
      state.loading = false;
      state.allEvents = payload.allEvents;
    });
    builder.addCase(getAllEvents.rejected, (state: any, { payload }) => {
      state.loading = false;
      state.error = {
        type: "server_error",
        msg: "please resubmit form again",
        code: payload,
      };
    });

    //Get SINGLE Event
    builder.addCase(getSingleEvent.pending, (state: any) => {
      state.loading = true;
    });
    builder.addCase(getSingleEvent.fulfilled, (state: any, { payload }) => {
      state.loading = false;
      state.singleEvent = payload.event;
    });
    builder.addCase(getSingleEvent.rejected, (state: any, { payload }) => {
      state.loading = false;
      state.error = {
        type: "server_error",
        msg: "Could not fetch event. Kindly refresh your browser or check your internet connection",
        code: payload,
      };
    });

    //Get Event Creator
    builder.addCase(fetchEventCreatorDetails.pending, (state: any) => {
      state.loading = true;
    });
    builder.addCase(
      fetchEventCreatorDetails.fulfilled,
      (state: any, { payload }) => {
        state.loading = false;
        state.eventCreator = payload.creator;
      }
    );
    builder.addCase(
      fetchEventCreatorDetails.rejected,
      (state: any, { payload }) => {
        state.loading = false;
        state.error = {
          type: "server_error",
          msg: "Not Available",
          code: payload,
        };
      }
    );

    //Join Event
    builder.addCase(joinEvents.pending, (state: any) => {
      state.loading = true;
      state.joineventNotification = "";
    });
    builder.addCase(joinEvents.fulfilled, (state: any, { payload }) => {
      state.loading = false;
      state.joineventNotification = payload.msg;
    });
    builder.addCase(
      joinEvents.rejected,
      (state: any, { payload }: { payload: any }) => {
        state.loading = false;
        state.joineventNotification = payload;
        state.error = {
          type: "server_error",
          msg: "Not able to join event. Please try again",
          code: payload,
        };
      }
    );
    //Leave Event
    builder.addCase(leaveEvents.pending, (state: any) => {
      state.loading = true;
      state.joineventNotification = "";
    });
    builder.addCase(leaveEvents.fulfilled, (state: any, { payload }) => {
      state.loading = false;
      state.joineventNotification = payload.msg;
    });
    builder.addCase(
      leaveEvents.rejected,
      (state: any, { payload }: { payload: any }) => {
        state.loading = false;
        state.joineventNotification = payload;
        state.error = {
          type: "server_error",
          msg: "Not able to join event. Please try again",
          code: payload,
        };
      }
    );

    //Join Event As Observer
    builder.addCase(joinEventsAsObserver.pending, (state: any) => {
      state.loading = true;
      state.joineventNotification = "";
    });
    builder.addCase(
      joinEventsAsObserver.fulfilled,
      (state: any, { payload }) => {
        state.loading = false;
        state.joineventNotification = payload.msg;
      }
    );
    builder.addCase(
      joinEventsAsObserver.rejected,
      (state: any, { payload }: { payload: any }) => {
        state.loading = false;
        state.joineventNotification = payload;
        state.error = {
          type: "server_error",
          msg: "Not able to join event. Please try again",
          code: payload,
        };
      }
    );

    //Get Full Event Object with necessary details
    builder.addCase(getEventDetail.pending, (state: any) => {
      state.loading = true;
    });
    builder.addCase(getEventDetail.fulfilled, (state: any, { payload }) => {
      state.loading = false;
      state.fullEventDetails = payload.eventDetail;
    });
    builder.addCase(getEventDetail.rejected, (state: any, { payload }) => {
      state.loading = false;
      state.error = {
        type: "server_error",
        msg: "Not able to get event datails. Please try again",
        code: payload,
      };
    });

    //ACCEPT EVENT DEPOSIT
    builder.addCase(acceptEventDeposit.pending, (state: any) => {
      state.loading = true;
    });
    builder.addCase(acceptEventDeposit.fulfilled, (state: any, { payload }) => {
      state.loading = false;
      state.fullEventDetails = payload.completeDetail;
    });
    builder.addCase(
      acceptEventDeposit.rejected,
      (state: any, { payload }: { payload: any }) => {
        state.loading = false;
        state.error = {
          type: "server_error",
          msg: "Not able to proceed with event deposit. Please try again",
          code: payload,
        };
      }
    );

    //UPLOAD REQUEST AMOUNT
    builder.addCase(uploadMemberRequest.pending, (state: any) => {
      state.loading = true;
    });
    builder.addCase(
      uploadMemberRequest.fulfilled,
      (state: any, { payload }) => {
        state.loading = false;
        state.memberRequestList = payload?.memberRequests;
        state.totalMemberRequestsAmount = payload?.totalMemberRequestsAmount;
      }
    );
    builder.addCase(
      uploadMemberRequest.rejected,
      (state: any, { payload }: { payload: any }) => {
        state.loading = false;
        state.error = {
          type: "server_error",
          msg: "Not able to proceed with amount request. Please try again",
          code: payload,
        };
      }
    );

    //Get Member Request List
    builder.addCase(getMemberRequestList.pending, (state: any) => {
      state.loading = true;
    });
    builder.addCase(
      getMemberRequestList.fulfilled,
      (state: any, { payload }) => {
        state.loading = false;
        state.memberRequestList = payload?.memberRequests;
        state.totalMemberRequestsAmount = payload?.totalMemberRequestsAmount;
      }
    );
    builder.addCase(
      getMemberRequestList.rejected,
      (state: any, { payload }: { payload: any }) => {
        state.loading = false;
        state.error = {
          type: "server_error",
          msg: "Not able to proceed with amount request. Please try again",
          code: payload,
        };
      }
    );

    //GET All Members And Observers
    builder.addCase(getAllEventMembersAndObservers.pending, (state: any) => {
      state.loading = true;
    });
    builder.addCase(
      getAllEventMembersAndObservers.fulfilled,
      (state: any, { payload }) => {
        state.loading = false;
        state.eventMembers = payload.members;
        state.eventObservers = payload.observers;
      }
    );
    builder.addCase(
      getAllEventMembersAndObservers.rejected,
      (state: any, { payload }: { payload: any }) => {
        state.loading = false;
        state.error = {
          type: "server_error",
          msg: "Not able to proceed with amount request. Please try again",
          code: payload,
        };
      }
    );

    //EDIT EVENT REQUEST AMOUNT/DESCRIPTION
    builder.addCase(editMemberRequest.pending, (state: any) => {
      state.loading = true;
      state.hasEditCompleted = false;
    });
    builder.addCase(editMemberRequest.fulfilled, (state: any, { payload }) => {
      state.loading = false;
      state.hasEditCompleted = true;
      state.memberRequestList = payload?.memberRequests;
      state.totalMemberRequestsAmount = payload?.totalMemberRequestsAmount;
    });
    builder.addCase(
      editMemberRequest.rejected,
      (state: any, { payload }: { payload: any }) => {
        state.loading = false;
        state.hasEditCompleted = false;
        state.error = {
          type: "server_error",
          msg: "Not able to proceed with event deposit. Please try again",
          code: payload,
        };
      }
    );

    //DELETE EVENT REQUEST
    builder.addCase(deleteMemberRequest.pending, (state: any) => {
      state.loading = true;
      state.hasEditCompleted = false;
    });
    builder.addCase(
      deleteMemberRequest.fulfilled,
      (state: any, { payload }) => {
        state.loading = false;
        state.hasEditCompleted = true;
        state.memberRequestList = payload?.memberRequests;
        state.totalMemberRequestsAmount = payload?.totalMemberRequestsAmount;
      }
    );
    builder.addCase(
      deleteMemberRequest.rejected,
      (state: any, { payload }: { payload: any }) => {
        state.loading = false;
        state.hasEditCompleted = false;
        state.error = {
          type: "server_error",
          msg: "Not able to proceed with event deposit. Please try again",
          code: payload,
        };
      }
    );

    //CREATE DISPUTE
    builder.addCase(create_dispute.pending, (state: any) => {
      state.loading = true;
    });
    builder.addCase(create_dispute.fulfilled, (state: any, { payload }) => {
      state.loading = false;
      state.hasDisputeAddedOrRemoved = payload?.msg;
    });
    builder.addCase(
      create_dispute.rejected,
      (state: any, { payload }: { payload: any }) => {
        state.loading = false;
        state.error = {
          type: "server_error",
          msg: "Not able to proceed with event deposit. Please try again",
          code: payload,
        };
      }
    );

    //REMOVE DISPUTE
    builder.addCase(remove_dispute.pending, (state: any) => {
      state.loading = true;
    });
    builder.addCase(remove_dispute.fulfilled, (state: any, { payload }) => {
      state.loading = false;
      state.hasDisputeAddedOrRemoved = payload?.msg;
    });
    builder.addCase(
      remove_dispute.rejected,
      (state: any, { payload }: { payload: any }) => {
        state.loading = false;
        state.error = {
          type: "server_error",
          msg: "Not able to proceed with event deposit. Please try again",
          code: payload,
        };
      }
    );
    //REMOVE ALL DISPUTES
    builder.addCase(remove_all_disputes.pending, (state: any) => {
      state.loading = true;
    });
    builder.addCase(
      remove_all_disputes.fulfilled,
      (state: any, { payload }) => {
        state.loading = false;
        state.hasDisputeAddedOrRemoved = payload?.msg;
      }
    );
    builder.addCase(
      remove_all_disputes.rejected,
      (state: any, { payload }: { payload: any }) => {
        state.loading = false;
        state.error = {
          type: "server_error",
          msg: "Not able to proceed with event deposit. Please try again",
          code: payload,
        };
      }
    );

    //Create Dispute Form
    builder.addCase(log_dispute_form.pending, (state: any) => {
      state.loading = true;
    });
    builder.addCase(log_dispute_form.fulfilled, (state: any, { payload }) => {
      state.loading = false;
      state.disputeForms = payload.disputeForms;
    });
    builder.addCase(
      log_dispute_form.rejected,
      (state: any, { payload }: { payload: any }) => {
        state.loading = false;
        state.error = {
          type: "server_error",
          msg: "Not able to proceed with event deposit. Please try again",
          code: payload,
        };
      }
    );
    //Set Request/Dispute TimeLimits
    builder.addCase(setEventTimeLimits.pending, (state: any) => {
      state.loading = true;
    });
    builder.addCase(setEventTimeLimits.fulfilled, (state: any, { payload }) => {
      state.loading = false;
      // state.requestTimeLimit = payload.requestTimeLimit;
      // state.diaputeTimeLimit = payload.diaputeTimeLimit;
      state.success = {
        type: "server_success",
        msg: "Sucessful",
        code: payload.msg,
      };
    });
    builder.addCase(
      setEventTimeLimits.rejected,
      (state: any, { payload }: { payload: any }) => {
        state.loading = false;
        state.error = {
          type: "server_error",
          msg: "Not able set Event Time Limit. Please try again.",
          code: payload,
        };
      }
    );
    //RESET DEPOSIT/COMPLETION DEADLINES
    builder.addCase(
      resetDepositAndCompletionDeadlines.pending,
      (state: any) => {
        state.loading = true;
      }
    );
    builder.addCase(
      resetDepositAndCompletionDeadlines.fulfilled,
      (state: any, { payload }) => {
        state.loading = false;
        // state.requestTimeLimit = payload.requestTimeLimit;
        // state.diaputeTimeLimit = payload.diaputeTimeLimit;
        state.success = {
          type: "server_success",
          msg: "Sucessful",
          code: payload.msg,
        };
      }
    );
    builder.addCase(
      resetDepositAndCompletionDeadlines.rejected,
      (state: any, { payload }: { payload: any }) => {
        state.loading = false;
        state.error = {
          type: "server_error",
          msg: "Not able set Event Time Limit. Please try again.",
          code: payload,
        };
      }
    );
  },
});

export const {
  handleEventModule,
  updateEventForm,
  switchStep,
  resetEvent,
  resetCreator,
  resetEventPaymentInfo,
  setCategoryName,
  setTabState,
  setEditsForRequestPage,
  logError,
  setAlertType,
} = eventSlice.actions;
export default eventSlice.reducer;
