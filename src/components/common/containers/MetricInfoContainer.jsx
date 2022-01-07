import React from "react";
import PropTypes from "prop-types";
import InputTitleBar from "components/common/inputs/info_text/InputTitleBar";

function MetricInfoContainer(
  {
    children,
    isLoading,
    titleIcon,
    titleText,
    helpComponent,
    className
  }) {

  return (
    <div className={className}>
      <div className={"metric-info-container"}>
        <InputTitleBar
          customTitle={titleText}
          icon={titleIcon}
          helpComponent={helpComponent}
          isLoading={isLoading}
          className={"metric-title-bar"}
        />
        <div className={"metric-info-container-body"}>
          {children}
        </div>
      </div>
    </div>
  );
}

MetricInfoContainer.propTypes = {
  titleIcon: PropTypes.object,
  titleText: PropTypes.string,
  children: PropTypes.any,
  helpComponent: PropTypes.any,
  isLoading: PropTypes.bool,
  className: PropTypes.string,
};

export default MetricInfoContainer;