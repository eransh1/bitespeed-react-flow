import { createSlice } from "@reduxjs/toolkit";


let initialState={
    message:1
}

const optionCountSlice=createSlice({
    name:"optionCount",
    initialState,
reducers:{
increaseOptionCount:(state,action)=>{
state[action.payload]=state[action.payload]+1
},
decreaseOptionCount:(state,action)=>{
    state[action.payload]=state[action.payload]-1
    }
}
})

export const {increaseOptionCount, decreaseOptionCount}=optionCountSlice.actions
export default optionCountSlice.reducer