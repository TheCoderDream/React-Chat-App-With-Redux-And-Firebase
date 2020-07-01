import React, {Component} from 'react';
import {connect} from "react-redux"
import "./Profile.scss"
import {Link} from "react-router-dom";
import Spinner from "../../components/Spinner/Spinner";

const NoFoto = (<div className="no-photo d-flex justify-content-center align-items-center">
    No Photo
</div>);

class Profile extends Component {


    render() {
        const {photoUrl, firstName, lastName, quote, id,bio} = this.props.user;
        return (
            <>
                {
                    this.props.user ?
                        <div className="container">
                            <div className="row justify-content-center">
                                {
                                    photoUrl ?
                                        (<div className="col-xs-12 col-sm-8 col-md-6">
                                            <img src={photoUrl} alt="profile-pic"
                                                 className="rounded-circle mx-auto d-block profile-pic"/>
                                        </div>) : NoFoto
                                }
                            </div>
                            <div className=" row justify-content-center">
                                <div className=" col-xs-12 col-sm-8 col-md-6 text-center name">
                                    {firstName} {lastName}
                                </div>
                            </div>
                            <div className=" row justify-content-center">
                                <div className=" col-xs-12 col-sm-8 col-md-6 text-center quote">
                                    <blockquote className=" blockquote">
                                        <p className=" mb-0">
                                            {quote}
                                        </p>
                                    </blockquote>
                                </div>
                            </div>
                            <div className=" row justify-content-center">
                                <div className=" col-xs-12 col-sm-8 col-md-6 text-center bio">
                                    {bio}
                                </div>
                            </div>
                            <div className=" row justify-content-center">
                                <div className=" col-xs-12 col-sm-8 col-md-6 text-center edit-button">
                                    <Link to={`/profile/${id}/edit`} className="btn btn-primary">Edit Profile</Link>
                                </div>
                            </div>
                        </div> :
                        <Spinner/>
                }

            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user.currentUser
    }
}

export default connect(mapStateToProps, null)(Profile);
