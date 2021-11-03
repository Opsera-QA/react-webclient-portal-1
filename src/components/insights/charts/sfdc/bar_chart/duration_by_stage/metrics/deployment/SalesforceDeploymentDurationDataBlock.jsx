import React, {useContext} from "react";
import PropTypes from "prop-types";
import { DialogToastContext } from "contexts/DialogToastContext";
import HorizontalDataBlocksContainer from "components/common/metrics/data_blocks/horizontal/HorizontalDataBlocksContainer";
import ThreeLineDataBlockNoFocusBase from "components/common/metrics/data_blocks/base/ThreeLineDataBlockNoFocusBase";
import FullScreenCenterOverlayContainer from "components/common/overlays/center/FullScreenCenterOverlayContainer";
import { faTable } from "@fortawesome/pro-light-svg-icons";
import Col from "react-bootstrap/Col";
import getDate from "date-fns/getDate";

function SalesforceDeploymentDurationDataBlock({dataBlockValues, goalsData}) {

  return (
    <ThreeLineDataBlockNoFocusBase
    topText={"Deployment"}
    middleText={dataBlockValues[0]?.deploy_mean ? dataBlockValues[0]?.deploy_mean + " min | " + dataBlockValues[0]?.deploy_count + " runs" : "N/A | 0"}
    bottomText={goalsData?.average_deployments ? "Goal: " + goalsData?.average_deployments + " min" : ""}
  />
  );
}

SalesforceDeploymentDurationDataBlock.propTypes = {
    dataBlockValues: PropTypes.array,
    goalsData: PropTypes.object
};

export default SalesforceDeploymentDurationDataBlock;
