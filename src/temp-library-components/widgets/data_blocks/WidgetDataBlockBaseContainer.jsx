import React from "react";
import PropTypes from "prop-types";
import { numberHelpers } from "components/common/helpers/number/number.helpers";
import { hasStringValue } from "components/common/helpers/string-helpers";
import { mouseHelper } from "temp-library-components/helpers/mouse.helper";
import FilterTitleBar from "components/common/table/FilterTitleBar";
import { widgetHelper } from "temp-library-components/helpers/widget.helper";

function WidgetDataBlockBaseContainer(
  {
    title,
    titleIcon,
    heightSize,
    widthSize,
    disabledBackgroundColor,
    backgroundColor,
    borderColor,
    fontColor,
    disabledFontColor,
    fontFamily,
    children,
    className,
    onClickFunction,
    disabled,
    isLoading,
  }) {
  const getHeight = () => {
    return widgetHelper.getWidgetPixelSize(heightSize, 2);
  };

  const getWidth = () => {
    if (numberHelpers.isNumberGreaterThan(0, widthSize)) {
      return widgetHelper.getWidgetPixelSize(widthSize, 2);
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

  const getBody = () => {
    if (title) {
      return (
        <div className={"filter-container"}>
          <div className={"w-100 p-2 d-flex filter-container-content-block-header"}>
            <FilterTitleBar
              isLoading={isLoading}
              title={title}
              titleIcon={titleIcon}
            />
          </div>
          {children}
        </div>
      );
    }

    return children;
  };

  const getBackgroundColor = () => {
    if (disabled === true) {
      return disabledBackgroundColor;
    }

    if (backgroundColor) {
      return backgroundColor;
    }
  };

  const getFontColor = () => {
    if (disabled === true) {
      return disabledFontColor;
    }

    if (fontColor) {
      return fontColor;
    }
  };

  return (
    <div
      className={getClassNames()}
      onClick={handleOnClickFunction}
      style={{
        boxShadow: "0 0 40px rgba(0, 0, 0, 0.075)",
        height: getHeight(),
        maxHeight: getHeight(),
        minWidth: getWidth(),
        width: getWidth(),
        maxWidth: getWidth(),
        border: getBorder(),
        backgroundColor: getBackgroundColor(),
        color: fontColor,
        fontFamily: fontFamily,
        cursor: mouseHelper.getMouseCursor(onClickFunction, disabled),
      }}
    >
      {getBody()}
    </div>
  );
}

WidgetDataBlockBaseContainer.propTypes = {
  className: PropTypes.string,
  heightSize: PropTypes.number,
  widthSize: PropTypes.number,
  borderColor: PropTypes.string,
  backgroundColor: PropTypes.string,
  disabledBackgroundColor: PropTypes.string,
  fontColor: PropTypes.string,
  disabledFontColor: PropTypes.string,
  fontFamily: PropTypes.string,
  children: PropTypes.any,
  onClickFunction: PropTypes.func,
  disabled: PropTypes.bool,
  title: PropTypes.any,
  titleIcon: PropTypes.object,
  isLoading: PropTypes.bool,
};

WidgetDataBlockBaseContainer.defaultProps = {
  heightSize: 2,
  backgroundColor: "#FFFFFF",
  disabledBackgroundColor: "#E5E5E5",
};

export default WidgetDataBlockBaseContainer;
