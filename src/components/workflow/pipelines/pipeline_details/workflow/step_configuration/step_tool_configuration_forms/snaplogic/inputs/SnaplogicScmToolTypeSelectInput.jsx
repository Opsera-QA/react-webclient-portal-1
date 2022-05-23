import React from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";

export const SNAPLOGIC_SCM_TOOL_LIST = [  
  {
    name: "Github",
    value: "github",
  }
];

function SnaplogicScmToolTypeSelectInput({model, setModel, isLoading, disabled}) {
  
  const setDataFunction = (fieldName, selectedOption) => {
    let newModel = {...model};
    newModel.setData("service", selectedOption?.value);
    newModel.setData("gitToolId", "");
    newModel.setData("gitRepository", "");
    newModel.setData("projectId", "");
    newModel.setData("gitBranch", "");
    setModel({...newModel});
  };

  return (
     <SelectInputBase
       fieldName={"service"}
       dataObject={model}
       setDataObject={setModel}
       selectOptions={SNAPLOGIC_SCM_TOOL_LIST}
       valueField={"value"}
       textField={"name"}
       placeholderText={"Select a Tool Type"}
       setDataFunction={setDataFunction}
       disabled={disabled}
       busy={isLoading}
     />
  );
}

SnaplogicScmToolTypeSelectInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
  isLoading: PropTypes.bool,
  className: PropTypes.string
};

export default SnaplogicScmToolTypeSelectInput;