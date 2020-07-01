import React from 'react';
import { connect } from 'react-redux'
import ChatroomTitleBar from "../ChatroomTitleBar/ChatroomTitleBar";
import {fetchMessagesAsync} from "../../../../redux/chatroom/chatroom.actions";
import ChatMessage from "../ChatMessage/ChatMessage";
import ChatInput from "../ChatInput/ChatInput";
import "./ChatroomWindow.scss"

const NoChatRoom = (
    <div className="select-room h-100 w-100 d-flex justify-content-center align-items-center">
        <div className="select-room-message">
            Select a Room
        </div>
    </div>
);


class ChatroomWindow extends React.Component {
    scrollContainer = React.createRef();


    componentDidUpdate(prevProps) {
        if (this.props.selectedChatroom && this.props.selectedChatroom !== prevProps.selectedChatroom) {
            this.props.fetchMessagesAsync();
        }

        if (this.scrollContainer.current && this.props.messages) {
            setTimeout(() => {
                this.scrollContainer.current.scrollTop = this.scrollContainer.current.scrollHeight;
            }, 0)
        }
    }

    render() {
    return (
        <React.Fragment>
            {
                this.props.selectedChatroom ?
                    <div className="chatroom-window">
                        <ChatroomTitleBar title={this.props.selectedChatroom.name} />
                        <div className="message-wrapper" ref={this.scrollContainer}>
                            <ChatMessage message="message"/>
                        </div>
                        <ChatInput />
                    </div>:
                    NoChatRoom
            }
        </React.Fragment>
    );
}
};

const mapDispatchToProps = dispatch => ({
    fetchMessagesAsync: () => dispatch(fetchMessagesAsync())
})

export default connect(
    (state) => (
        {
            selectedChatroom: state.chatRooms.selectedChatroom,
            messages: state.chatRooms.messages,
            messagesByUsers: state.chatRooms.messagesByUsers
        }
    ),mapDispatchToProps
)(ChatroomWindow);
