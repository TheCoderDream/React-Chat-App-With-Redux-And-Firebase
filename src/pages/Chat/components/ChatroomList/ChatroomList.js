import React from 'react';
import {connect} from "react-redux"
import {setChatRoom} from "../../../../redux/chatroom/chatroom.actions"
import Spinner from "../../../../components/Spinner/Spinner";
import './ChatroomList.scss'

const ChatroomList = ({chatrooms, setChatRoom}) => {
    return (
        <>
            {
                chatrooms ?
                    <div className="h-100 d-flex flex-column chatroom-list">
                        {
                            chatrooms.map(c => (
                                <div
                                    key={c.id}
                                    className="chatroom-list-item">
                                    <a
                                        //to={`/${c.id}`}
                                        href="#/"
                                        onClick={() => setChatRoom(c)}
                                    >{c.name}</a>
                                </div>
                            ))
                        }
                    </div> :
                    <Spinner/>
            }
        </>
    );
};

const mapStateToProps = state => ({
    selectedChatroom: state.chatRooms.selectedChatroom
})

const mapDispatchToProps = dispatch => ({
    setChatRoom: (channel) => dispatch(setChatRoom(channel))
})

export default connect(mapStateToProps,mapDispatchToProps)(ChatroomList);
