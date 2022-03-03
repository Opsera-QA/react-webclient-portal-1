import React  from "react";
import PropTypes from "prop-types";
import BooleanToggleInput from "components/common/inputs/boolean/BooleanToggleInput";

function NotificationsToggle({ fieldName, dataObject, setDataObject, disabled }) {
  return (
    <BooleanToggleInput
      dataObject={dataObject}
      setDataObject={setDataObject}
      disabled={disabled}
      fieldName={fieldName}
    />
  );
}

NotificationsToggle.propTypes = {
  disabled: PropTypes.bool,
  setDataObject: PropTypes.func,
  dataObject: PropTypes.object,
  fieldName: PropTypes.string
};

NotificationsToggle.defaultProps = {
  fieldName: "enabled"
};

export default NotificationsToggle;