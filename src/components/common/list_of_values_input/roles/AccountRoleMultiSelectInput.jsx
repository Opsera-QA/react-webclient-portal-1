import React, {useState} from "react";
import PropTypes from "prop-types";
import MultiSelectInputBase from "components/common/inputs/multi_select/MultiSelectInputBase";

function AccountRoleMultiSelectInput({ fieldName, dataObject, setDataObject, setDataFunction, disabled}) {
  const [isLoading, setIsLoading] = useState(false);
  const [roleOptions, setRoleOptions] = useState(["everyone", "Free Trial", "Administrators", "PowerUsers"]);

  return (
    <MultiSelectInputBase
      fieldName={fieldName}
      dataObject={dataObject}
      setDataObject={setDataObject}
      setDataFunction={setDataFunction}
      selectOptions={roleOptions}
      busy={isLoading}
      // valueField={valueField}
      // textField={textField}
      // placeholderText={placeholderText}
      disabled={disabled || isLoading}
    />
  );
}

AccountRoleMultiSelectInput.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  setDataFunction: PropTypes.func,
  disabled: PropTypes.bool,
  visible: PropTypes.bool
};

AccountRoleMultiSelectInput.defaultProps = {
  fieldName: "roles",
};

export default AccountRoleMultiSelectInput;