import React, { useState } from "react";
import clsx from "clsx";
import {
  AppBar,
  Button,
  Divider,
  Drawer,
  IconButton,
  List,
  makeStyles,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import HomeIcon from "@material-ui/icons/Home";
import GroupIcon from "@material-ui/icons/Group";
import GavelIcon from "@material-ui/icons/Gavel";
import ListAltIcon from "@material-ui/icons/ListAlt";
import StarsIcon from "@material-ui/icons/Stars";
import PeopleOutlineIcon from "@material-ui/icons/PeopleOutline";
import CallMadeIcon from "@material-ui/icons/CallMade";
import { logout } from "@redux/auth";
import { getSelfTeamSelector } from '@redux/teams/selectors';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  linkDecNone: {
    outline: "none",
    textDecoration: "none",
    color: "#000",
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: "none",
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9),
    },
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 240,
  },
  logoutButton: {
    marginRight: theme.spacing(2),
  },
  a: {
    color: "white",
    textDecoration: "none",
  },
}));
const MenuBar = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const handleLogoutClick = () => {
    dispatch(logout());
  };
  const team = useSelector(getSelfTeamSelector);
  return (
    <>
      <AppBar
        position="absolute"
        className={clsx(classes.appBar, open && classes.appBarShift)}
      >
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(
              classes.menuButton,
              open && classes.menuButtonHidden
            )}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            className={classes.title}
          >
            <Link to="/dashboard/" className={classes.a}>
              Dashboard
            </Link>
          </Typography>
          <Button
            variant="contained"
            color="default"
            className={classes.logoutButton}
            onClick={handleLogoutClick}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <aside>
          <div className={classes.toolbarIcon}>
            <IconButton onClick={handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />
          <List>
            <ListSubheader inset>Профиль</ListSubheader>
            <ListItem button>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary="Мой профиль" />
            </ListItem>
            { team  &&
            (<Link to={`/dashboard/team/${team.id}`} className={classes.linkDecNone}>
              <ListItem button>
                <ListItemIcon>
                  <GroupIcon />
                </ListItemIcon>
                <ListItemText primary="Моя команда" />
              </ListItem>
            </Link>) }
          </List>
          <Divider />
          <List>
            <ListSubheader inset>Хакатон</ListSubheader>
            <Link
              to="/dashboard/registration-profile"
              className={classes.linkDecNone}
            >
              <ListItem button>
                <ListItemIcon>
                  <CallMadeIcon />
                </ListItemIcon>
                <ListItemText primary="Подать заявку" />
              </ListItem>
            </Link>
            <ListItem button>
              <ListItemIcon>
                <PeopleOutlineIcon />
              </ListItemIcon>
              <ListItemText primary="Все команды" />
            </ListItem>
            <Link to="/dashboard/tracks" className={classes.linkDecNone}>
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
            <ListItem button>
              <ListItemIcon>
                <GavelIcon />
              </ListItemIcon>
              <ListItemText primary="Голосование" />
            </ListItem>
          </List>
        </aside>
      </Drawer>
    </>
  );
};

export default MenuBar;
