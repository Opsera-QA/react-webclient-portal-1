import React from "react";
import CardFooterBase from "temp-library-components/cards/CardFooterBase";
import useComponentStateReference from "hooks/useComponentStateReference";

export default function PipelineCardFooter() {
  const { themeConstants } = useComponentStateReference();

  return (
    <CardFooterBase
      backgroundColor={themeConstants.COLOR_PALETTE.OPSERA_HEADER_PURPLE}
      color={themeConstants.COLOR_PALETTE.WHITE}
      text={"Pipeline"}
    />
  );
}

PipelineCardFooter.propTypes = {};