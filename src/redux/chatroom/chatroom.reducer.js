import {
    SET_CHAT_ROOM,
    FETCH_COLLECTIONS_START,
    FETCHING_COLLECTIONS_FAILURE,
    FETCHING_COLLECTIONS_SUCCESS,
    FETCHING_MESSAGES_SUCCESS
} from './chatroom.actions';

const initialState = {
    chatRooms: null,
    selectedChatroom: null,
    selectedChatroomMessages: null,
    messages: null,
    messagesByUsers: null
};

export default (state = initialState, action) => {
    switch (action.type) {
        case FETCH_COLLECTIONS_START:
            return {
                ...state,
            };
        case FETCHING_COLLECTIONS_SUCCESS:
            return {
                ...state,
                chatRooms: action.payload
            };
        case FETCHING_COLLECTIONS_FAILURE:
            return {
                ...state,
                errorMessage: action.payload
            };
        case SET_CHAT_ROOM:
            return {
                ...state,
                selectedChatroom: action.payload
            };
        case FETCHING_MESSAGES_SUCCESS:
            return {
                ...state,
                messages: action.payload,
                messagesByUsers: groupMessagesByUser(action.payload)
            };
    default:
        return state
    }
}


function groupMessagesByUser(messages) {
    let result = [];
    let messageGroup = {sender: null, messages: []};
    for (let i = 0; i < messages.length; i++) {
        const prevMessage = messages[i -1];
        const currentMessage = messages[i];
        if (!prevMessage) {
            messageGroup.sender = currentMessage.sender;
            messageGroup.messages.push({
                createdAt: currentMessage.createdAt,
                message: currentMessage.message
            });
            if (i === messages.length -1 ) {
                result.push(messageGroup);
            }
        } else if (currentMessage.sender.id === prevMessage.sender.id ) {
            messageGroup.messages.push({
                createdAt: currentMessage.createdAt,
                message: currentMessage.message
            });
            if (i === messages.length -1 ) {
                result.push(messageGroup);
            }
        } else {
            result.push(messageGroup);
            messageGroup = {sender: null, messages: []};
            messageGroup.sender = currentMessage.sender;
            messageGroup.messages.push({
                createdAt: currentMessage.createdAt,
                message: currentMessage.message
            });
        }
    }
    return result;
}
