import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

import axiosInstance from "../../config/axiosInstance";

const initialState = {
    downloadedTickets: [],
    ticketList : [], 
    ticketDistribution: {
        open : 0, 
        onHold: 0, 
        inProgress: 0,
        canceled: 0, 
        resolved: 0,
    }
}

export const getAllTicketsforTheUser = createAsyncThunk('tickets/getAllTicketsforTheUser', async () => {
    try {
        const response = axiosInstance.get("getMyAssignedTickets", {
            headers: {
                'x-access-token' : localStorage.getItem('token')
            }
        });
        toast.promise(response, {
            success: "Successfully loaded all the tickets",
            loading: "Fetching tickets belonging to you",
            error: 'Something went wrong',
        });
        return await response;

    }

    catch(error) {
        console.log("error handled by ticket slice", error)
    }
})
const ticketSlice = createSlice({
    name: 'tickets',
    initialState,
    reducers: {
        filterTickets: (state, action) => {
            // console.log(action.payload)
            let status = action.payload.status.toLowerCase();
            if(status == "in progress"){
                status = "inProgress"
            }
            if (status == "on hold"){
                status = "onHold"
            }
            state.ticketList = state.downloadedTickets.filter((ticket) => ticket.status == status)
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getAllTicketsforTheUser.fulfilled, (state, action) => {
            if(!action?.payload?.data) return;
            state.ticketList = action?.payload?.data?.result;
            state.downloadedTickets = action?.payload?.data?.result;
            const tickets = action?.payload?.data?.result;
            state.ticketDistribution = {
                open : 0, 
                onHold: 0, 
                inProgress: 0,
                canceled: 0, 
                resolved: 0,
            }
            tickets.forEach((ticket) => {
                state.ticketDistribution[ticket.status] = state.ticketDistribution[ticket.status] + 1;
            })
        });
    }
});

export const {filterTickets} = ticketSlice.actions;
export default ticketSlice.reducer;