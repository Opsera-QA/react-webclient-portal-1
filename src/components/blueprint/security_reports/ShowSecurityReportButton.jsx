import React, {useContext} from 'react';
import PropTypes from "prop-types";
import {Button} from "react-bootstrap";
import {faFileCode} from "@fortawesome/free-solid-svg-icons";
import AnchoreSecurityReportOverlay from "components/blueprint/security_reports/anchore/AnchoreSecurityReportOverlay";
import TwistlockSecurityReportOverlay from "components/blueprint/security_reports/twistlock/TwistlockSecurityReportOverlay";
import {DialogToastContext} from "contexts/DialogToastContext";
import IconBase from "components/common/icons/IconBase";

function ShowSecurityReportButton({logData}) {
  const toastContext = useContext(DialogToastContext);

  const showSecurityReport = () => {
    if (logData?.anchore) {
      toastContext.showOverlayPanel(
        <AnchoreSecurityReportOverlay
          anchoreSecurityVulnerabilities={logData?.anchore}
          stats={logData.anchoreStats}
        />
      );
    } else if (logData?.twistlock) {
      toastContext.showOverlayPanel(
        <TwistlockSecurityReportOverlay
          twistlockSecurityReportVulnerabilities={logData?.twistlock}
          stats={logData.twistlockStats}
        />
      );
    }
  };

  if (!logData?.anchore && !logData?.twistlock) {
    return null;
  }

  return (
    <Button
      variant="outline-dark "
      className="ml-2"
      size="sm"
      onClick={() => {
        showSecurityReport();
      }}
    >
      <IconBase icon={faFileCode} className={"mr-1"}/>
      Security Report
    </Button>
  );
}

ShowSecurityReportButton.propTypes = {
  logData: PropTypes.object,
};

export default ShowSecurityReportButton;
