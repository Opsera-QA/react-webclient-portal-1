import React from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";

export const TERRAFORM_PROVIDER_SERVICE_LIST = [
  {
    name: "Gitlab",
    value: "GITLAB",
  },
  {
    name: "Github",
    value: "GITHUB",
  }
];

function TerraformProviderServiceSelectInput({model, setModel, isLoading, disabled}) {
  
  const setDataFunction = async (fieldName, selectedOption) => {
    let newModel = {...model};
    newModel.setData(fieldName, selectedOption?.value);
    newModel.setData("gitToolId", "");    
    setModel({...newModel});
  };

  const clearDataFunction = async (fieldName) => {
    let newModel = {...model};
    newModel.setData("service", "");
    newModel.setData("gitToolId", "");    
    setModel({...newModel});
  };

  return (
     <SelectInputBase
       fieldName={"service"}
       dataObject={model}
       setDataObject={setModel}
       selectOptions={TERRAFORM_PROVIDER_SERVICE_LIST}
       valueField={"value"}
       textField={"name"}
       placeholderText={"Select a Service"}
       setDataFunction={setDataFunction}
       clearDataFunction={clearDataFunction}
       disabled={disabled}
       busy={isLoading}
     />
  );
}

TerraformProviderServiceSelectInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
  isLoading: PropTypes.bool,
  className: PropTypes.string
};

export default TerraformProviderServiceSelectInput;