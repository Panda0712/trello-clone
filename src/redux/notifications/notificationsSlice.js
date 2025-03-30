import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authorizedAxiosInstance from "~/utils/authorizeAxios";
import { API_ROOT } from "~/utils/constants";

const initialState = {
  currentNotifications: null,
};

export const fetchInvitationsAPI = createAsyncThunk(
  "notifications/fetchInvitationsAPI",
  async () => {
    const res = await authorizedAxiosInstance.get(`${API_ROOT}/v1/invitations`);
    return res.data;
  }
);

export const updateBoardInvitationsAPI = createAsyncThunk(
  "notifications/updateBoardInvitationsAPI",
  async ({ status, notificationId }) => {
    const res = await authorizedAxiosInstance.put(
      `${API_ROOT}/v1/invitations/board/${notificationId}`,
      { status }
    );
    return res.data;
  }
);

export const notificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    clearCurrentNotifications: (state) => {
      state.currentNotifications = null;
    },
    updateCurrentNotifications: (state, action) => {
      state.currentNotifications = action.payload;
    },
    addNotifications: (state, action) => {
      const incomingInvitation = action.payload;

      state.currentNotifications.unshift(incomingInvitation);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchInvitationsAPI.fulfilled, (state, action) => {
      let incomingInvitation = action.payload;

      state.currentNotifications = Array.isArray(incomingInvitation)
        ? incomingInvitation.reverse()
        : [];
    });
    builder.addCase(updateBoardInvitationsAPI.fulfilled, (state, action) => {
      const incomingInvitation = action.payload;

      const getInvitation = state.currentNotifications.find(
        (i) => i._id === incomingInvitation._id
      );
      getInvitation.boardInvitation = incomingInvitation.boardInvitation;
    });
  },
});

export const {
  clearCurrentNotifications,
  updateCurrentNotifications,
  addNotifications,
} = notificationsSlice.actions;

export const selectCurrentNotifications = (state) => {
  return state.notifications.currentNotifications;
};

export const notificationsReducer = notificationsSlice.reducer;
