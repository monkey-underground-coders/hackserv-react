import React from "react";
import toMaterialStyle from "material-color-hash";
import {
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@material-ui/core";

import { getTeamsByIds } from "@redux/teams";
import { useParamSelector } from "@utils";
import { getFirstCapitalSymbols } from "@utils/stringConvert";
import ContentList from "@components/ContentList";

const TeamsList = ({ ids }) => {
  const teams = useParamSelector(getTeamsByIds, { ids }).sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  return (
    <ContentList content={teams} dividers>
      {({ id, name }) => (
        <ListItem key={id}>
          <ListItemAvatar>
            <Avatar style={toMaterialStyle(name)}>
              {getFirstCapitalSymbols(name, 3)}
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={name} />
        </ListItem>
      )}
    </ContentList>
  );
};

export default TeamsList;
