import React from "react";
import PropTypes from "prop-types";
import BooleanToggleInput from "components/common/inputs/boolean/BooleanToggleInput";

function ServiceNowExistingChangeRequestToggleInput({ model, setModel, disabled, fieldName }) {

  const setDataFunction = (fieldName, selectedOption) => {
    model?.setData(fieldName, selectedOption);
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
    setModel({ ...model });
  };

  return (
    <BooleanToggleInput
      fieldName={fieldName}
      dataObject={model}
      setDataObject={setModel}
      setDataFunction={setDataFunction}
    />
  );
}

ServiceNowExistingChangeRequestToggleInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
  fieldName: PropTypes.string,
};

export default ServiceNowExistingChangeRequestToggleInput;
