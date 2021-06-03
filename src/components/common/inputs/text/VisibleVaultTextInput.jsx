import React, {useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import InputLabel from "components/common/form_fields/input/InputLabel";
import InputContainer from "components/common/inputs/InputContainer";
import VaultInfoText from "components/common/inputs/info_text/vault/VaultInfoText";
import axios from "axios";
import InfoText from "components/common/inputs/info_text/InfoText";

// TODO: This is tailored to Parameters but leaving here for potential generic use
function VisibleVaultTextInput({fieldName, dataObject, setDataObject, disabled}) {
  const [field, setField] = useState(dataObject.getFieldById(fieldName));
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;

    getValueFromVault().catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });

    return () => {
      isMounted.current = false;
    };
  }, [dataObject.getData("_id")]);

  const validateAndSetData = (value) => {
    let newDataObject = dataObject;
    newDataObject.setTextData(fieldName, value);
    setErrorMessage(newDataObject.getFieldError(fieldName));
    setDataObject({...newDataObject});
  };

  const getValueFromVault = async () => {
    try {
      setIsLoading(true);
      if (dataObject?.getData("vaultEnabled") === true) {
        await dataObject.getValueFromVault(fieldName);
        setDataObject({...dataObject});
      }
    }
    catch (error) {
      setErrorMessage("Could not pull value from Vault");
      console.error(error);
    }
    finally {
      setIsLoading(false);
    }
  };

  return (
    <InputContainer>
      <InputLabel field={field}/>
      <div className={isLoading ? "d-flex loading-input-wrapper" : ""}>
        <input
          disabled={disabled || isLoading}
          value={isLoading ? "Loading Value From Vault" : dataObject?.getData(fieldName)}
          onChange={(event) => validateAndSetData(event.target.value)}
          className="form-control"
        />
      </div>
      <InfoText field={field} errorMessage={errorMessage}/>
    </InputContainer>
  );
}

VisibleVaultTextInput.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool
};

export default VisibleVaultTextInput;