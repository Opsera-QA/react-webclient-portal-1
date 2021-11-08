import React, { useContext } from "react";
import PropTypes from "prop-types";
import { DialogToastContext } from "contexts/DialogToastContext";
import HorizontalDataBlocksContainer from "components/common/metrics/data_blocks/horizontal/HorizontalDataBlocksContainer";
import ThreeLineDataBlockNoFocusBase from "components/common/metrics/data_blocks/base/ThreeLineDataBlockNoFocusBase";
import FullScreenCenterOverlayContainer from "components/common/overlays/center/FullScreenCenterOverlayContainer";
import { faTable } from "@fortawesome/pro-light-svg-icons";
import Col from "react-bootstrap/Col";
import getDate from "date-fns/getDate";

function SalesforceProfileMigrationDurationDataBlock({ meanData, countData }) {
  return (
    <ThreeLineDataBlockNoFocusBase
      topText={"Profile Migration"}
      middleText={meanData ? meanData + " min | " + countData + " runs" : "N/A | 0"}
    />
  );
}

SalesforceProfileMigrationDurationDataBlock.propTypes = {
  meanData: PropTypes.number,
  countData: PropTypes.number,
};

export default SalesforceProfileMigrationDurationDataBlock;
