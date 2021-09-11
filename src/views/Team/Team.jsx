import React, { useCallback } from "react";
import { useSelector } from "react-redux";

import { getTeamById, getExceptionSelector } from "@redux/teams";
import WithoutExceptionTeamComp from "./WithoutExceptionTeamComp";
import { getSelfUserSelector, isSelfAdminSelector } from "@redux/users";
import { useLoading, useNumberParams } from "@utils";
import LoadingAndError from "@components/LoadingAndError";

const Team = () => {
  const { teamId } = useNumberParams();

  const exception = useSelector(getExceptionSelector);
  const { team: selfTeamId } = useSelector(getSelfUserSelector);
  const selfAdmin = useSelector(isSelfAdminSelector);

  const internalAccess = selfTeamId === teamId || selfAdmin;

  const actionCreator = useCallback(
    () => getTeamById({ id: teamId, isInternal: internalAccess }),
    [internalAccess, teamId]
  );

  const { loading, status } = useLoading(actionCreator);

  return (
    <LoadingAndError loading={loading} status={status} error={exception}>
      <WithoutExceptionTeamComp teamId={teamId} />
    </LoadingAndError>
  );
};

export default Team;
