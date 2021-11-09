import React, { useContext } from "react";
import PropTypes from "prop-types";
import { DialogToastContext } from "contexts/DialogToastContext";
import HorizontalDataBlocksContainer from "components/common/metrics/data_blocks/horizontal/HorizontalDataBlocksContainer";
import ThreeLineDataBlockNoFocusBase from "components/common/metrics/data_blocks/base/ThreeLineDataBlockNoFocusBase";
import FullScreenCenterOverlayContainer from "components/common/overlays/center/FullScreenCenterOverlayContainer";
import { faTable } from "@fortawesome/pro-light-svg-icons";
import Col from "react-bootstrap/Col";
import getDate from "date-fns/getDate";
import { statusColors } from "components/insights/charts/charts-views";

function SalesforceCreatePackageDurationDataBlock({ meanData, countData, goalsData }) {
  const getMiddleText = (meanData, countData) => {
    if (meanData && countData) {
      return meanData + " min | " + countData + " runs";
    }
    if (meanData) {
      return meanData + " min | 0";
    }
    return "No runs";
  };

  const getMiddleStyle = (meanData, goalsData) => {
    if (!meanData || !goalsData || goalsData == 0) {
      return;
    }
    if (goalsData > meanData) {
      return { color: statusColors.success };
    }
    if (goalsData < meanData) {
      return { color: statusColors.danger };
    }
    if (goalsData == meanData) {
      return { color: statusColors.warning };
    }
  };

  return (
    <ThreeLineDataBlockNoFocusBase
      topText={"Package Creation"}
      middleText={getMiddleText(meanData, countData)}
      bottomText={goalsData ? "Goal: " + goalsData + " min" : ""}
      middleStyle={getMiddleStyle(meanData, goalsData)}
    />
  );
}

SalesforceCreatePackageDurationDataBlock.propTypes = {
  meanData: PropTypes.number,
  countData: PropTypes.number,
  goalsData: PropTypes.number,
};

export default SalesforceCreatePackageDurationDataBlock;
