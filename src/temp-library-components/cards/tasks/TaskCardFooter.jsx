import React from "react";
import CardFooterBase from "temp-library-components/cards/CardFooterBase";
import useComponentStateReference from "hooks/useComponentStateReference";

export default function TaskCardFooter() {
  const { themeConstants } = useComponentStateReference();

  return (
    <CardFooterBase
      backgroundColor={themeConstants.COLOR_PALETTE.SALESFORCE_BLUE}
      color={themeConstants.COLOR_PALETTE.WHITE}
      text={"Task"}
    />
  );
}

TaskCardFooter.propTypes = {};