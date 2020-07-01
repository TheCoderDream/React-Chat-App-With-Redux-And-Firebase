import React from 'react';
import {connect} from "react-redux"
import firebase from "firebase";
import { createUserProfileDocument } from './firebase/firebase.utils';
import {Switch,Route,withRouter,Redirect} from "react-router-dom"
import ReduxToastr from 'react-redux-toastr'
import Navbar from "./components/Navbar/Navbar";
import { setCurrentUser, clearUser } from './redux/user/user.actions';
import "./styles/styles.scss";
import Chat from "./pages/Chat/Chat";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import Profile from "./pages/Profile/Profile";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import EditProfile from "./pages/EditProfile/EditProfile";



function App({setUser, history, removeUser,auth }) {
    React.useEffect(() => {
        firebase.auth().onAuthStateChanged(async user => {
             if (user) {
                 const userRef = await createUserProfileDocument(user);
                 userRef.onSnapshot(snapShot => {
                     setUser({ id: snapShot.id, ...snapShot.data() });
                 });
                 console.log('user logged in');
                 history.push('/');
            } else {
                 history.push('/login');
                 console.log('user logged out');
                 removeUser();
             }
        });
    }, []);
  return (
    <div className="App">
        <Navbar/>
        <Switch>
            <PrivateRoute auth={auth} exact path="/" component={Chat}/>
            <PrivateRoute auth={auth} exact path="/profile" component={Profile}/>
            <PrivateRoute auth={auth} exact path="/profile/:id/edit" component={EditProfile}/>
            <PrivateRoute auth={{isAuthenticated: !auth.isAuthenticated, loading: auth.loading}}
                          exact path="/login" component={Login} redirectTo={'/'}/>
            <Route exact path="/signup" component={Signup} />
            <Route  path="*" render={() => <Redirect to="/"/>} />
        </Switch>
        <ReduxToastr
            timeOut={4000}
            newestOnTop={false}
            preventDuplicates
            position="top-right"
            getState={(state) => state.toastr}
            transitionIn="fadeIn"
            transitionOut="fadeOut"
            progressBar
            closeOnToastrClick/>
    </div>
  )

}

const mapStateToProps = state => ({
    currentUser: state.user.currentUser,
auth: {
        isAuthenticated: state.user.currentUser,
    loading: state.user.loading
}

});

const mapDispatchToProps = dispatch => ({
    setUser: user => dispatch(setCurrentUser(user)),
    removeUser: () => dispatch(clearUser())
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App));
