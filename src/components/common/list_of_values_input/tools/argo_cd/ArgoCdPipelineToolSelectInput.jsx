import React from "react";
import PropTypes from "prop-types";
import RoleRestrictedToolInputBase from "components/common/list_of_values_input/tools/RoleRestrictedToolInputBase";

function ArgoCdPipelineToolSelectInput({className, fieldName, model, setModel, disabled}) {
  const setDataFunction = (fieldName, selectedOption) => {
    let newModel = {...model};
    newModel.setData("toolConfigId", selectedOption?._id);
    newModel.setData("toolUrl", selectedOption?.configuration?.toolURL);
    newModel.setData("userName", selectedOption?.configuration?.userName);
    setModel({...newModel});
  };

  return (
     <RoleRestrictedToolInputBase
       toolType={"argo"}
       toolFriendlyName={"Argo CD"}
       fieldName={fieldName}
       placeholderText={"Select Argo CD Tool"}
       configurationRequired={true}
       model={model}
       setModel={setModel}
       setDataFunction={setDataFunction}
       disabled={disabled}
       className={className}
     />
  );
}

ArgoCdPipelineToolSelectInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  fieldName: PropTypes.string
};

ArgoCdPipelineToolSelectInput.defaultProps = {
  fieldName: "toolConfigId",
};

export default ArgoCdPipelineToolSelectInput;