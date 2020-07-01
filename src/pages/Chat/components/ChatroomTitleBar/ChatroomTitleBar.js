import React from 'react';
import "./ChatroomTitleBar.scss"

const ChatroomTitleBar = ({title}) => {
    return (
        <div className="room-title">
            <h4>{title}</h4>
        </div>
    );
};

export default ChatroomTitleBar;
