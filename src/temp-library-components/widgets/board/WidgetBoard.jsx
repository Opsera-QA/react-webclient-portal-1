import React from "react";
import PropTypes from "prop-types";
import { numberHelpers } from "components/common/helpers/number/number.helpers";
import { hasStringValue } from "components/common/helpers/string-helpers";

function WidgetBoard(
  {
    heightSize,
    backgroundColor,
    borderColor,
    fontColor,
    fontFamily,
    widgets,
    className,
  }) {
  const getHeight = () => {
    if (numberHelpers.isNumberGreaterThan(0, heightSize)) {
      return `${heightSize * 50}px`;
    }

    return "100px";
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
        border: getBorder(),
        backgroundColor: backgroundColor,
        color: fontColor,
        fontFamily: fontFamily,
      }}
    >
      {/*{children}*/}
    </div>
  );
}

WidgetBoard.propTypes = {
  className: PropTypes.string,
  heightSize: PropTypes.number,
  widthSize: PropTypes.string,
  borderColor: PropTypes.string,
  backgroundColor: PropTypes.string,
  fontColor: PropTypes.string,
  fontFamily: PropTypes.string,
  widgets: PropTypes.any,
};

WidgetBoard.defaultProps = {
  heightSize: 2,
};

export default WidgetBoard;
