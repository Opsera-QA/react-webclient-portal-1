import React, {useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import InputLabel from "components/common/inputs/info_text/InputLabel";
import InputContainer from "components/common/inputs/InputContainer";
import InfoText from "components/common/inputs/info_text/InfoText";
import regexDefinitions from "utils/regexDefinitions";

// TODO: Use new VisibleVaultTextInput when complete
function ParameterValueTextInput(
  {
    fieldName,
    model,
    parameterId,
    setModel,
    disabled,
  }) {
  const [field, setField] = useState(model?.getFieldById(fieldName));
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;

    if (!model.isNew()) {
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
    const newDataObject = {...model};
    newDataObject.setTextData(model, value);
    setErrorMessage(newDataObject.getFieldError(fieldName));
    setModel({...newDataObject});
  };

  const getValueFromVault = async () => {
    try {
      setIsLoading(true);
      if (model?.getData("vaultEnabled") === true) {
        await model?.getValueFromVault(fieldName);
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

  const getCustomMessage = () => {
    const definitionName = field.regexDefinitionName;
    const regexDefinition = regexDefinitions[definitionName];
    const isRequiredFunction = regexDefinition?.isRequiredFunction;

    if (isRequiredFunction != null && isRequiredFunction(model) === false) {
      return ("Values are visible to all users if no Access Roles are assigned to this record.");
    }
  };

  return (
    <InputContainer>
      <InputLabel field={field} model={model}/>
      <div className={isLoading ? "d-flex loading-input-wrapper" : ""}>
        <input
          disabled={disabled || isLoading}
          value={isLoading ? "Loading Value From Vault" : model?.getData(fieldName)}
          onChange={(event) => validateAndSetData(event.target.value)}
          className="form-control"
        />
      </div>
      <InfoText
        fieldName={fieldName}
        field={field}
        errorMessage={errorMessage}
        model={model}
        customMessage={getCustomMessage()}
      />
    </InputContainer>
  );
}

ParameterValueTextInput.propTypes = {
  fieldName: PropTypes.string,
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
  parameterId: PropTypes.string
};

export default ParameterValueTextInput;