import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import Geocode from "react-geocode";

const MAPS_API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

// Async action using createAsyncThunk
export const getLatLngByAddress = createAsyncThunk(
    'geocode/getLatLngByAddress',
    async (address) => {
        Geocode.setApiKey(`${MAPS_API_KEY}`);
        const response = await Geocode.fromAddress(address);

        if (response.status === "OK") {
            const { lat, lng } = response.results[0].geometry.location;
            return { lat, lng };
        }
    }
);

// Slice
const geocodeSlice = createSlice({
    name: 'geocode',
    initialState: {},
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getLatLngByAddress.fulfilled, (state, action) => {
            state.geocode = action.payload;
        });
    },
});

export default geocodeSlice.reducer;
