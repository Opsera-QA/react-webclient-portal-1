import React from "react";
import PropTypes from "prop-types";
import RoleRestrictedSonarToolSelectInput
  from "components/common/list_of_values_input/tools/sonar/tool/RoleRestrictedSonarToolSelectInput";

function SonarStepSonarToolSelectInput({fieldName, model, setModel, disabled}) {
  const setDataFunction = (fieldName, selectedOption) => {
    let newModel = {...model};
    newModel.setData(fieldName, selectedOption?._id);
    newModel.setData("sonarUrl", selectedOption?.configuration?.sonarUrl);
    newModel.setData("sonarPort", selectedOption?.configuration?.sonarPort);
    newModel.setData("sonarUserId", selectedOption?.configuration?.sonarUserId);
    setModel({...newModel});
  };

  return (
    <RoleRestrictedSonarToolSelectInput
      fieldName={fieldName}
      model={model}
      setModel={setModel}
      setDataFunction={setDataFunction}
      disabled={disabled}
    />
  );
}

SonarStepSonarToolSelectInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
  fieldName: PropTypes.string,
};

SonarStepSonarToolSelectInput.defaultProps = {
  fieldName: "sonarToolConfigId",
};

export default SonarStepSonarToolSelectInput;