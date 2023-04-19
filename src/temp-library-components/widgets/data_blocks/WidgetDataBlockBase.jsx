import React from "react";
import PropTypes from "prop-types";
import WidgetDataBlockBaseContainer from "temp-library-components/widgets/data_blocks/WidgetDataBlockBaseContainer";
import useComponentStateReference from "hooks/useComponentStateReference";

export default function WidgetDataBlockBase(
  {
    title,
    titleIcon,
    rightSideTitleBarItems,
    centerTitleBarItems,
    heightSize,
    widthSize,
    fontColor,
    fontFamily,
    children,
    className,
    onClickFunction,
    disabled,
    isLoading,
    titleBarClassName,
  }) {
  const {
    themeConstants,
  } = useComponentStateReference();

  return (
    <WidgetDataBlockBaseContainer
      title={title}
      titleIcon={titleIcon}
      centerTitleBarItems={centerTitleBarItems}
      rightSideTitleBarItems={rightSideTitleBarItems}
      heightSize={heightSize}
      widthSize={widthSize}
      className={className}
      disabled={disabled}
      isLoading={isLoading}
      onClickFunction={onClickFunction}
      backgroundColor={themeConstants.COLOR_PALETTE.WHITE}
      disabledBackgroundColor={themeConstants.COLOR_PALETTE.BACKGROUND_GRAY}
      borderColor={themeConstants.BORDER_COLORS.GRAY}
      fontColor={fontColor}
      disabledFontColor={themeConstants.COLOR_PALETTE.DARK_GRAY}
      fontFamily={fontFamily}
      titleBarClassName={titleBarClassName}
    >
      {children}
    </WidgetDataBlockBaseContainer>
  );
}

WidgetDataBlockBase.propTypes = {
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
  title: PropTypes.any,
  titleIcon: PropTypes.object,
  rightSideTitleBarItems: PropTypes.any,
  centerTitleBarItems: PropTypes.any,
  isLoading: PropTypes.bool,
  titleBarClassName: PropTypes.string,
};

WidgetDataBlockBase.defaultProps = {
  // fontFamily: fontThemeConstants.FONT_FAMILIES.INTER,
};
