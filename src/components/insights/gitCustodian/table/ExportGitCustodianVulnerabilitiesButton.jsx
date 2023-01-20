import React from "react";
import PropTypes from "prop-types";
import "jspdf-autotable";
import ExportGitCustodianVulnerabilitiesDataOverlay
  from "components/insights/gitCustodian/export/ExportGitCustodianVulnerabilitiesDataOverlay";
import ExportDataButtonBase from "../../../common/modal/export_data/ExportDataButtonBase";
import useComponentStateReference from "hooks/useComponentStateReference";

export default function ExportGitCustodianVulnerabilitiesButton(
  {
    className,
    gitCustodianData,
    isLoading,
  }) {
  const {
    toastContext,
  } = useComponentStateReference();

  const launchOverlayFunction = () => {
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
};