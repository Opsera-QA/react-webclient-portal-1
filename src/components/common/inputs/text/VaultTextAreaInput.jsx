import React, {useState} from "react";
import PropTypes from "prop-types";
import InputLabel from "components/common/inputs/info_text/InputLabel";
import InputContainer from "components/common/inputs/InputContainer";
import VaultInfoText from "components/common/inputs/info_text/vault/VaultInfoText";

function VaultTextAreaInput({fieldName, dataObject, setDataObject, disabled, inputHelpOverlay, infoOverlay}) {
  const [field, setField] = useState(dataObject.getFieldById(fieldName));
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

  const getCurrentValue = () => {
    if (typeof dataObject.getData(fieldName) === "object") {
      return "*********************************";
    }

    return dataObject.getData(fieldName);
  };

  return (
    <InputContainer fieldName={fieldName}>
      <InputLabel
        field={field}
        model={dataObject}
        inputHelpOverlay={inputHelpOverlay}
        infoOverlay={infoOverlay}
      />
      <textarea
        style={{WebkitTextSecurity: 'disc'}}
        rows={3}
        disabled={disabled}
        value={getCurrentValue()}
        onChange={(event) => validateAndSetData(event.target.value)}
        className="form-control"
      />
      <VaultInfoText storedInVault={isStoredInVault()} errorMessage={errorMessage}/>
    </InputContainer>
  );
}

VaultTextAreaInput.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
  infoOverlay: PropTypes.any,
  inputHelpOverlay: PropTypes.any,
};

export default VaultTextAreaInput;