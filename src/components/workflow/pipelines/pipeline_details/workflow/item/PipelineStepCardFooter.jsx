import React from "react";
import CardFooterBase from "temp-library-components/cards/CardFooterBase";
import useComponentStateReference from "hooks/useComponentStateReference";

export default function PipelineStepCardFooter() {
  const { themeConstants } = useComponentStateReference();

  return (
    <CardFooterBase
      backgroundColor={themeConstants.RESOURCE_COLORS.PIPELINES}
      color={themeConstants.COLOR_PALETTE.WHITE}
      text={"Pipeline Step"}
    />
  );
}

PipelineStepCardFooter.propTypes = {};