import React from "react";
import PropTypes from "prop-types";
import TwoLineScoreDataBlock from "components/common/metrics/score/TwoLineScoreDataBlock";
import DataBlockBoxContainer from "components/common/metrics/data_blocks/DataBlockBoxContainer";
import TooltipWrapper from "components/common/tooltip/TooltipWrapper";
import { truncateString } from "components/common/helpers/string-helpers";

function GitlabPipelineInsightsDataBlock({ displayValue, displayText, icon, truncateLength }) {
  const shouldTruncate = truncateLength > 0 && displayValue && displayValue.length > truncateLength;
  const formattedDisplayValue = shouldTruncate ? truncateString(displayValue, truncateLength) : displayValue;

  const dataBlock = (
    <DataBlockBoxContainer showBorder={true} className="w-100">
      <TwoLineScoreDataBlock
        icon={icon}
        score={formattedDisplayValue}
        subtitle={displayText}
      />
    </DataBlockBoxContainer>
  );

  if (shouldTruncate) {
    return (
     <TooltipWrapper innerText={displayValue}>
       <div className="w-100">
         {dataBlock}
       </div>
     </TooltipWrapper>
    );
   }
 
   return dataBlock;
}

GitlabPipelineInsightsDataBlock.propTypes = {
  displayValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  displayText: PropTypes.string,
  icon: PropTypes.object,
  truncateLength: PropTypes.number
};

GitlabPipelineInsightsDataBlock.defaultProps = {
  truncateLength: 0
};

export default GitlabPipelineInsightsDataBlock;
