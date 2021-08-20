import React, {useState} from "react";
import PropTypes from "prop-types";
import InputLabel from "components/common/inputs/info_text/InputLabel";
import InputContainer from "components/common/inputs/InputContainer";
import VaultInfoText from "components/common/inputs/info_text/vault/VaultInfoText";

function VaultTextInput({fieldName, dataObject, setDataObject, disabled}) {
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

  return (
    <InputContainer>
      <InputLabel field={field}/>
      <input
        type={"password"}
        disabled={disabled}
        value={dataObject.getData(fieldName)}
        onChange={(event) => validateAndSetData(event.target.value)}
        className="form-control"
      />
      <VaultInfoText storedInVault={isStoredInVault()} errorMessage={errorMessage}/>
    </InputContainer>
  );
}

VaultTextInput.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool
};

export default VaultTextInput;