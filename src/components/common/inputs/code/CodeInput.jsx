import React, {useState} from "react";
import PropTypes from "prop-types";
import {faExclamationTriangle, faFileCode, faFileDownload} from "@fortawesome/pro-light-svg-icons";
import InputContainer from "components/common/inputs/InputContainer";
import InfoText from "components/common/inputs/info_text/InfoText";
import CodeInputBase from "components/common/inputs/code/CodeInputBase";
import ToggleThemeIcon from "components/common/buttons/toggle/ToggleThemeIcon";
import LoadingDialog from "components/common/status_notifications/loading";
import IconBase from "components/common/icons/IconBase";
import InfoContainer from "components/common/containers/InfoContainer";
import {hasStringValue} from "components/common/helpers/string-helpers";
import CenteredContentWrapper from "components/common/wrapper/CenteredContentWrapper";
import CenterLoadingIndicator from "components/common/loading/CenterLoadingIndicator";

// TODO: If more are added, make sure to add the respective imports into CodeInputBase
export const CODE_THEME_TYPES = {
  LIGHT: "chrome",
  DARK: "twilight"
};

function CodeInput(
  {
    model,
    setModel,
    fieldName,
    mode,
    className,
    isLoading,
    disabled,
    titleBarActionButtons,
    isDataPulled,
    dataPullError,
    height,
    customTitleText,
    theme,
  }) {
  const [field] = useState(model?.getFieldById(fieldName));
  const [errorMessage, setErrorMessage] = useState("");
  const [internalTheme, setInternalTheme] = useState(theme === CODE_THEME_TYPES?.DARK ? CODE_THEME_TYPES?.DARK : CODE_THEME_TYPES.LIGHT);

  const validateAndSetData = (value) => {
    let newModel = model;

    if (typeof value === "string" && value.length > 1047576) {
      //1,048,576 is 1MB
      const parsedValue = value.substr(0, 1048576);
      newModel.setData(fieldName, parsedValue);
      setErrorMessage("Code Entry is limited to 1,048,576 characters (1MB). Truncating value.");
    }
    else {
      newModel.setData(fieldName, value);
      setErrorMessage(newModel.getFieldError(fieldName));
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

    if (dataPullError != null && dataPullError !== "") {
      return (
        <CenteredContentWrapper>
            <IconBase icon={faExclamationTriangle} className={"mr-2"} />{dataPullError}
        </CenteredContentWrapper>
      );
    }

    if (isDataPulled === false) {
      return (
        <CenteredContentWrapper>
            <IconBase icon={faFileDownload} className={"mr-2"} />
           <span>{model?.getLabel(fieldName)} must be pulled from the database before it can be seen</span>
        </CenteredContentWrapper>
      );
    }

    return (
      <CodeInputBase
        mode={mode}
        theme={internalTheme}
        isLoading={isLoading}
        setDataFunction={validateAndSetData}
        inputId={`${model?.getData("_id")}-${fieldName}`}
        value={model?.getData(fieldName)}
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
    <InputContainer className={className + " input-for-" + fieldName}>
      <InfoContainer
      titleIcon={faFileCode}
      titleText={getTitleText()}
      titleRightSideButton={getTitleBarActionButtons()}
      >
        <div style={{height: height}}>
          {getBody()}
        </div>
        <div className={"object-properties-footer"}/>
      </InfoContainer>
      <InfoText
        field={field}
        errorMessage={errorMessage}
        model={model}
        fieldName={fieldName}
      />
    </InputContainer>
  );
}

CodeInput.propTypes = {
  fieldName: PropTypes.string,
  model: PropTypes.object,
  setModel: PropTypes.func,
  className: PropTypes.string,
  mode: PropTypes.string,
  isLoading: PropTypes.bool,
  disabled: PropTypes.bool,
  titleBarActionButtons: PropTypes.any,
  isDataPulled: PropTypes.bool,
  dataPullError: PropTypes.string,
  height: PropTypes.string,
  customTitleText: PropTypes.string,
  theme: PropTypes.string,
};

CodeInput.defaultProps = {
  height: "500px",
};

export default CodeInput;