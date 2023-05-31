import React from "react";
import PropTypes from "prop-types";
import VanityButtonBase from "temp-library-components/button/VanityButtonBase";
import {faTimes} from "@fortawesome/pro-solid-svg-icons";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import {hasStringValue} from "components/common/helpers/string-helpers";

export default function ClearSearchFilterButton(
  {
    paginationModel,
    loadDataFunction,
    fieldName,
    buttonState,
    disabled,
    icon,
    className,
    normalText,
    successText,
    errorText,
    busyText,
    variant,
    setCurrentSearchTerm,
    clientSide,
    buttonSize,
    buttonClassName,
    currentSearchTerm,
  }) {
  const currentSearchValue = DataParsingHelper.parseString(paginationModel?.getData(fieldName));

  const handleClearFilterFunction = () => {
    setCurrentSearchTerm("");

    if (currentSearchValue && loadDataFunction && clientSide !== true) {
      paginationModel?.setData(fieldName, "");
      paginationModel?.setData("currentPage", 1);
      loadDataFunction(paginationModel);
    }
  };

  if (
    (loadDataFunction == null && clientSide !== true)
    || paginationModel == null
    || (currentSearchValue == null && hasStringValue(currentSearchTerm) !== true)
  ) {
    return null;
  }

  return (
    <VanityButtonBase
      className={className}
      icon={icon}
      disabled={disabled || (hasStringValue(currentSearchValue) === false && hasStringValue(currentSearchTerm) === false)}
      buttonState={buttonState}
      onClickFunction={handleClearFilterFunction}
      variant={variant}
      successText={successText}
      errorText={errorText}
      busyText={busyText}
      normalText={normalText}
      buttonSize={buttonSize}
      buttonClassName={buttonClassName}
      tooltip={"Clear Search Keyword"}
    />
  );
}

ClearSearchFilterButton.propTypes = {
  buttonState: PropTypes.string,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  icon: PropTypes.object,
  normalText: PropTypes.string,
  successText: PropTypes.string,
  errorText: PropTypes.string,
  busyText: PropTypes.string,
  variant: PropTypes.string,
  fieldName: PropTypes.string,
  paginationModel: PropTypes.object,
  loadDataFunction: PropTypes.func,
  clientSide: PropTypes.bool,
  setCurrentSearchTerm: PropTypes.func,
  buttonSize: PropTypes.string,
  buttonClassName: PropTypes.string,
  currentSearchTerm: PropTypes.string,
};

ClearSearchFilterButton.defaultProps = {
  icon: faTimes,
  variant: "secondary",
};