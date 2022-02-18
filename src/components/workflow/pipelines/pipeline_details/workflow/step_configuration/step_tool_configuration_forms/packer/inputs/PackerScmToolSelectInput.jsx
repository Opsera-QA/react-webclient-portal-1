import React from "react";
import PropTypes from "prop-types";
import RoleRestrictedToolByIdentifierInputBase
  from "components/common/list_of_values_input/tools/RoleRestrictedToolByIdentifierInputBase";

function PackerScmToolSelectInput({model, setModel, className, disabled}) {
  return (
     <RoleRestrictedToolByIdentifierInputBase
       fieldName={"gitToolId"}
       toolIdentifier={model?.getData("type")}
       className={className}
       model={model}
       setModel={setModel}
       disabled={disabled}
       configurationRequired={true}
     />
  );
}

PackerScmToolSelectInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
  className: PropTypes.string
};

export default PackerScmToolSelectInput;
