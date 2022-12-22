import React from "react";
import PropTypes from "prop-types";
import EllipsisIcon from "components/common/icons/general/EllipsisIcon";
import DetailViewLinkIcon from "components/common/icons/link/DetailViewLinkIcon";
import ClearDataIcon from "components/common/icons/field/ClearDataIcon";
import { hasStringValue } from "components/common/helpers/string-helpers";
import HelpInfoOverlayIcon from "components/common/icons/general/HelpInfoOverlayIcon";
import LaunchHelpIcon from "components/common/icons/help/LaunchHelpIcon";
import ReloadDataIcon from "components/common/icons/reload/ReloadDataIcon";
import EnableEditingIcon from "components/common/icons/enable/EnableEditingIcon";
import SelectAllIcon from "components/common/icons/field/SelectAllIcon";

function InputLabel(
  {
    field,
    model,
    clearDataFunction,
    enableEditingFunction,
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
    hasError,
    helpTooltipText,
    loadDataFunction,
    disabled,
    isLoading,
    ellipsisOnClickFunction,
    selectAllFunction,
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

    if (hasStringValue(helpTooltipText) === true) {
      return (
        <HelpInfoOverlayIcon
          infoOverlay={helpTooltipText}
          title={`${field?.label} Help`}
          className={"ml-1 view-details-icon"}
          overlayPlacement={"top"}
          overlayHeight={100}
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
      <label className={hasError === true ? "danger-red" : ""}>
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
            onClickFunction={ellipsisOnClickFunction}
            tooltipText={ellipsisTooltipText}
            className={"ml-1 view-details-icon"}
          />
          <EnableEditingIcon
            enableEditingFunction={enableEditingFunction}
            disabled={disabled}
            isLoading={isLoading}
            className={"ml-2 my-auto"}
          />
          <ReloadDataIcon
            loadDataFunction={loadDataFunction}
            disabled={disabled}
            isLoading={isLoading}
            className={"ml-2 my-auto"}
          />
          <SelectAllIcon
            selectAllFunction={selectAllFunction}
            className={"ml-2 my-auto"}
            disabled={disabled || isLoading}
          />
          <ClearDataIcon
            requireConfirmation={requireClearDataConfirmation}
            clearValueFunction={clearDataFunction}
            furtherDetails={clearDataDetails}
            className={"ml-2 my-auto"}
            disabled={disabled || isLoading}
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
  enableEditingFunction: PropTypes.func,
  requireClearDataConfirmation: PropTypes.bool,
  clearDataDetails: PropTypes.any,
  extraActionButtons: PropTypes.any,
  linkIcon: PropTypes.object,
  ellipsisTooltipText: PropTypes.string,
  inputHelpOverlay: PropTypes.any,
  hasError: PropTypes.bool,
  helpTooltipText: PropTypes.string,
  loadDataFunction: PropTypes.bool,
  disabled: PropTypes.bool,
  isLoading: PropTypes.bool,
  ellipsisOnClickFunction: PropTypes.func,
  selectAllFunction: PropTypes.func,
};

export default InputLabel;