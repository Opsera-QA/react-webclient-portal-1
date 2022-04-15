import React, {useRef, useState} from "react";
import PropTypes from "prop-types";
import regexDefinitions from "utils/regexDefinitions";
import VisibleVaultTextAreaInput from "components/common/inputs/textarea/vault/VisibleVaultTextAreaInput";

function ParameterValueTextAreaInput(
  {
    fieldName,
    model,
    setModel,
    disabled,
  }) {
  const [field] = useState(model?.getFieldById(fieldName));
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const isMounted = useRef(false);

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
    const definitionName = field?.regexDefinitionName;
    const regexDefinition = regexDefinitions[definitionName];
    const isRequiredFunction = regexDefinition?.isRequiredFunction;

    if (isRequiredFunction != null && isRequiredFunction(model) === false) {
      return ("Values are visible to all users if no Access Roles are assigned to this record.");
    }
  };

  return (
    <VisibleVaultTextAreaInput
      model={model}
      disabled={model?.isNew() === false && model?.canUpdate() !== true || disabled}
      fieldName={"value"}
      setModel={setModel}
      isLoading={isLoading}
      pullVaultDataFunction={getValueFromVault}
      error={errorMessage}
      customMessage={getCustomMessage()}
      parameterId={model?.getMongoDbId()}
    />
  );
}

ParameterValueTextAreaInput.propTypes = {
  fieldName: PropTypes.string,
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
};

export default ParameterValueTextAreaInput;