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
    loadDataFunction,
    backgroundColor,
    field,
    bodyClassName,
  }) {
  const getBodyStyling = () => {
    const styling = {};

    if (hasStringValue(backgroundColor) === true) {
      styling.backgroundColor = backgroundColor;
    }

    styling.minHeight = minimumHeight;
    styling.maxHeight = maximumHeight;

    if (hasStringValue(minimumHeight) === true && hasStringValue(maximumHeight) === true) {
      styling.overflowY = "auto";
    }

    return styling;
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
        loadDataFunction={loadDataFunction}
        field={field}
      />
      <div
        className={bodyClassName}
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
  loadDataFunction: PropTypes.func,
  backgroundColor: PropTypes.string,
  field: PropTypes.object,
  bodyClassName: PropTypes.string,
};

InfoContainer.defaultProps = {
  bodyClassName: "content-container",
};

export default InfoContainer;