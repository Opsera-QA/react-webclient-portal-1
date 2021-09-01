import React from "react";
import PropTypes from "prop-types";
import RoleRestrictedToolByIdentifierInputBase
  from "components/common/list_of_values_input/tools/RoleRestrictedToolByIdentifierInputBase";

function TerraformAwsCredentialsSelectInput({model, setModel, disabled}) {
  return (
     <RoleRestrictedToolByIdentifierInputBase
       toolIdentifier={"aws_account"}
       configurationRequired={true}
       fieldName={"awsToolConfigId"}
       model={model}
       setModel={setModel}
       placeholderText={"Select Credentials"}
       disabled={disabled}
     />
  );
}

TerraformAwsCredentialsSelectInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
  className: PropTypes.string
};

export default TerraformAwsCredentialsSelectInput;