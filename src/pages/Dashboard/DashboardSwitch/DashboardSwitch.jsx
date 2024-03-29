import React from "react";
import { Route, Switch } from "react-router";
import { Redirect } from "react-router-dom";

import Track from "@views/Track";
import MainPage from "@views/MainView";
import Tracks from "@views/TrackList";
import Team from "@views/Team";
import AttendeeForm from "@pages/AttendeeForm";

const DashboardSwitch = () => {
  return (
    <Switch>
      <Route path="/dashboard/team/:teamId" component={Team}/>
      <Route path="/dashboard/registration-profile" component={AttendeeForm} />
      <Route path="/dashboard/track/:trackId" component={Track} />
      <Route path="/dashboard/tracks" component={Tracks} />
      <Route path="/dashboard/" exact component={MainPage} />
      <Redirect to="/dashboard/" />
    </Switch>
  );
};

export default DashboardSwitch;
