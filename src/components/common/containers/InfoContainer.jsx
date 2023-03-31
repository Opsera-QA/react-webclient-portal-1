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
    minimumWidth,
    maximumWidth,
    loadDataFunction,
    backgroundColor,
    field,
    bodyClassName,
    overflowY,
  }) {
  const getBodyStyling = () => {
    const styling = {};

    if (hasStringValue(backgroundColor) === true) {
      styling.backgroundColor = backgroundColor;
    }

    styling.minHeight = minimumHeight;
    styling.maxHeight = maximumHeight;
    styling.minWidth = minimumWidth;
    styling.maxWidth = maximumWidth;

    if (hasStringValue(minimumHeight) === true && hasStringValue(maximumHeight) === true) {
      styling.overflowY = overflowY;
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
  minimumWidth: PropTypes.string,
  maximumWidth: PropTypes.string,
  loadDataFunction: PropTypes.func,
  backgroundColor: PropTypes.string,
  field: PropTypes.object,
  bodyClassName: PropTypes.string,
  overflowY: PropTypes.string,
};

InfoContainer.defaultProps = {
  bodyClassName: "content-container",
  overflowY: "auto",
};

export default InfoContainer;