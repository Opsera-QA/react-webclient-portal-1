import React from "react";
import PropTypes from "prop-types";
import {mouseHelper} from "temp-library-components/helpers/mouse/mouse.helper";
import useComponentStateReference from "hooks/useComponentStateReference";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";

export default function RadioButtonCard(
  {
    fieldName,
    model,
    setModel,
    value,
    setDataFunction,
    description,
    label,
    disabled,
    visible,
    style,
    isLoading,
    highlightedBorderColor,
  }) {
  const {themeConstants} = useComponentStateReference();
  const selectedOption = model?.getData(fieldName);

  const onClickFunction = () => {
    if (disabled === true) {
      return;
    }

    if (setDataFunction) {
      setDataFunction(fieldName, value);
    } else {
      model.setData(fieldName, value);
      setModel({...model});
    }
  };

  const getContentBody = () => {
    return (
      <div className={"d-flex"}>
        <div className={"h-100 w-100"}>
          {getLabel()}
          {getDescription()}
        </div>
      </div>
    );
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
      backgroundColor: disabled === true ? themeConstants.COLOR_PALETTE.BACKGROUND_GRAY : undefined,
      color: disabled === true ? themeConstants.COLOR_PALETTE.DARK_GRAY : undefined,
    });
  };

  const getLabel = () => {
    if (label) {
      return (
        <div className={"d-flex"}>
          <input
            className={"mr-2"}
            type={"radio"}
            value={value}
            checked={model?.getData(fieldName) === value}
            disabled={disabled}
          />
          <strong>{label}</strong>
        </div>
      );
    }
  };

  const getDescription = () => {
    if (description) {
      return (
        <div className={"mt-2 mx-1"}>
          {description}
        </div>
      );
    }
  };


  if (model == null || visible === false) {
    return null;
  }

  return (
    <div
      className={"vertical-selection-card-temp h-100 w-100 d-flex"}
      style={getStyle()}
      onClick={onClickFunction}
    >
      <div className={"p-3"}>
        {getContentBody()}
      </div>
    </div>
  );
}

RadioButtonCard.propTypes = {
  setModel: PropTypes.func,
  fieldName: PropTypes.string,
  model: PropTypes.object,
  setDataFunction: PropTypes.func,
  label: PropTypes.any,
  disabled: PropTypes.bool,
  value: PropTypes.string,
  visible: PropTypes.bool,
  description: PropTypes.any,
  style: PropTypes.object,
  isLoading: PropTypes.bool,
  highlightedBorderColor: PropTypes.string,
};