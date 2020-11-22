import { useEffect, useState } from "react";
import { Route, Switch, useHistory } from "react-router-dom";

import CircularProgress from "@material-ui/core/CircularProgress";

import Login from "../pages/login";
import Users from "../pages/users/";
import FeedbackForm from "../pages/feedback-form";
import UsersFeedbacks from "../pages/user-feedbacks";
import UserForm from "../pages/user-form";

import Header from "./header";

import axios from "axios";

const Authenticator = () => {
  const [isAuthenticated, setAuthentication] = useState(undefined);
  const history = useHistory();

  useEffect(() => {
    const token = window.localStorage.getItem("authToken");
    if (!token) {
      setAuthentication(false);
    }

    axios
      .get("https://ka-users-api.herokuapp.com/users", {
        headers: { Authorization: token },
      })
      .then(() => {
        setAuthentication(true);
        history.push("/users");
      })
      .catch(() => {
        setAuthentication(false);
      });
  }, [history, setAuthentication]);

  if (isAuthenticated === undefined) {
    return <CircularProgress />;
  }

  if (isAuthenticated === false) {
    return (
      <Switch>
        <Route exact path="/">
          <Login setAuthentication={setAuthentication} />
        </Route>
        <Route exact path="/user-form">
          <UserForm />
        </Route>
      </Switch>
    );
  }
  return (
    <>
      {isAuthenticated && <Header setAuthentication={setAuthentication} />}

      <Switch>
        <Route exact path="/">
          <Login setAuthentication={setAuthentication} />
        </Route>

        <Route exact path="/users">
          <Users />
        </Route>
        <Route exact path="/feedback-form/:id">
          <FeedbackForm />
        </Route>
        <Route exact path="/user-feedbacks/:id">
          <UsersFeedbacks />
        </Route>
        <Route exact path="/user-form">
          <UserForm />
        </Route>
      </Switch>
    </>
  );
};

export default Authenticator;
