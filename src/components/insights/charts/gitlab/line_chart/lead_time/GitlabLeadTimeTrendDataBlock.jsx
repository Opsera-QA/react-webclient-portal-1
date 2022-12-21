import React from "react";
import PropTypes from "prop-types";
import DataBlockBoxContainer from "components/common/metrics/data_blocks/DataBlockBoxContainer";
import ThreeLineDataBlockBase from "../../../../../common/metrics/data_blocks/base/ThreeLineDataBlockBase";
import TooltipWrapper from "../../../../../common/tooltip/TooltipWrapper";
import {getQualityBasedClassName} from "../../../charts-helpers";
import {dataPointHelpers} from "../../../../../common/helpers/metrics/data_point/dataPoint.helpers";

function GitlabLeadTimeTrendDataBlock({
  value,
  prevValue,
  trend,
  getTrendIcon,
  topText,
  bottomText,
  toolTipText,
  dataPoint,
  dataPointValue,
}) {
  let qualityLevel;
  if(dataPoint && dataPointValue) {
    qualityLevel = dataPointHelpers.evaluateDataPointQualityLevel(dataPoint, dataPointValue);
  }
  return (
    <DataBlockBoxContainer
      showBorder={true}
      className="h-100"
    >
      <ThreeLineDataBlockBase
        className={`${trend} p-2 h-100`}
        topText={topText}
        icon={getTrendIcon(trend)}
        bottomText={`${bottomText}${prevValue}`}
        middleText={
          <TooltipWrapper innerText={toolTipText}>
           <span className={`${getQualityBasedClassName(qualityLevel)} metric-block-header-text`}>{value}</span>
          </TooltipWrapper>
        }
        dataPoint={dataPoint}
      />
    </DataBlockBoxContainer>
  );
}

GitlabLeadTimeTrendDataBlock.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  prevValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  trend: PropTypes.string,
  getTrendIcon: PropTypes.func,
  topText: PropTypes.string,
  bottomText: PropTypes.string,
  toolTipText: PropTypes.string,
  dataPoint: PropTypes.any,
  dataPointValue:  PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default GitlabLeadTimeTrendDataBlock;
