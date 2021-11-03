import React, {useContext} from "react";
import PropTypes from "prop-types";
import { DialogToastContext } from "contexts/DialogToastContext";
import HorizontalDataBlocksContainer from "components/common/metrics/data_blocks/horizontal/HorizontalDataBlocksContainer";
import ThreeLineDataBlockNoFocusBase from "components/common/metrics/data_blocks/base/ThreeLineDataBlockNoFocusBase";
import FullScreenCenterOverlayContainer from "components/common/overlays/center/FullScreenCenterOverlayContainer";
import { faTable } from "@fortawesome/pro-light-svg-icons";
import Col from "react-bootstrap/Col";
import getDate from "date-fns/getDate";

function SalesforceBackupDurationDataBlock({dataBlockValues, goalsData}) {

  return (
    <ThreeLineDataBlockNoFocusBase
    topText={"Backups"}
    middleText={dataBlockValues[0]?.backup_mean ? dataBlockValues[0]?.backup_mean + " min | " + dataBlockValues[0]?.backup_count + " runs" : "N/A | 0"}
  />
  );
}

SalesforceBackupDurationDataBlock.propTypes = {
    dataBlockValues: PropTypes.array,
    goalsData: PropTypes.object
};

export default SalesforceBackupDurationDataBlock;
