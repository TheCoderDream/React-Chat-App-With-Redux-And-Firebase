import {combineReducers} from "redux"

import {reducer as toastrReducer} from 'react-redux-toastr'
import userReducer from "./user/user.reducer";
import chatroomReducer from './chatroom/chatroom.reducer'

const rootReducer = combineReducers({
    user: userReducer,
    chatRooms: chatroomReducer,
    toastr: toastrReducer
});

export default rootReducer;
