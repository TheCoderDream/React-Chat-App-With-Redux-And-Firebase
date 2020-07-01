import Spinner from "../Spinner/Spinner";
import React from "react";
import { Redirect, Route } from "react-router-dom"

export default (
    {
        component: Component,
        redirectTo = '/login',
        auth,
        ...rest
    }
) => {
    return (
        <Route
            {...rest}
            render={props =>
                auth.loading ? (
                    <Spinner/>
                ) : auth.isAuthenticated ? (
                    <Component {...props} />
                ) : (
                    <Redirect to={redirectTo}/>
                )
            }
        />
    )
};
