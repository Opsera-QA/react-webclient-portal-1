import React, {useState} from "react";
import PropTypes from "prop-types";
import { mouseHelper } from "temp-library-components/helpers/mouse/mouse.helper";
import useComponentStateReference from "hooks/useComponentStateReference";
import IconCardContainerBaseV2 from "components/common/card_containers/IconCardContainerBaseV2";

export default function SelectionIconCard(
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
  const [isHovering, setIsHovering] = useState(false);

  const getStyle = () => {
    if (style) {
      return style;
    }

    return ({
      boxShadow: isHovering === true || (selectedOption != null && selectedOption === option) ? "0 0 20px rgba(46, 25, 86, .3)" : undefined,
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
      color: disabled === true ? themeConstants.COLOR_PALETTE.DARK_GRAY : themeConstants.COLOR_PALETTE.BLACK,
    });
  };

  const handleOnClickFunction = () => {
    if (disabled !== true && onClickFunction) {
      onClickFunction(option);
    }
  };

  return (
    <IconCardContainerBaseV2
      cardHeader={cardHeader}
      isLoading={isLoading}
      cardFooter={cardFooter}
      titleBar={titleBar}
      contentBody={contentBody}
      onClickFunction={handleOnClickFunction}
      className={className}
      tooltip={tooltip}
      style={getStyle()}
      onHoverFunction={setIsHovering}
    >
      {children}
    </IconCardContainerBaseV2>
  );
}

SelectionIconCard.propTypes = {
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