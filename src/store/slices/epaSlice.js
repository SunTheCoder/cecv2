import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Thunk for fetching EPA data
export const fetchEPAData = createAsyncThunk(
    'epa/fetchData',
    async (_, { getState }) => {
        const { epa } = getState();
        const now = Date.now();
        const ONE_HOUR = 60 * 60 * 1000;

        // If we have cached data that's less than 1 hour old, use it
        if (epa.data && epa.lastFetch && (now - epa.lastFetch < ONE_HOUR)) {
            return null; // Skip fetch, use cached data
        }

        const response = await fetch('/api/epa-communities');
        const data = await response.json();
        return data;
    }
);

const epaSlice = createSlice({
    name: 'epa',
    initialState: {
        data: null,
        lastFetch: null,
        loading: false,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchEPAData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchEPAData.fulfilled, (state, action) => {
                if (action.payload) { // Only update if we got new data
                    state.data = action.payload;
                    state.lastFetch = Date.now();
                }
                state.loading = false;
            })
            .addCase(fetchEPAData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    }
});

export default epaSlice.reducer; 