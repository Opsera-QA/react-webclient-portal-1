import React from "react";
import PropTypes from "prop-types";
import RoleRestrictedToolByIdentifierInputBase from "components/common/list_of_values_input/tools/RoleRestrictedToolByIdentifierInputBase";

function AnchoreIntegratorPipelineToolSelectInput({className, fieldName, model, setModel, disabled}) {
  const setDataFunction = (fieldName, selectedOption) => {
    let newModel = {...model};
    newModel.setData("anchoreToolConfigId", selectedOption?._id);
    newModel.setData("anchoreUrl", selectedOption?.configuration?.toolURL);
    newModel.setData("accountUsername", selectedOption?.configuration?.accountUsername);
    setModel({...newModel});
  };

  return (
     <RoleRestrictedToolByIdentifierInputBase
       toolIdentifier={"anchore-integrator"}
       toolFriendlyName={"Anchore Integrator"}
       fieldName={fieldName}
       placeholderText={"Select Anchore Integrator Tool"}
       configurationRequired={true}
       model={model}
       setModel={setModel}
       setDataFunction={setDataFunction}
       disabled={disabled}
       className={className}
       fields={["_id", "configuration", "name"]}
     />
  );
}

AnchoreIntegratorPipelineToolSelectInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  fieldName: PropTypes.string
};

AnchoreIntegratorPipelineToolSelectInput.defaultProps = {
  fieldName: "anchoreToolConfigId",
};

export default AnchoreIntegratorPipelineToolSelectInput;