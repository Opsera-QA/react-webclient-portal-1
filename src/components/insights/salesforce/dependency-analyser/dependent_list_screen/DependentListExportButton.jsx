import React from "react";
import PropTypes from "prop-types";
import "jspdf-autotable";
import ExportDataButtonBase from "components/common/modal/export_data/ExportDataButtonBase";
import useComponentStateReference from "hooks/useComponentStateReference";
import ExportDependencyListOverlay from "./ExportDependencyListOverlay";

export default function DependentListExportButton(
  {
    className,
    dataModel,
    isLoading,
  }) {
  const {
    toastContext,
  } = useComponentStateReference();

  const launchOverlayFunction = () => {
    toastContext.showOverlayPanel(
      <ExportDependencyListOverlay
        dataModel={dataModel}
      />,
    );
  };

  return (
    <ExportDataButtonBase
      isLoading={isLoading}
      className={className}
      launchOverlayFunction={launchOverlayFunction}
    />
  );
}

DependentListExportButton.propTypes = {
  className: PropTypes.string,
  dataModel: PropTypes.object,
  isLoading: PropTypes.bool,
};