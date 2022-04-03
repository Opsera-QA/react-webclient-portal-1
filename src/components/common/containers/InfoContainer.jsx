import React from "react";
import PropTypes from "prop-types";
import InputTitleBar from "components/common/inputs/info_text/InputTitleBar";
import {hasStringValue} from "components/common/helpers/string-helpers";

function InfoContainer(
  {
    children,
    isLoading,
    titleIcon,
    titleText,
    titleClassName,
    titleRightSideButton,
    helpComponent,
    className,
    minimumHeight,
    maximumHeight,
  }) {
  const getBodyStyling = () => {
    if (hasStringValue(minimumHeight) === true && hasStringValue(maximumHeight) === true) {
      return ({
        minHeight: minimumHeight,
        maxHeight: maximumHeight,
        overflowY: "auto",
      });
    }
  };

  return (
    <div className={className}>
      <InputTitleBar
        customTitle={titleText}
        icon={titleIcon}
        helpComponent={helpComponent}
        isLoading={isLoading}
        className={titleClassName}
        rightSideButton={titleRightSideButton}
      />
      <div
        className={"content-container"}
        style={getBodyStyling()}
      >
        {children}
      </div>
    </div>
  );
}

InfoContainer.propTypes = {
  titleIcon: PropTypes.object,
  titleText: PropTypes.string,
  titleClassName: PropTypes.string,
  children: PropTypes.any,
  helpComponent: PropTypes.any,
  isLoading: PropTypes.bool,
  className: PropTypes.string,
  titleRightSideButton: PropTypes.object,
  minimumHeight: PropTypes.string,
  maximumHeight: PropTypes.string,
};

export default InfoContainer;