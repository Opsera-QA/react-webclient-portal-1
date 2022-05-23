import React from "react";
import PropTypes from "prop-types";
import RoleRestrictedToolByIdentifierInputBase
  from "components/common/list_of_values_input/tools/RoleRestrictedToolByIdentifierInputBase";

function SnaplogicScmToolSelectInput({model, setModel, className, disabled}) {

  const setDataFunction = (fieldName, selectedOption) => {
    let newModel = {...model};
    newModel.setData(fieldName, selectedOption._id);
    newModel.setData("gitRepository", "");
    newModel.setData("projectId", "");
    newModel.setData("gitBranch", "");
    setModel({...newModel});
  };

  const clearDataFunction = (fieldName) => {
    let newModel = {...model};
    newModel.setData("gitToolId", "");
    newModel.setData("gitRepository", "");
    newModel.setData("projectId", "");
    newModel.setData("gitBranch", "");
    setModel({...newModel});
  };

  return (
     <RoleRestrictedToolByIdentifierInputBase
       fieldName={"gitToolId"}
       toolIdentifier={model?.getData("service")}
       className={className}
       model={model}
       setModel={setModel}
       disabled={disabled}
       configurationRequired={true}
       setDataFunction={setDataFunction}
       clearDataFunction={clearDataFunction}
     />
  );
}

SnaplogicScmToolSelectInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
  className: PropTypes.string,
};

export default SnaplogicScmToolSelectInput;
