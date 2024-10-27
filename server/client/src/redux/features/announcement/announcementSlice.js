import { createSlice } from "@reduxjs/toolkit";

const announcementSlice = createSlice({
  name: "announcement",
  initialState: {
    allAnnoucement: [],
  },
  reducers: {
    setAllAnnouncement: (state, action) => {
      state.allAnnoucement = action.payload;
    },
  },
});

export const { setAllAnnouncement } = announcementSlice.actions;
export default announcementSlice.reducer;
