import React, {useContext} from 'react';
import PropTypes from "prop-types";
import {Button} from "react-bootstrap";
import {faFileCode} from "@fortawesome/free-solid-svg-icons";
import AnchoreSecurityReportOverlay from "components/blueprint/security_reports/anchore/AnchoreSecurityReportOverlay";
import TwistlockSecurityReportOverlay from "components/blueprint/security_reports/twistlock/TwistlockSecurityReportOverlay";
import AquasecSecurityReportOverlay from "components/blueprint/security_reports/aquasec/AquasecSecurityReportOverlay";
import BlackduckSecurityReportOverlay from "components/blueprint/security_reports/blackduck/BlackduckSecurityReportOverlay";
import CoveritySecurityReportOverlay from "components/blueprint/security_reports/coverity/CoveritySecurityReportOverlay";
import SnykSecurityReportOverlay from "components/blueprint/security_reports/snyk/SnykSecurityReportOverlay";
import SonarSecurityReportOverlay from "components/blueprint/security_reports/sonar/SonarSecurityReportOverlay";
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
    } else if (logData?.aquasec) {
      toastContext.showOverlayPanel(
        <AquasecSecurityReportOverlay
          aquasecSecurityVulnerabilities={logData?.aquasec}
          stats={logData.aquasecStats}
        />
      );
    } else if (logData?.blackduck) {
      toastContext.showOverlayPanel(
        <BlackduckSecurityReportOverlay
          blackduckSecurityVulnerabilities={logData?.blackduck}
          stats={logData.blackduckStats}
        />
      );
    } else if (logData?.coverity) {
      toastContext.showOverlayPanel(
        <CoveritySecurityReportOverlay
          coveritySecurityVulnerabilities={logData?.coverity}
          stats={logData.coverityStats}
        />
      );
    } else if (logData?.snyk) {
      toastContext.showOverlayPanel(
        <SnykSecurityReportOverlay
          snykSecurityVulnerabilities={logData?.snyk}
          stats={logData.snykStats}
        />
      );
    } else if (logData?.sonar) {
      toastContext.showOverlayPanel(
        <SonarSecurityReportOverlay
          sonarSecurityVulnerabilities={logData?.sonar}
          stats={logData.sonarStats}
        />
      );
    }
    
  };

  if (!logData?.anchore && !logData?.twistlock && !logData?.aquasec && 
      !logData?.blackduck && !logData?.coverity && !logData?.snyk && 
      !logData?.sonar) 
  {
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
