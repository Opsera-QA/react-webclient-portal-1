import React from "react";
import PropTypes from "prop-types";
import { mouseHelper } from "temp-library-components/helpers/mouse/mouse.helper";
import IconCardContainerBase from "components/common/card_containers/IconCardContainerBase";
import useComponentStateReference from "hooks/useComponentStateReference";

export default function SelectionIconCardBase(
  {
    children,
    isLoading,
    cardFooter,
    titleBar,
    className,
    contentBody,
    style,
    onClickFunction,
    tooltip,
    selectedOption,
    option,
  }) {
  const { themeConstants } = useComponentStateReference();

  const getStyle = () => {
    if (style) {
      return style;
    }

    return ({
      boxShadow: selectedOption === option ? "0 0 40px rgba(46, 25, 86, .25)" : undefined,
      borderRadius: "5px",
      cursor: mouseHelper.getMouseCursor(onClickFunction),
      borderColor: selectedOption === option ? themeConstants.COLOR_PALETTE.GOLD_HIGHLIGHT : undefined,
    });
  };

  return (
    <IconCardContainerBase
      isLoading={isLoading}
      cardFooter={cardFooter}
      titleBar={titleBar}
      contentBody={contentBody}
      onClickFunction={onClickFunction}
      className={className}
      tooltip={tooltip}
      style={getStyle()}
    >
      {children}
    </IconCardContainerBase>
  );
}

SelectionIconCardBase.propTypes = {
  children: PropTypes.any,
  titleBar: PropTypes.object,
  contentBody: PropTypes.object,
  className: PropTypes.string,
  isLoading: PropTypes.bool,
  cardFooter: PropTypes.any,
  style: PropTypes.object,
  onClickFunction: PropTypes.func,
  tooltip: PropTypes.any,
  selectedOption: PropTypes.string,
  option: PropTypes.string,
};