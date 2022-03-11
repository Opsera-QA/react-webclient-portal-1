import React from "react";
import PropTypes from "prop-types";
import {Row} from "react-bootstrap";
import TooltipWrapper from "components/common/tooltip/TooltipWrapper";
import {dataPointHelpers} from "components/common/helpers/metrics/data_point/dataPoint.helpers";

// TODO: Styling is temporary based on SonarRatings until we figure out which direction to go
function HorizontalDataBlocksContainer(
  {
    children,
    onClick,
    tooltipText,
    title,
    className,
    dataPoint,
  }) {
  if (dataPointHelpers.isDataPointVisible(dataPoint) === false) {
    return null;
  }

  return (
    <TooltipWrapper innerText={tooltipText}>
      <div className={className}>
        <div className={"mx-1 light-gray-text-secondary font-inter-light-400 metric-block-header-text"}>
          {title}
        </div>
        <div className={`${onClick ? "pointer " : ""}data-block-container m-1`} onClick={onClick}>
          <Row className={"m-1 py-2"}>
            {children}
          </Row>
        </div>
      </div>
    </TooltipWrapper>
  );
}

HorizontalDataBlocksContainer.propTypes = {
  children: PropTypes.any,
  onClick: PropTypes.func,
  tooltipText: PropTypes.any,
  title: PropTypes.string,
  className: PropTypes.string,
  dataPoint: PropTypes.object,
};

export default HorizontalDataBlocksContainer;