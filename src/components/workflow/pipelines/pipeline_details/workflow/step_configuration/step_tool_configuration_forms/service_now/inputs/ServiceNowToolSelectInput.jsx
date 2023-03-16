import React from "react";
import PropTypes from "prop-types";
import RoleRestrictedServiceNowToolSelectInput from "components/common/list_of_values_input/tools/service_now/RoleRestrictedServiceNowToolSelectInput";

function ServiceNowToolSelectInput(
  {
    className,
    fieldName,
    model,
    setModel,
    disabled,
  }) {
  const setDataFunction = (fieldName, selectedOption) => {
    let newModel = {...model};
    newModel.setData("serviceNowToolId", selectedOption?._id);
    newModel.setDefaultValue("type");
    newModel.setDefaultValue("existingChangeRequest");
    model?.setDefaultValue("changeRequestNumber");
    model?.setDefaultValue("changeRequestSysId");
    model?.setDefaultValue("changeRequestShortDescription");
    model?.setDefaultValue("changeRequestApproval");
    model?.setDefaultValue("changeRequestStartDate");
    model?.setDefaultValue("changeRequestEndDate");
    model?.setDefaultValue("changeRequestState");
    model?.setDefaultValue("assignmentGroupId");
    model?.setDefaultValue("assignmentGroupName");
    model?.setDefaultValue("changeRequestDescription");
    setModel({...newModel});
  };

  return (
    <RoleRestrictedServiceNowToolSelectInput
      fieldName={fieldName}
      model={model}
      setModel={setModel}
      setDataFunction={setDataFunction}
      disabled={disabled}
      className={className}
    />
  );
}

ServiceNowToolSelectInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  fieldName: PropTypes.string
};

ServiceNowToolSelectInput.defaultProps = {
  fieldName: "serviceNowToolId",
};

export default ServiceNowToolSelectInput;
