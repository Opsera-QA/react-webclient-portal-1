import React, {useState} from "react";
import PropTypes from "prop-types";
import InputLabel from "components/common/inputs/info_text/InputLabel";
import InputContainer from "components/common/inputs/InputContainer";
import VaultInfoText from "components/common/inputs/info_text/vault/VaultInfoText";
import {InputGroup} from "react-bootstrap";
import { hasStringValue } from "components/common/helpers/string-helpers";

function VaultTextInput(
  {
    fieldName,
    dataObject,
    setDataObject,
    disabled,
    rightSideInputButton,
    infoOverlay,
    inputHelpOverlay
  }) {
  const [field] = useState(dataObject.getFieldById(fieldName));
  const [errorMessage, setErrorMessage] = useState("");

  const validateAndSetData = (value) => {
    let newDataObject = dataObject;
    newDataObject.setTextData(fieldName, value);
    setErrorMessage(newDataObject.getFieldError(fieldName));
    setDataObject({...newDataObject});
  };

  const isStoredInVault = () => {
    let currentValue = dataObject.getData(fieldName);
    return typeof currentValue === "object" && Object.entries(currentValue).length > 0;
  };

  const getInputBody = () => {
    return (
      <input
        type={"password"}
        disabled={disabled}
        value={dataObject.getData(fieldName)}
        onChange={(event) => validateAndSetData(event.target.value)}
        className="form-control"
      />
    );
  };

  const getInput = () => {
    if (rightSideInputButton != null) {
      return (
        <InputGroup className={"flex-nowrap text-input-with-button"}>
          {getInputBody()}
          <InputGroup.Append>
            {rightSideInputButton}
          </InputGroup.Append>
        </InputGroup>
      );
    }

    return (
      <div className={"d-flex"}>
        {getInputBody()}
      </div>
    );
  };

  if (field == null) {
    return null;
  }

  return (
    <InputContainer fieldName={fieldName}>
      <InputLabel
        field={field}
        model={dataObject}
        inputHelpOverlay={inputHelpOverlay}
        infoOverlay={infoOverlay}
        hasError={hasStringValue(errorMessage) === true}
      />
      {getInput()}
      <VaultInfoText storedInVault={isStoredInVault()} errorMessage={errorMessage}/>
    </InputContainer>
  );
}

VaultTextInput.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
  rightSideInputButton: PropTypes.object,
  infoOverlay: PropTypes.any,
  inputHelpOverlay: PropTypes.any,
};

export default VaultTextInput;