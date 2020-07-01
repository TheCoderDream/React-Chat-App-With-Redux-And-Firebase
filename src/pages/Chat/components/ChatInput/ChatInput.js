import React from 'react';
import {connect} from 'react-redux';
import {toastr} from 'react-redux-toastr'
import "./ChatInput.scss";
import {sendMessage} from "../../../../firebase/firebase.utils";

class ChatInput extends React.Component{
    state = {
        message: '',
        inProgress: false
    };

    onSendMessage = (event) => {
        if ((event.keyCode === 13 || event.type === 'click') && this.state.message.trim() && !this.state.inProgress) {
            this.setState({
                    ...this.state,
                    inProgress: true
                });
            const chatroomId = this.props.selectedChatroom.id;
            const messageData = {
                message: this.state.message,
                createdAt: new Date(),
                sender: {
                    email: this.props.currentUser.email,
                    firstName: this.props.currentUser.firstName,
                    lastName: this.props.currentUser.lastName,
                    id: this.props.currentUser.id,
                    photoUrl: this.props.currentUser.photoUrl
                }
            };

            sendMessage(chatroomId, messageData)
                .then(result => {
                }).catch(err => {
                toastr.error(
                    'Error!',
                    err.message
                )
                }).finally(() => {
                this.setState( {
                    message: '',
                    inProgress: false
                });
            })
        }

    };

    handleChange = (e) => {
        console.log(e);
        this.setState({
                ...this.state,
                message: e.target.value
            }
        );
    };

    render() {
        return (
            <div className="new-message-wrapper d-flex">
                <div className="input-group">
                    <input
                        type="text" className="form-control"
                        placeholder="Enter a new message"
                        value={this.state.message}
                        onChange={this.handleChange}
                        onKeyUp={this.onSendMessage}/>
                    <div className="input-group-append">
                        <button className="btn btn-primary" type="button" onClick={this.onSendMessage}>Enter</button>
                    </div>
                </div>
            </div>
        );
    }
};

export default connect(
    (state) => ({
        selectedChatroom: state.chatRooms.selectedChatroom,
        currentUser: state.user.currentUser
    })
)(ChatInput);
