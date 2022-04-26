import React from "react";
import PropTypes from "prop-types";
import EllipsisIcon from "components/common/icons/general/EllipsisIcon";
import DetailViewLinkIcon from "components/common/icons/link/DetailViewLinkIcon";
import ClearDataIcon from "components/common/icons/field/ClearDataIcon";
import { hasStringValue } from "components/common/helpers/string-helpers";
import HelpInfoOverlayIcon from "components/common/icons/general/HelpInfoOverlayIcon";
import LaunchHelpIcon from "components/common/icons/help/LaunchHelpIcon";
import AzureDevopsPipelineStepConfigurationHelpDocumentation
  from "components/common/help/documentation/pipelines/step_configuration/AzureDevopsPipelineStepConfigurationHelpDocumentation";

function InputLabel(
  {
    field,
    model,
    clearDataFunction,
    requireClearDataConfirmation,
    linkTooltipText,
    detailViewLink,
    clearDataDetails,
    infoOverlay,
    className,
    extraActionButtons,
    showLabel,
    linkIcon,
    ellipsisTooltipText,
    inputHelpOverlay,
  }) {
  const getInputHelpIcon = () => {
    if (inputHelpOverlay != null) {
      return (
        <LaunchHelpIcon
          className={"ml-1 view-details-icon"}
          helpComponent={inputHelpOverlay}
        />
      );
    }

    const fieldHelpTooltipText = field?.helpTooltipText;

    if (hasStringValue(fieldHelpTooltipText) === true) {
      return (
        <HelpInfoOverlayIcon
          infoOverlay={fieldHelpTooltipText}
          title={`${field?.label} Help`}
          className={"ml-1 view-details-icon"}
          overlayPlacement={"top"}
        />
      );
    }
  };

  const getRequiredAsterisk = () => {
    if (field?.isRequired || (model && field?.isRequiredFunction && field?.isRequiredFunction(model) === true)) {
      return (<span className="danger-red">*</span>);
    }
  };

  const getFormattedLabel = () => {
    return (
      <label>
        <span>{field?.label}{getRequiredAsterisk()}</span>
      </label>
    );
  };

  if (showLabel === false) {
    return null;
  }

  return (
    <div className={className}>
      <div className="d-flex justify-content-between">
        <div>{getFormattedLabel()}</div>
        <div className={"d-flex"}>
          {getInputHelpIcon()}
          <DetailViewLinkIcon
            openInNewWindow={true}
            linkTooltipText={linkTooltipText}
            className={"ml-1 view-details-icon"}
            pageLink={detailViewLink}
            icon={linkIcon}
          />
          <EllipsisIcon
            overlay={infoOverlay}
            tooltipText={ellipsisTooltipText}
            className={"ml-1 view-details-icon"}
          />
          <ClearDataIcon
            requireConfirmation={requireClearDataConfirmation}
            clearValueFunction={clearDataFunction}
            furtherDetails={clearDataDetails}
            className={"ml-2"}
          />
          {extraActionButtons}
        </div>
      </div>
    </div>
  );
}

InputLabel.propTypes = {
  field: PropTypes.object,
  model: PropTypes.object,
  className: PropTypes.string,
  showLabel: PropTypes.bool,
  infoOverlay: PropTypes.any,
  detailViewLink: PropTypes.string,
  linkTooltipText: PropTypes.string,
  clearDataFunction: PropTypes.func,
  requireClearDataConfirmation: PropTypes.bool,
  clearDataDetails: PropTypes.any,
  extraActionButtons: PropTypes.any,
  linkIcon: PropTypes.object,
  ellipsisTooltipText: PropTypes.string,
  inputHelpOverlay: PropTypes.any,
};

export default InputLabel;