import React from "react";
import PropTypes from "prop-types";
import { numberHelpers } from "components/common/helpers/number/number.helpers";
import { hasStringValue } from "components/common/helpers/string-helpers";

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

  return (
    <div
      className={className}
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
};

WidgetDataBlockBaseContainer.defaultProps = {
  heightSize: 2,
};

export default WidgetDataBlockBaseContainer;
