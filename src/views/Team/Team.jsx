import React from "react";
import {
  getTeamById,
  getExceptionSelector,
} from "@redux/teams";
import { withEntityRenderFetch } from "@components/RenderFetch/EntityRenderFetch";
import WithoutExceptionTeamComp from "./WithoutExceptionTeamComp";
import { useSelector } from "react-redux";
import NotFoundPage from '@components/NotFoundPage';

const Team = ({ teamId }) => {
  const exception = useSelector(getExceptionSelector);
  if (!exception) {
    return <WithoutExceptionTeamComp
      teamId={teamId}
    />
  } else {
    return <NotFoundPage 
    />
  }
};

export default withEntityRenderFetch(Team, "teamId", (idObj) => getTeamById({id: idObj.id, isInternal: true}));
