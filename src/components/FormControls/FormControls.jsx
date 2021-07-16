import React from "react";
import { CircularProgress, IconButton, makeStyles } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DoneIcon from "@material-ui/icons/Done";
import RotateLeftIcon from "@material-ui/icons/RotateLeft";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";

const useStyles = makeStyles((theme) => ({
  container: ({ edit }) => ({
    display: "flex",
    flexDirection: "row",
    width: !edit ? "100%" : undefined,
    alignItems: "center",
  }),
  editButton: {
    alignSelf: "end",
  },
  button: {
    flexShrink: 0,
  },
  doneButton: {
    zIndex: theme.zIndex.drawer + 1,
  },
  undoButtonHidden: {
    opacity: 0,
    marginRight: "-48px",
    transitionProperty: "opacity, margin-right",
    transitionDuration: "0.5s",
    transitionTimingFunction: "ease-out",
  },
  undoButton: {
    transitionProperty: "opacity, margin-right",
    transitionDuration: "0.5s",
    transitionTimingFunction: "ease-out",
  },
}));

const FormControls = ({
  edit,
  isDirty,
  onEdit,
  isSubmitting,
  isValid,
  isDeleting,
  onDelete = null,
  editProps = {},
  deleteProps = {},
  resetProps = {},
  submitProps = {},
}) => {
  const classes = useStyles({ edit });

  const handleDeleteClick = () => {
    if (!isDeleting) {
      onDelete();
    }
  };

  return (
    <>
      <IconButton
        disabled={!isValid}
        type="reset"
        className={
          !isDirty || !edit ? classes.undoButtonHidden : classes.undoButton
        }
        {...resetProps}
      >
        <RotateLeftIcon />
      </IconButton>
      {!edit && (
        <>
          <IconButton
            onClick={onEdit}
            aria-label="edit"
            className={classes.editButton}
            {...editProps}
          >
            <EditIcon />
          </IconButton>
          {onDelete &&
            (isDeleting ? (
              <IconButton className={classes.editButton}>
                <CircularProgress size={24} />
              </IconButton>
            ) : (
              <IconButton
                onClick={handleDeleteClick}
                aria-label="delete"
                className={classes.editButton}
                {...deleteProps}
              >
                <DeleteForeverIcon />
              </IconButton>
            ))}
        </>
      )}
      {edit &&
        (isSubmitting ? (
          <IconButton className={classes.doneButton}>
            <CircularProgress size="10" />
          </IconButton>
        ) : (
          <IconButton
            type="submit"
            disabled={isSubmitting}
            className={classes.doneButton}
            {...submitProps}
          >
            <DoneIcon />
          </IconButton>
        ))}
    </>
  );
};

export default FormControls;
