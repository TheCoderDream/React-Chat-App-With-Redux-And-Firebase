import React from 'react';
import "./ChatMessage.scss"
import {connect} from "react-redux";
import {formatDate} from "../../../../utils/utils";

const ChatMessage = ({messagesByUsers}) => {
    return (
        messagesByUsers && messagesByUsers.map(m => (
                <div className="chat-message d-flex" key={m.sender.id}>
                    <div className="image-wrapper">
                        <img src={m.sender.photoUrl} className=" rounded-circle" />
                    </div>
                    <div className=" bubble d-flex flex-column">
                        <div className="name">
                            {m.sender.firstName} {m.sender.lastName}
                        </div>
                        <div className=" message">
                            {
                                m.messages.map(
                                    me => (
                                        (
                                            <p key={me.createdAt.toString()}>
                                                {me.message} <small className=" timestamp">{formatDate(me.createdAt.toDate())}</small>
                                            </p>
                                        )
                                    )
                                )
                            }
                        </div>
                    </div>
                </div>
            ))
);
};

export default connect(
    (state) => ({
        messagesByUsers: state.chatRooms.messagesByUsers
    })
)(ChatMessage);
