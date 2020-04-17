import React, { Component } from "react";
import ReactDOM from "react-dom";
// import App component
import App from "./components/App";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import ExpenseEdit from "./components/ExpenseEdit";

// change the getElementId from example to app
// render App component instead of Example
if (document.getElementById("root")) {
    ReactDOM.render(
        <BrowserRouter>
            <div>
                <Switch>
                    <Route
                        path="/:id/edit"
                        component={ExpenseEdit}
                        exact={true}
                    />
                    <App />
                </Switch>
            </div>
        </BrowserRouter>,
        document.getElementById("root")
    );
}
