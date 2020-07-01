import React, {Component} from 'react';
import {Link} from "react-router-dom"
import { auth, createUserProfileDocument } from '../../firebase/firebase.utils';
import "./Signup.scss"
import {toastr} from "react-redux-toastr";

class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword:"",
            error: ""
        }
    }

    handleChange = (e) => {
        this.setState({[e.target.name] : e.target.value})
    };

    handleSubmit = async e => {
        e.preventDefault();
        const {firstName,email,password,lastName,confirmPassword} = this.state;
        if (
            firstName === '' ||
            lastName === '' ||
            email === '' ||
            password === '' ||
            confirmPassword === ""

        ) {
            return this.setState({error: 'Please fill in all the blanks'});
        } else if (password.length < 6 || confirmPassword.length < 6) {
            return this.setState({error: 'Please enter at least 6 characters...'});
        } else if (password !== confirmPassword) {
            return this.setState({error: 'Both passwords should match...'});
        } else {
            try {
                const {user} = await auth.createUserWithEmailAndPassword(
                    email,
                    password
                );
                await createUserProfileDocument(user, {
                    firstName,
                    lastName,
                    // default avatar
                    photoUrl: 'https://firebasestorage.googleapis.com/v0/b/chat-874ea.appspot.com/o/default-avatar.jpg?alt=media&token=e294ee8a-3a09-4225-a768-85bbc9988c22',
                    quote: 'Quote is under construction...',
                    bio: 'Bio is under construction...'
                });
                await user.updateProfile({
                    displayName: firstName + " " + lastName,
                });
                this.setState({
                    firstName: "",
                    lastName: "",
                    email: "",
                    password: "",
                    confirmPassword: ""
                })
            } catch (error) {
                const message = error ? error.message : 'Can\'t register';
                toastr.error('Error!', message);
            }
        }
    };

    render() {
        return (
            <div className="container-wrapper container d-flex justify-content-center align-items-center">
                <div className="form-wrapper text-center">
                    <h2 className="text-center">Sign Up</h2>
                    <form onSubmit={this.handleSubmit}>
                        <div className="name-wrapper d-flex">
                            <div className="form-group first-name">
                                <input
                                    type="text"
                                    name="firstName"
                                    className="form-control"
                                    id="first-name-input"
                                       placeholder="First Name"
                                    value={this.state.firstName}
                                    onChange={this.handleChange}
                                />
                            </div>
                            <div className="form-group last-name">
                                <input
                                    type="text"
                                    name="lastName"
                                       className="form-control"
                                       id="last-name-input"
                                       placeholder="Last Name"
                                       value={this.state.lastName}
                                    onChange={this.handleChange}
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <input
                                type="email"
                                name="email"
                                   className="form-control"
                                   id="email-input"
                                   placeholder="Enter Email"
                                   value={this.state.email}
                                onChange={this.handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                name="password"
                                className="form-control"
                                id="password-input"
                                placeholder="Password"
                                   value={this.state.password}
                                onChange={this.handleChange}/>
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                name="confirmPassword"
                                className="form-control"
                                id="password-input"
                                placeholder="Confirm Password"
                                value={this.state.confirmPassword}
                                onChange={this.handleChange}/>
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                    <small><Link to="/login">Already have an Account?</Link></small>
                    {this.state.error.length ? (
                        <div className="alert alert-danger mt-3">{this.state.error}</div>
                    ) : null}
                </div>
            </div>
        );
    }
}

export default Signup;
