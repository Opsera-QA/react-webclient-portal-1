import React from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";

function TerraformProviderSelectInput({ fieldName, dataObject, setDataObject, disabled, textField, valueField, toolId, vcsProviders}) {

  const setDataFunction = ( fieldName, selectedOption ) => {

    let newDataObject = {...dataObject};
    newDataObject.setData(fieldName, selectedOption.vcsProviderName);
    newDataObject.setData("providerId", selectedOption.id);
    newDataObject.setData("oauthToken", selectedOption.oauthToken);
    setDataObject({...newDataObject});
  };

  const clearDataFunction = ( fieldName ) => {
    let newDataObject = {...dataObject};    
    newDataObject.setData("provider", "");
    newDataObject.setData("providerId", "");
    newDataObject.setData("oauthToken", "");
    newDataObject.setData("repository", "");
    setDataObject({...newDataObject});
  };

  return (
      <SelectInputBase
        fieldName={fieldName}
        dataObject={dataObject}
        setDataObject={setDataObject}
        selectOptions={vcsProviders}
        setDataFunction={setDataFunction}
        clearDataFunction={clearDataFunction}
        valueField={valueField}
        textField={textField}
        placeholderText={"Select VCS Provider"}
        disabled={disabled}
      />
  );
}

TerraformProviderSelectInput.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
  textField: PropTypes.string,
  valueField: PropTypes.string,
  toolId: PropTypes.string,
  vcsProviders: PropTypes.array,
};

TerraformProviderSelectInput.defaultProps = {
  valueField: "provider",
  textField: "vcsProviderName",
  fieldName: "provider",
  disabled: false
};

export default TerraformProviderSelectInput;
