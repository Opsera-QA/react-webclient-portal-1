import React, {useState} from "react";
import PropTypes from "prop-types";
import {faFileCode} from "@fortawesome/pro-light-svg-icons";
import FieldTitleBar from "components/common/fields/FieldTitleBar";
import InputContainer from "components/common/inputs/InputContainer";
import InfoText from "components/common/inputs/info_text/InfoText";
import CodeInputBase from "components/common/inputs/code/CodeInputBase";

// TODO: If more are added, make sure to add the respective imports into CodeInputBase
const CODE_THEME_TYPES = {
  LIGHT: "chrome",
  DARK: "twilight"
};

function CodeInput({model, setModel, fieldName, mode, className, isLoading, disabled, titleBarActionButtons}) {
  const [field] = useState(model?.getFieldById(fieldName));
  const [errorMessage, setErrorMessage] = useState("");
  const [theme, setTheme] = useState(CODE_THEME_TYPES.LIGHT);

  const validateAndSetData = (value) => {
    let newModel = model;

    if (typeof value === "string" && value.length > 1047576) {
      //1,048,576 is 1MB
      const parsedValue = value.substr(0, 1048576);
      newModel.setTextData(fieldName, parsedValue);
      setErrorMessage("Code Entry is limited to 1,048,576 characters (1MB). Truncating value.");
    }
    else {
      newModel.setTextData(fieldName, value);
      setErrorMessage(newModel.getFieldError(fieldName));
    }

    setModel({...newModel});
  };

  if (field == null) {
    return null;
  }

  return (
    <InputContainer className={className}>
      <div className="object-properties-input">
        <div className="content-container">
          <FieldTitleBar field={field} icon={faFileCode} isLoading={isLoading} actionButtons={titleBarActionButtons} />
          <CodeInputBase
            mode={mode}
            theme={theme}
            isLoading={isLoading}
            setDataFunction={validateAndSetData}
            inputId={`${model?.getData("_id")}-${fieldName}`}
            value={model?.getData(fieldName)}
            disabled={isLoading || disabled}
          />
        </div>
      </div>
      <div className={"object-properties-footer"}>
        <InfoText field={field} errorMessage={errorMessage}/>
      </div>
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
  titleBarActionButtons: PropTypes.any
};

export default CodeInput;