import React, {useState} from "react";
import PropTypes from "prop-types";
import {faFileCode} from "@fortawesome/pro-light-svg-icons";
import InputContainer from "components/common/inputs/InputContainer";
import ToggleThemeIcon from "components/common/buttons/toggle/ToggleThemeIcon";
import InfoContainer from "components/common/containers/InfoContainer";
import {hasStringValue} from "components/common/helpers/string-helpers";
import CenterLoadingIndicator from "components/common/loading/CenterLoadingIndicator";
import DiffInputBase from "components/common/inputs/code/diff/DiffInputBase";

// TODO: If more are added, make sure to add the respective imports into CodeInputBase
export const CODE_THEME_TYPES = {
  LIGHT: "chrome",
  DARK: "monokai"
};

function DiffInput(
  {
    model,
    setModel,
    originalCodeFieldName,
    diffCodeFieldName,
    mode,
    className,
    isLoading,
    disabled,
    titleBarActionButtons,
    height,
    customTitleText,
    theme,
  }) {
  const [field] = useState(model?.getFieldById(diffCodeFieldName));
  const [errorMessage, setErrorMessage] = useState("");
  const [internalTheme, setInternalTheme] = useState(theme === CODE_THEME_TYPES?.DARK ? CODE_THEME_TYPES?.DARK : CODE_THEME_TYPES.LIGHT);

  const validateAndSetData = (value) => {
    let newModel = model;

    if (typeof value === "string" && value.length > 1047576) {
      //1,048,576 is 1MB
      const parsedValue = value.substr(0, 1048576);
      newModel.setData(diffCodeFieldName, parsedValue);
      setErrorMessage("Code Entry is limited to 1,048,576 characters (1MB). Truncating value.");
    }
    else {
      newModel.setData(diffCodeFieldName, value);
      setErrorMessage(newModel.getFieldError(diffCodeFieldName));
    }

    setModel({...newModel});
  };

  const toggleTheme = () => {
    const newTheme = internalTheme === CODE_THEME_TYPES.DARK ? CODE_THEME_TYPES.LIGHT : CODE_THEME_TYPES.DARK;
    setInternalTheme(newTheme);
  };

  const getTitleBarActionButtons = () => {
    return (
      <div className={"d-flex"}>
        <div className={"mr-2"}>
          {titleBarActionButtons}
        </div>
        <ToggleThemeIcon theme={internalTheme} toggleTheme={toggleTheme} />
      </div>
    );
  };

  const getBody = () => {
    if (isLoading === true) {
      return (<CenterLoadingIndicator />);
    }

    return (
      <DiffInputBase
        mode={mode}
        theme={internalTheme}
        isLoading={isLoading}
        setDataFunction={validateAndSetData}
        inputId={`${model?.getData("_id")}-${diffCodeFieldName}`}
        originalCode={model?.getData(originalCodeFieldName)}
        changedCode={model?.getData(diffCodeFieldName)}
        disabled={isLoading || disabled}
        height={height}
      />
    );
  };

  const getTitleText = () => {
    if (hasStringValue(customTitleText) === true) {
      return customTitleText;
    }

    return field?.label;
  };

  if (field == null) {
    return null;
  }

  return (
    <InputContainer className={className}>
      <InfoContainer
        titleIcon={faFileCode}
        titleText={getTitleText()}
        titleRightSideButton={getTitleBarActionButtons()}
      >
        <div style={{ height: height }}>
          {getBody()}
        </div>
        <div className={"object-properties-footer"} />
      </InfoContainer>
    </InputContainer>
  );
}

DiffInput.propTypes = {
  originalCodeFieldName: PropTypes.string,
  diffCodeFieldName: PropTypes.string,
  model: PropTypes.object,
  setModel: PropTypes.func,
  className: PropTypes.string,
  mode: PropTypes.string,
  isLoading: PropTypes.bool,
  disabled: PropTypes.bool,
  titleBarActionButtons: PropTypes.any,
  height: PropTypes.string,
  customTitleText: PropTypes.string,
  theme: PropTypes.string,
};

export default DiffInput;