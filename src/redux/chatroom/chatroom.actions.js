import {firestore} from "../../firebase/firebase.utils";

export const SET_CHAT_ROOM = 'SET_CHAT_ROOM';
export const FETCH_COLLECTIONS_START = 'FETCH_COLLECTIONS_START';
export const FETCHING_COLLECTIONS_SUCCESS = 'FETCHING_COLLECTIONS_SUCCESS';
export const FETCHING_COLLECTIONS_FAILURE = 'FETCHING_COLLECTIONS_FAILURE';
export const FETCHING_MESSAGES_SUCCESS = 'FETCHING_MESSAGES_SUCCESS';

export const setChatRoom = (channel) => ({
    type: SET_CHAT_ROOM,
    payload:channel
})

export const fetchCollectionsStart = () => ({
    type: FETCH_COLLECTIONS_START
});

export const fetchCollectionsSuccess = collectionsMap => ({
    type: FETCHING_COLLECTIONS_SUCCESS,
    payload: collectionsMap
});

export const fetchCollectionsFailure = errorMessage => ({
    type: FETCHING_COLLECTIONS_FAILURE,
    payload: errorMessage
});

export const fetchMessagesSuccess = collectionsMap => ({
    type: FETCHING_MESSAGES_SUCCESS,
    payload: collectionsMap
});


export const fetchChatRooms = () => {
    return dispatch => {
      const chatRef =  firestore.collection("chatrooms");
        dispatch(fetchCollectionsStart());

        chatRef.get().then(snapShot => {
            const collectionsMap = snapShot.docs.map(doc => {
                const data = doc.data();
                data.id = doc.id;
                return data;
            });
            dispatch(fetchCollectionsSuccess(collectionsMap))
        })
            .catch(error => dispatch(fetchCollectionsFailure(error.Message)));


    }
};

export const fetchMessagesAsync = () => {
    return (dispatch, getState) => {
        firestore.collection(`chatrooms/${getState().chatRooms.selectedChatroom.id}/messages`).orderBy("createdAt", "desc").onSnapshot(function(snapshot) {
            const collectionsMap = snapshot.docs.map(doc => {
                    const data = doc.data();
                    data.id = doc.id;
                    return data
                }
            );
            dispatch(fetchMessagesSuccess(collectionsMap))
        })
    }
};
