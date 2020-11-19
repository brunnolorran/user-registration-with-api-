import { useEffect, useState } from "react";
import { Route, Switch, useHistory } from "react-router-dom";

import CircularProgress from "@material-ui/core/CircularProgress";

import Login from "../pages/login";
import Restricted from "../pages/restricted";
import Users from "../pages/users";
import FeedbackForm from "../pages/feedback-form";
import UsersFeedbacks from "../pages/user-feedbacks";
import UserForm from "../pages/user-form";

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
        history.push("/restricted");
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
        <Route path="/user-form">
          <UserForm />
        </Route>
      </Switch>
    );
  }
  return (
    <Switch>
      <Route exact path="/">
        <Login setAuthentication={setAuthentication} />
      </Route>
      <Route path="/restricted">
        <Restricted />
      </Route>
      <Route path="/users">
        <Users />
      </Route>
      <Route path="/feedback-form">
        <FeedbackForm />
      </Route>
      <Route path="/user-feedbacks">
        <UsersFeedbacks />
      </Route>
    </Switch>
  );
};

export default Authenticator;
