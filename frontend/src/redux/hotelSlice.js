import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  hotels: [],
};

const hotelSlice = createSlice({
  name: "hotels",
  initialState,
  reducers: {
    // put all hotels from the server into the store
    setHotels: (state, action) => {
      state.hotels = action.payload;
    },
    // remove one hotel from the store by id
    deleteHotel: (state, action) => {
      state.hotels = state.hotels.filter((h) => h.id !== action.payload);
    },
  },
});

export const { setHotels, deleteHotel } = hotelSlice.actions;
export default hotelSlice.reducer;


