import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import HomeIcon from '@material-ui/icons/Home';
import GroupIcon from '@material-ui/icons/Group';
import GavelIcon from '@material-ui/icons/Gavel';
import ListAltIcon from '@material-ui/icons/ListAlt';
import StarsIcon from '@material-ui/icons/Stars';
import PeopleOutlineIcon from '@material-ui/icons/PeopleOutline';
import AssignmentIcon from '@material-ui/icons/Assignment';

export const mainListItems = (
  <div>
  <ListSubheader inset>Профиль</ListSubheader>
    <ListItem button>
      <ListItemIcon>
        <HomeIcon />
      </ListItemIcon>
      <ListItemText primary="Мой профиль" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <GroupIcon />
      </ListItemIcon>
      <ListItemText primary="Моя команда" />
    </ListItem>
  </div>
);

export const secondaryListItems = (
  <div>
    <ListSubheader inset>Хакатон</ListSubheader>
    <ListItem button>
      <ListItemIcon>
        <PeopleOutlineIcon />
      </ListItemIcon>
      <ListItemText primary="Все команды" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <StarsIcon />
      </ListItemIcon>
      <ListItemText primary="Номинации" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <ListAltIcon />
      </ListItemIcon>
      <ListItemText primary="Рассписание" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <GavelIcon />
      </ListItemIcon>
      <ListItemText primary="Голосование" />
    </ListItem>
  </div>
);