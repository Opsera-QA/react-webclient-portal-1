import React from "react";
import PropTypes from "prop-types";
import InputTitleBar from "components/common/inputs/info_text/InputTitleBar";

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
  }) {
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
      <div className={"content-container"}>
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
};

export default InfoContainer;