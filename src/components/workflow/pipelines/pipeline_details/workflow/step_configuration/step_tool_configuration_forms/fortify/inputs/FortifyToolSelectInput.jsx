import React from "react";
import PropTypes from "prop-types";
import RoleRestrictedFortifyToolSelectInput
  from "components/common/list_of_values_input/tools/fortify/RoleRestrictedFortifyToolSelectInput";

function FortifyToolSelectInput({ model, setModel, className, disabled }) {

  const setDataFunction = (fieldName, selectedOption) => {
    let newModel = {...model};

    console.log({selectedOption});
    newModel.setData(fieldName, selectedOption._id);
    newModel.setData("scanToolType", selectedOption?.configuration?.scanToolType);
    newModel.setDefaultValue("applicationId");
    newModel.setDefaultValue("applicationName");
    newModel.setDefaultValue("releaseId");    
    newModel.setDefaultValue("releaseName");
    newModel.setDefaultValue("assessmentType");
    newModel.setDefaultValue("entitlementPreferenceType");
    newModel.setDefaultValue("technologyStackId");
    newModel.setDefaultValue("languageLevelId");    
    newModel.setDefaultValue("auditPreferenceId");    
    setModel({...newModel});
  };

  const clearDataFunction = (fieldName) => {
    let newModel = {...model};
    newModel.setDefaultValue("toolConfigId");
    newModel.setDefaultValue("scanToolType");
    newModel.setDefaultValue("applicationId");
    newModel.setDefaultValue("applicationName");
    newModel.setDefaultValue("releaseId");    
    newModel.setDefaultValue("releaseName");
    newModel.setDefaultValue("assessmentType");
    newModel.setDefaultValue("entitlementPreferenceType");
    newModel.setDefaultValue("technologyStackId");
    newModel.setDefaultValue("languageLevelId");    
    newModel.setDefaultValue("auditPreferenceId");
    setModel({...newModel});
  };

  return (
    <RoleRestrictedFortifyToolSelectInput
      fieldName={"toolConfigId"}
      className={className}
      model={model}
      setModel={setModel}
      disabled={disabled}
      setDataFunction={setDataFunction}
      clearDataFunction={clearDataFunction}
    />
  );
}

FortifyToolSelectInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
  className: PropTypes.string
};

export default FortifyToolSelectInput;
