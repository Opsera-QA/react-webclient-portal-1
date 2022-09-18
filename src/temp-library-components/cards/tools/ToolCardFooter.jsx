import React from "react";
import CardFooterBase from "temp-library-components/cards/CardFooterBase";
import useComponentStateReference from "hooks/useComponentStateReference";

export default function ToolCardFooter() {
  const { themeConstants } = useComponentStateReference();

  return (
    <CardFooterBase
      backgroundColor={themeConstants.COLOR_PALETTE.GREEN}
      color={themeConstants.COLOR_PALETTE.WHITE}
      text={"Tool"}
    />
  );
}

ToolCardFooter.propTypes = {};