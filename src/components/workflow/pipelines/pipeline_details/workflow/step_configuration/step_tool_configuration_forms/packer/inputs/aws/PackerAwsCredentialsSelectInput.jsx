import React from "react";
import PropTypes from "prop-types";
import RoleRestrictedToolByIdentifierInputBase
  from "components/common/list_of_values_input/tools/RoleRestrictedToolByIdentifierInputBase";

function PackerAwsCredentialsSelectInput({model, setModel, disabled}) {
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

PackerAwsCredentialsSelectInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
  className: PropTypes.string
};

export default PackerAwsCredentialsSelectInput;