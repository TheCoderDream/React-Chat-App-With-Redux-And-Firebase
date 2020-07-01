import React from 'react';
import {Link} from "react-router-dom"
import {toastr} from 'react-redux-toastr'
import {  auth } from '../../firebase/firebase.utils';
import "./Login.scss"

const Login = () => {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [error, setError] = React.useState("");

    const handleChangeEmail = e => {
        setEmail(e.target.value);
    };
    const handleChangePassword = e => {
        setPassword(e.target.value);
    };

    const handleSubmit = async e => {
        e.preventDefault();
        if(email === "" || password === ""){
            return setError('Please fill in all the blanks');
        }
        try {
            await auth.signInWithEmailAndPassword(email, password);
            setPassword('');
            setEmail('');
        } catch (error) {
            const message = error ? error.message : 'Can\'t login';
            toastr.error('Error!', message);
        }
    };

    return (
        <div className="container-wrapper container d-flex justify-content-center align-items-center">
            <div className="form-wrapper text-center">
                <h2 className="text-center">Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input type="email" className="form-control" id="email-input" value={email} placeholder="Enter Email" onChange={handleChangeEmail}/>
                    </div>
                    <div className="form-group">
                        <input type="password" className="form-control" id="password-input" value={password} placeholder="Password" onChange={handleChangePassword}
                               />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
                <small><Link to="/signup">Need an Account?</Link></small>
                {error.length ? (
                    <div className="alert alert-danger mt-3">{error}</div>
                ) : null}
            </div>
        </div>
    );
};

export default Login;
