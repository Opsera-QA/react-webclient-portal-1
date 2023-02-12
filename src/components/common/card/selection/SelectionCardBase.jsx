import React from "react";
import PropTypes from "prop-types";
import {mouseHelper} from "temp-library-components/helpers/mouse/mouse.helper";
import useComponentStateReference from "hooks/useComponentStateReference";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";

// TODO: At some point we need to combine RadioButtonCard, SelectionIconCardBase, and SelectionCardBase to have a common base
export default function SelectionCardBase(
  {
    selectedOption,
    value,
    onClickFunction,
    body,
    titleText,
    disabled,
    visible,
    style,
    inactive,
    isLoading,
    highlightedBorderColor,
    className,
  }) {
  const {themeConstants} = useComponentStateReference();

  const handleOnClickFunction = () => {
    if (disabled === true) {
      return;
    }

    if (onClickFunction) {
      onClickFunction();
    }
  };

  const getStyle = () => {
    if (style) {
      return style;
    }

    const borderColor =
      selectedOption != null && selectedOption === value
        ? DataParsingHelper.parseString(highlightedBorderColor, themeConstants.COLOR_PALETTE.MUTED_PURPLE)
        : themeConstants.COLOR_PALETTE.BACKGROUND_GRAY;

    return ({
      boxShadow: selectedOption != null && selectedOption === value ? "2px 2px 5px rgba(0, 0, 0, .15)" : undefined,
      borderRadius: "1rem",
      cursor: mouseHelper.getLinkMousePointer(
        onClickFunction,
        disabled === true || isLoading,
        selectedOption != null && selectedOption === value,
      ),
      border: `1px solid ${borderColor}`,
      opacity: selectedOption != null && selectedOption !== value ? ".75" : undefined,
      overflow: "hidden",
      backgroundColor: disabled === true || inactive === true ? themeConstants.COLOR_PALETTE.BACKGROUND_GRAY : undefined,
      color: disabled === true || inactive === true ? themeConstants.COLOR_PALETTE.DARK_GRAY : undefined,
    });
  };

  const getBody = () => {
    if (body) {
      return (
        <div className={"mt-2"}>
          {body}
        </div>
      );
    }
  };


  if (onClickFunction == null || visible === false) {
    return null;
  }

  return (
    <div className={className}>
      <div
        className={"vertical-selection-card-temp h-100 w-100 d-flex"}
        style={getStyle()}
        onClick={handleOnClickFunction}
      >
        <div className={"p-3 w-100"}>
          <div className={"d-flex"}>
            <div className={"h-100 w-100"}>
              <strong>{titleText}</strong>
              {getBody()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

SelectionCardBase.propTypes = {
  onClickFunction: PropTypes.func,
  className: PropTypes.string,
  titleText: PropTypes.any,
  disabled: PropTypes.bool,
  inactive: PropTypes.bool,
  value: PropTypes.string,
  visible: PropTypes.bool,
  body: PropTypes.any,
  style: PropTypes.object,
  isLoading: PropTypes.bool,
  highlightedBorderColor: PropTypes.string,
  selectedOption: PropTypes.any,
};