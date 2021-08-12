import React from "react";
import PropTypes from "prop-types";
import EllipsisIcon from "components/common/icons/general/EllipsisIcon";
import DetailViewLinkIcon from "components/common/icons/link/DetailViewLinkIcon";
import ClearDataIcon from "components/common/icons/field/ClearDataIcon";

function InputLabel(
  {
    field,
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
  }) {
  const getFormattedLabel = () => {
    return (
      <label><span>{field?.label}{field?.isRequired ? <span className="danger-red">*</span> : null}</span></label>
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
          <DetailViewLinkIcon
            openInNewWindow={true}
            linkTooltipText={linkTooltipText}
            className={"ml-1 view-details-icon"}
            pageLink={detailViewLink}
            icon={linkIcon}
          />
          <EllipsisIcon
            overlay={infoOverlay}
            className={"ml-1 mt-auto"}
          />
          <ClearDataIcon
            requireConfirmation={requireClearDataConfirmation}
            clearValueFunction={clearDataFunction}
            clearDataDetails={clearDataDetails}
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
};

export default InputLabel;