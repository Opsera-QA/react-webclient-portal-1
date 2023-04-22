import React from "react";
import PropTypes from "prop-types";
import { numberHelpers } from "components/common/helpers/number/number.helpers";
import { hasStringValue } from "components/common/helpers/string-helpers";
import { mouseHelper } from "temp-library-components/helpers/mouse/mouse.helper";
import FilterTitleBar from "components/common/table/FilterTitleBar";
import { widgetHelper } from "temp-library-components/helpers/widgets/widget.helper";
import WidgetTitleBar from "temp-library-components/widgets/data_blocks/WidgetTitleBar";

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
    rightSideTitleBarItems,
    centerTitleBarItems,
    titleBarClassName,
  }) {
  const getHeight = () => {
    if (numberHelpers.isNumberGreaterThan(0, heightSize)) {
      return widgetHelper.getWidgetPixelSize(heightSize, 2);
    }
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

    if (hasStringValue(className) === true) {
      classNames += ` ${className}`;
    }

    return classNames;
  };

  const getTitleBarClassNames = () => {
    let classNames = `w-100 d-flex`;

    if (hasStringValue(titleBarClassName) === true) {
      classNames += ` ${titleBarClassName}`;
    }

    return classNames;
  };

  const getBody = () => {
    if (title) {
      return (
        <>
          <div className={getTitleBarClassNames()}>
            <WidgetTitleBar
              isLoading={isLoading}
              title={title}
              titleIcon={titleIcon}
              middleComponents={centerTitleBarItems}
              rightSideComponents={rightSideTitleBarItems}
            />
          </div>
          {children}
        </>
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
        boxShadow: "0 0 40px rgba(0, 0, 0, 0.175)",
        minHeight: getHeight(),
        // maxHeight: getHeight(),
        minWidth: getWidth(),
        width: getWidth(),
        maxWidth: getWidth(),
        border: getBorder(),
        borderRadius: "1rem",
        overflow: "hidden",
        backgroundColor: getBackgroundColor(),
        color: getFontColor(),
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
  rightSideTitleBarItems: PropTypes.any,
  centerTitleBarItems: PropTypes.any,
  titleBarClassName: PropTypes.string,
};

WidgetDataBlockBaseContainer.defaultProps = {
  backgroundColor: "#FFFFFF",
  disabledBackgroundColor: "#E5E5E5",
  titleBarClassName: "px-3 pt-2",
};

export default WidgetDataBlockBaseContainer;
