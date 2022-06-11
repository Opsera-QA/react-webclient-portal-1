import React from "react";
import PropTypes from "prop-types";
import BooleanToggleInput from "components/common/inputs/boolean/BooleanToggleInput";

function SalesforceToGitMergeSyncTaskIncludePackageXmlToggleInput(
  {
    model,
    setModel,
    disabled,
  }) {
  const setDataFunction = (fieldName, newValue) => {
    const newModel = {...model};
    newModel?.setData(fieldName, newValue);
    newModel?.setDefaultValue("packageXmlReferencePath");
    setModel({...newModel});
  };

  return (
    <BooleanToggleInput
      dataObject={model}
      setDataObject={setModel}
      setDataFunction={setDataFunction}
      fieldName={"includePackageXml"}
      disabled={disabled}
    />
  );
}

SalesforceToGitMergeSyncTaskIncludePackageXmlToggleInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
};

export default SalesforceToGitMergeSyncTaskIncludePackageXmlToggleInput;
