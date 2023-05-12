import React from "react";
import CardFooterBase from "temp-library-components/cards/CardFooterBase";
import useComponentStateReference from "hooks/useComponentStateReference";

export default function ToolCardFooter() {
  const { themeConstants } = useComponentStateReference();

  return (
    <CardFooterBase
      backgroundColor={themeConstants.RESOURCE_COLORS.TOOLS}
      color={themeConstants.COLOR_PALETTE.WHITE}
      text={"Tool Registry"}
    />
  );
}

ToolCardFooter.propTypes = {};