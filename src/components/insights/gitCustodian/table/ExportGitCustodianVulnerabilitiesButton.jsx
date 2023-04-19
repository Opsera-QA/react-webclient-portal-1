import React from "react";
import PropTypes from "prop-types";
import "jspdf-autotable";
import ExportGitCustodianVulnerabilitiesDataOverlay
  from "components/insights/gitCustodian/export/ExportGitCustodianVulnerabilitiesDataOverlay";
import ExportDataButtonBase from "../../../common/modal/export_data/ExportDataButtonBase";
import useComponentStateReference from "hooks/useComponentStateReference";
import InfoOverlayBase from "components/common/overlays/info/InfoOverlayBase";
import {faExclamationTriangle} from "@fortawesome/pro-light-svg-icons";

const DOWNLOAD_LIMIT = 5000;

export default function ExportGitCustodianVulnerabilitiesButton(
  {
    className,
    gitCustodianData,
    isLoading,
    count,
  }) {
  const {
    toastContext,
  } = useComponentStateReference();

  const launchOverlayFunction = () => {
    if (count > DOWNLOAD_LIMIT) {
      toastContext.showOverlayPanel(
        <InfoOverlayBase
          titleText={"Git Custodian Download Limit Exceeded"}
          titleIcon={faExclamationTriangle}
        >
          <div className="mb-2">The Git Custodian Download Report is currently restricted to <strong>{DOWNLOAD_LIMIT}</strong> records.</div>
          <div>Use filter options to optimise results and download.</div>
        </InfoOverlayBase>
      );
      return;
    }
    toastContext.showOverlayPanel(
      <ExportGitCustodianVulnerabilitiesDataOverlay
        gitCustodianData={gitCustodianData}
      />,
    );
  };

  // TODO: Refine when more is complete
  return (
    <ExportDataButtonBase
      isLoading={isLoading}
      className={className}
      launchOverlayFunction={launchOverlayFunction}
    />
  );
}

ExportGitCustodianVulnerabilitiesButton.propTypes = {
  className: PropTypes.string,
  gitCustodianData: PropTypes.object,
  isLoading: PropTypes.bool,
  count: PropTypes.number,
};