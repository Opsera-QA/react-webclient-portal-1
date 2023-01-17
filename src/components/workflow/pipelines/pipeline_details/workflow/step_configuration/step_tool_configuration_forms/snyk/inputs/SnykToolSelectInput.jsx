import React from "react";
import PropTypes from "prop-types";
import RoleRestrictedSnykToolSelectInput
  from "components/common/list_of_values_input/tools/snyk/RoleRestrictedSnykToolSelectInput";

function SnykToolSelectInput({ fieldName, model, setModel, disabled }) {
  const setDataFunction=(fieldName,selectedOption)=>{
    let newDataObject = {...model};
    newDataObject.setData(fieldName, selectedOption?._id);
    newDataObject.setData("snykProducts","");
    newDataObject.setData("languageLevelId", "");
    newDataObject.setData("version", "");
    newDataObject.setData("packagerNameOrBuildTool", "");
    newDataObject.setData("multiModuleProject", "");
    newDataObject.setData("thresholdVulnerability", "");
    newDataObject.setData("gitToolId", "");
    newDataObject.setData("repoId", "");
    newDataObject.setData("gitBranch", "");
    setModel({...newDataObject});
  };

  return (
    <RoleRestrictedSnykToolSelectInput
      fieldName={fieldName}
      model={model}
      setModel={setModel}
      setDataFunction={setDataFunction}
      disabled={disabled}
    />
  );
}

SnykToolSelectInput.propTypes = {
  fieldName: PropTypes.string,
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
};

SnykToolSelectInput.defaultProps = {
  fieldName: "toolConfigId",
};

export default SnykToolSelectInput;
