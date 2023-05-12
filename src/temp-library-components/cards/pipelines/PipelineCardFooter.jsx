import React from "react";
import CardFooterBase from "temp-library-components/cards/CardFooterBase";
import useComponentStateReference from "hooks/useComponentStateReference";
import PropTypes from "prop-types";
import {pipelineHelper} from "components/workflow/pipeline.helper";

export default function PipelineCardFooter({ pipelineModel }) {
  const { themeConstants } = useComponentStateReference();

  return (
    <CardFooterBase
      backgroundColor={pipelineHelper.getPipelineColor(pipelineModel, themeConstants)}
      color={themeConstants.COLOR_PALETTE.WHITE}
      text={"Pipeline"}
    />
  );
}

PipelineCardFooter.propTypes = {
  pipelineModel: PropTypes.object,
};
