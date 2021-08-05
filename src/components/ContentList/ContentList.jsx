import React, { useMemo } from "react";
import { Divider, List, makeStyles, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  emptyText: {
    textAlign: "center",
  },
}));

/**
 * @param {{content: Array, children: Function, loading: boolean}} props
 */
const ContentList = ({ content, children, dividers = false }) => {
  const classes = useStyles();
  const renderedContent = useMemo(
    () =>
      content.map((item, index, array) => (
        <React.Fragment key={index}>
          {dividers && index !== 0 && <Divider />}
          {children(item, index, array)}
        </React.Fragment>
      )),
    [content, children, dividers]
  );
  if (content.length === 0) {
    return (
      <Typography
        variant="caption"
        display="block"
        className={classes.emptyText}
        gutterBottom
      >
        Список пуст
      </Typography>
    );
  } else {
    return <List>{renderedContent}</List>;
  }
};

export default ContentList;
