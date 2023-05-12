import React from "react";
import useComponentStateReference from "hooks/useComponentStateReference";
import PropTypes from "prop-types";
import {pipelineHelper} from "components/workflow/pipeline.helper";
import CenteredContentWrapper from "components/common/wrapper/CenteredContentWrapper";

export default function PipelineFooter({ pipelineModel }) {
  const { themeConstants } = useComponentStateReference();
  const color = pipelineHelper.getPipelineColor(pipelineModel, themeConstants);

  if (pipelineModel == null) {
    return null;
  }

  return (
    <div
      style={{
        backgroundColor: color,
        color: themeConstants.COLOR_PALETTE.WHITE,
      }}
      className={"py-1 overlay-footer"}
    >
      <CenteredContentWrapper>
        <span>Pipeline</span>
      </CenteredContentWrapper>
    </div>
  );
}

PipelineFooter.propTypes = {
  pipelineModel: PropTypes.object,
};
