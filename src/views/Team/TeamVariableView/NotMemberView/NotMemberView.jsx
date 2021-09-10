import React from "react";

import CenteredPaper from "@components/CenteredPaper";
import Title from '@components/Title';

const NotMemberView = ({ teamName }) => {
  return (
    <>
      <CenteredPaper>
        <Title gutterBottom={false}>
          {teamName}
        </Title>
      </CenteredPaper>
    </>
  );
};

export default NotMemberView;
