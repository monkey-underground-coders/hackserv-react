import React from "react";

import { getUserByIdSelector } from "@redux/users";
import { useParamSelector } from "@utils/hooks";
import {
  IconButton,
  ListItemSecondaryAction,
  ListItemText,
} from "@material-ui/core";
import { Icon } from '@iconify/react';
import { getFirstCapitalSymbols } from "@utils/stringConvert";
import { Avatar, ListItemAvatar } from "@material-ui/core";
import toMaterialStyle from "material-color-hash";
import ListItem from "@material-ui/core/ListItem";
import DeleteIcon from "@material-ui/icons/Delete";
import { useDispatch } from "react-redux";
import { changeCaptain, deleteMember } from "@redux/teams/thunks";
import { unwrapResult } from "@reduxjs/toolkit";

const Member = ({ uid, teamId, captainId, isCaptain }) => {
  const user = useParamSelector(getUserByIdSelector, { userId: uid });
  const name = `${user.firstName} ${user.middleName} ${user.lastName}`;
  const dispatch = useDispatch();

  const handleDeleteMember = () =>
    dispatch(deleteMember({ uid, teamId })).then(unwrapResult);

  
  const handleMakeCaptain = () =>
    dispatch(changeCaptain({ uid, teamId })).then(unwrapResult);

  return (
    <ListItem key={uid}>
      <ListItemAvatar>
        <Avatar style={toMaterialStyle(name)}>
          {getFirstCapitalSymbols(name, 2)}
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        primaryTypographyProps={{
          variant: "body1",
        }}
        primary={name}
      />
      <ListItemSecondaryAction edge="end" >
        {isCaptain && captainId === uid &&
        <IconButton aria-label="Kick from team" disabled={captainId === uid} onClick={handleMakeCaptain}>
          <Icon icon="mdi:crown" color="yellow" width="24" />
        </IconButton>}
        {isCaptain && captainId !== uid &&
        <IconButton aria-label="Kick from team" disabled={captainId === uid} onClick={handleMakeCaptain}>
          <Icon icon="mdi:crown" color="black" width="24" />
        </IconButton>}
        {!isCaptain && captainId === uid &&
        <IconButton aria-label="Kick from team" disabled={true}>
          <Icon icon="mdi:crown" color="yellow" width="24" />
        </IconButton>}
        {isCaptain &&
        <IconButton aria-label="Kick from team" onClick={handleDeleteMember}>
          <DeleteIcon />
        </IconButton>}
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default Member;
