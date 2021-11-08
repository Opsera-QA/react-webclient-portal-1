import React, { useContext } from "react";
import PropTypes from "prop-types";
import { DialogToastContext } from "contexts/DialogToastContext";
import HorizontalDataBlocksContainer from "components/common/metrics/data_blocks/horizontal/HorizontalDataBlocksContainer";
import ThreeLineDataBlockNoFocusBase from "components/common/metrics/data_blocks/base/ThreeLineDataBlockNoFocusBase";
import FullScreenCenterOverlayContainer from "components/common/overlays/center/FullScreenCenterOverlayContainer";
import { faTable } from "@fortawesome/pro-light-svg-icons";
import Col from "react-bootstrap/Col";
import getDate from "date-fns/getDate";

function SalesforceCreatePackageDurationDataBlock({ meanData, countData, goalsData }) {
  return (
    <ThreeLineDataBlockNoFocusBase
      topText={"Package Creation"}
      middleText={meanData ? meanData + " min | " + countData + " runs" : "N/A | 0"}
      bottomText={goalsData ? "Goal: " + goalsData + " min" : ""}
    />
  );
}

SalesforceCreatePackageDurationDataBlock.propTypes = {
  meanData: PropTypes.number,
  countData: PropTypes.number,
  goalsData: PropTypes.object,
};

export default SalesforceCreatePackageDurationDataBlock;
