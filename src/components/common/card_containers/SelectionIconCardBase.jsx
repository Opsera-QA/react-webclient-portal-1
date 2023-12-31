import React from "react";
import PropTypes from "prop-types";
import { mouseHelper } from "temp-library-components/helpers/mouse/mouse.helper";
import useComponentStateReference from "hooks/useComponentStateReference";
import IconCardBase from "components/common/card/selection/IconCardBase";

// TODO: At some point we need to combine RadioButtonCard, SelectionIconCardBase, and SelectionCardBase to have a common base
export default function SelectionIconCardBase(
  {
    children,
    isLoading,
    cardHeader,
    cardFooter,
    titleBar,
    className,
    contentBody,
    style,
    onClickFunction,
    tooltip,
    selectedOption,
    option,
    highlightedBorderColor,
    disabled,
  }) {
  const { themeConstants } = useComponentStateReference();

  const getStyle = () => {
    if (style) {
      return style;
    }

    return ({
      boxShadow: selectedOption != null && selectedOption === option ? "0 0 20px rgba(46, 25, 86, .3)" : undefined,
      borderRadius: "1rem",
      cursor: mouseHelper.getLinkMousePointer(
        onClickFunction,
        disabled === true || isLoading,
        selectedOption != null && selectedOption === option,
      ),
      borderColor: selectedOption != null && selectedOption === option ? highlightedBorderColor : undefined,
      opacity: selectedOption != null && selectedOption !== option ? ".75" : undefined,
      overflow: "hidden",
      backgroundColor: disabled === true ? themeConstants.COLOR_PALETTE.BACKGROUND_GRAY : undefined,
      color: disabled === true ? themeConstants.COLOR_PALETTE.DARK_GRAY : undefined,
    });
  };

  const handleOnClickFunction = () => {
    if (disabled !== true && onClickFunction) {
      onClickFunction(option);
    }
  };

  return (
    <IconCardBase
      cardHeader={cardHeader}
      isLoading={isLoading}
      cardFooter={cardFooter}
      titleBar={titleBar}
      contentBody={contentBody}
      onClickFunction={handleOnClickFunction}
      className={className}
      tooltip={tooltip}
      style={getStyle()}
    >
      {children}
    </IconCardBase>
  );
}

SelectionIconCardBase.propTypes = {
  children: PropTypes.any,
  titleBar: PropTypes.object,
  contentBody: PropTypes.object,
  className: PropTypes.string,
  isLoading: PropTypes.bool,
  cardHeader: PropTypes.any,
  cardFooter: PropTypes.any,
  style: PropTypes.object,
  onClickFunction: PropTypes.func,
  tooltip: PropTypes.any,
  selectedOption: PropTypes.string,
  option: PropTypes.string,
  highlightedBorderColor: PropTypes.string,
  disabled: PropTypes.bool,
};