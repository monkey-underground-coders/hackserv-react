import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import HomeIcon from "@material-ui/icons/Home";
import GroupIcon from "@material-ui/icons/Group";
import ListAltIcon from "@material-ui/icons/ListAlt";
import StarsIcon from "@material-ui/icons/Stars";
import { Link } from "react-router-dom";

const styles = {
  linkDecNone: {
    outline: "none",
    textDecoration: "none",
    color: "#000",
  },
};

export const mainListItems = (
  <div>
    <ListSubheader inset>Профиль</ListSubheader>
    <ListItem button>
      <ListItemIcon>
        <HomeIcon />
      </ListItemIcon>
      <ListItemText primary="Мой профиль" />
    </ListItem>
    <Link to="/dashboard/myteam" style={styles.linkDecNone}>
      <ListItem button>
        <ListItemIcon>
          <GroupIcon />
        </ListItemIcon>
        <ListItemText primary="Моя команда" />
      </ListItem>
    </Link>
  </div>
);

export const secondaryListItems = (
  <div>
    <ListSubheader inset>Хакатон</ListSubheader>
    <Link to="/dashboard/tracks" style={styles.linkDecNone}>
      <ListItem button>
        <ListItemIcon>
          <StarsIcon />
        </ListItemIcon>
        <ListItemText primary="Номинации" />
      </ListItem>
    </Link>
    <ListItem button>
      <ListItemIcon>
        <ListAltIcon />
      </ListItemIcon>
      <ListItemText primary="Расписание" />
    </ListItem>
  </div>
);
