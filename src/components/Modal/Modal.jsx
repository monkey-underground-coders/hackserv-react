import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "0.2px solid #fff",
    borderRadius: "4%",
    padding: theme.spacing(2, 4, 3),
    outline: 0
  },
  signInButton: {
    marginRight: "1rem",
  },
}));

export default function TransitionsModal({
  openModal,
  setOpenModal,
  children,
}) {
  const classes = useStyles();

  const handleClose = () => {
    setOpenModal(false);
  };

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={openModal}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
        disableAutoFocus
      >
        <Fade in={openModal}>
          <div className={classes.paper}>{children}</div>
        </Fade>
      </Modal>
    </div>
  );
}

export const makeModal = (WrappedComponent) => ({
  openModal,
  setOpenModal,
}) => (
  <TransitionsModal openModal={openModal} setOpenModal={setOpenModal}>
    <WrappedComponent />
  </TransitionsModal>
);
