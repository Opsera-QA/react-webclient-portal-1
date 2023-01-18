import React, { useContext } from "react";
import PropTypes from "prop-types";
import "jspdf-autotable";
import { DialogToastContext } from "contexts/DialogToastContext";
import ExportDataButtonBase from "components/common/modal/export_data/ExportDataButtonBase";
import ExportApigeeDataOverlay from "./ExportApigeeDataOverlay";

function ExportApigeeDetailsButton({ className, isLoading, kpiConfiguration, dashboardTags, filterDto, pipelineId }) {

  const toastContext = useContext(DialogToastContext);

  const launchOverlayFunction = () => {
    toastContext.showOverlayPanel(
      <ExportApigeeDataOverlay
        kpiConfiguration={kpiConfiguration}
        dashboardTags={dashboardTags}
        filterDto={filterDto}
        pipelineId={pipelineId}
      />
    );
  };

  return (
    <ExportDataButtonBase
      className={className}
      isLoading={isLoading}
      launchOverlayFunction={launchOverlayFunction}
    />
  );
}

ExportApigeeDetailsButton.propTypes = {
  className: PropTypes.string,
  isLoading: PropTypes.bool,
  kpiConfiguration: PropTypes.object,
  dashboardTags: PropTypes.array,
  filterDto: PropTypes.object,
  pipelineId: PropTypes.string,
};

export default ExportApigeeDetailsButton;
