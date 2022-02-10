import React, {useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import InputLabel from "components/common/inputs/info_text/InputLabel";
import InputContainer from "components/common/inputs/InputContainer";
import InfoText from "components/common/inputs/info_text/InfoText";

// TODO: Use new VisibleVaultTextInput when complete
function ParameterValueTextInput({fieldName, dataObject, parameterId, setDataObject, disabled}) {
  const [field, setField] = useState(dataObject.getFieldById(fieldName));
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;

    if (!dataObject.isNew()) {
      getValueFromVault().catch((error) => {
        if (isMounted?.current === true) {
          throw error;
        }
      });
    }

    return () => {
      isMounted.current = false;
    };
  }, [parameterId]);

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
      }
    }
    catch (error) {
      if (isMounted.current === true) {
        if (error?.response?.status === 404) {
          setErrorMessage("No value stored in vault");
        } else {
          setErrorMessage("Could not pull value from Vault");
          console.error(error);
        }
      }
    }
    finally {
      setIsLoading(false);
    }
  };

  return (
    <InputContainer>
      <InputLabel field={field} model={dataObject}/>
      <div className={isLoading ? "d-flex loading-input-wrapper" : ""}>
        <input
          disabled={disabled || isLoading}
          value={isLoading ? "Loading Value From Vault" : dataObject?.getData(fieldName)}
          onChange={(event) => validateAndSetData(event.target.value)}
          className="form-control"
        />
      </div>
      <InfoText
        field={field}
        errorMessage={errorMessage}
        model={dataObject}
      />
    </InputContainer>
  );
}

ParameterValueTextInput.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
  parameterId: PropTypes.string
};

export default ParameterValueTextInput;