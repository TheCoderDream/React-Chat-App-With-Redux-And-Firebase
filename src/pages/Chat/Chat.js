import React from 'react';
import {connect} from "react-redux"
import ChatroomList from "./components/ChatroomList/ChatroomList";
import ChatroomWindow from "./components/ChatroomWindow/ChatroomWindow";
import {fetchChatRooms} from "../../redux/chatroom/chatroom.actions";

const Chat = ({fetchChatRooms,chatRooms}) => {
    React.useEffect(() => {
        fetchChatRooms()
    },[fetchChatRooms])
    return (
        <div className="container-wrapper container d-flex">
            <ChatroomList chatrooms={chatRooms}/>
            <ChatroomWindow/>
        </div>
    );
};

const mapStateToProps = state => ({
    chatRooms: state.chatRooms.chatRooms
})

const mapDispatchToProps = dispatch => ({
    fetchChatRooms: () => dispatch(fetchChatRooms())
})

export default connect(mapStateToProps,mapDispatchToProps)(Chat);
