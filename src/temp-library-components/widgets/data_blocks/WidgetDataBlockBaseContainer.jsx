import React from "react";
import PropTypes from "prop-types";
import { numberHelpers } from "components/common/helpers/number/number.helpers";
import { hasStringValue } from "components/common/helpers/string-helpers";
import { mouseHelper } from "temp-library-components/helpers/mouse.helper";

function WidgetDataBlockBaseContainer(
  {
    heightSize,
    widthSize,
    backgroundColor,
    borderColor,
    fontColor,
    fontFamily,
    children,
    className,
    onClickFunction,
    disabled,
  }) {
  const getHeight = () => {
    if (numberHelpers.isNumberGreaterThan(0, heightSize)) {
      return `${heightSize * 50}px`;
    }

    return "100px";
  };

  const getWidth = () => {
    if (numberHelpers.isNumberGreaterThan(0, widthSize)) {
      return `${heightSize * 50}px`;
    }
  };

  const getBorder = () => {
    if (hasStringValue(borderColor) === true) {
      return `1px solid ${borderColor}`;
    }
  };

  const handleOnClickFunction = () => {
    if (onClickFunction && disabled !== true) {
      onClickFunction();
    }
  };

  const getClassNames = () => {
    let classNames = ``;
    // let classNames = `widget-data-block-base`; // Enable if we want border color change on hover

    if (hasStringValue(className) === true) {
      classNames += ` ${className}`;
    }

    return classNames;
  };

  return (
    <div
      className={getClassNames()}
      onClick={handleOnClickFunction}
      style={{
        borderRadius: "1em",
        height: getHeight(),
        maxHeight: getHeight(),
        minWidth: getWidth(),
        width: getWidth(),
        maxWidth: getWidth(),
        border: getBorder(),
        backgroundColor: backgroundColor,
        color: fontColor,
        fontFamily: fontFamily,
        cursor: mouseHelper.getMouseCursor(onClickFunction, disabled),
      }}
    >
      {children}
    </div>
  );
}

WidgetDataBlockBaseContainer.propTypes = {
  className: PropTypes.string,
  heightSize: PropTypes.number,
  widthSize: PropTypes.number,
  borderColor: PropTypes.string,
  backgroundColor: PropTypes.string,
  fontColor: PropTypes.string,
  fontFamily: PropTypes.string,
  children: PropTypes.any,
  onClickFunction: PropTypes.func,
  disabled: PropTypes.bool,
};

WidgetDataBlockBaseContainer.defaultProps = {
  heightSize: 2,
};

export default WidgetDataBlockBaseContainer;
