import React from "react";
import PropTypes from "prop-types";
import WidgetDataBlockBaseContainer from "temp-library-components/widgets/data_blocks/WidgetDataBlockBaseContainer";
import useComponentStateReference from "hooks/useComponentStateReference";
function FreeTrialWidgetDataBlockBase(
  {
    title,
    titleIcon,
    heightSize,
    widthSize,
    fontColor,
    fontFamily,
    children,
    className,
    onClickFunction,
    disabled,
    isLoading,
  }) {
  const {
    themeConstants,
  } = useComponentStateReference();

  return (
    <WidgetDataBlockBaseContainer
      title={title}
      titleIcon={titleIcon}
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
    >
      {children}
    </WidgetDataBlockBaseContainer>
  );
}

FreeTrialWidgetDataBlockBase.propTypes = {
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
  isLoading: PropTypes.bool,
};

FreeTrialWidgetDataBlockBase.defaultProps = {
  // fontFamily: fontThemeConstants.FONT_FAMILIES.INTER,
};

export default FreeTrialWidgetDataBlockBase;
