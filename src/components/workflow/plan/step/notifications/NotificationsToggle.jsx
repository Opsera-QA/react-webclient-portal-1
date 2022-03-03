import React  from "react";
import PropTypes from "prop-types";
import BooleanToggleInput from "components/common/inputs/boolean/BooleanToggleInput";

function NotificationsToggle({ fieldName, dataObject, setDataObject, disabled, type }) {
  return (
    <BooleanToggleInput
      dataObject={dataObject}
      setDataObject={setDataObject}
      disabled={disabled}
      fieldName={fieldName}
      id={type}
    />
  );
}

NotificationsToggle.propTypes = {
  disabled: PropTypes.bool,
  setDataObject: PropTypes.func,
  dataObject: PropTypes.object,
  fieldName: PropTypes.string,
  type: PropTypes.string,
};

NotificationsToggle.defaultProps = {
  fieldName: "enabled"
};

export default NotificationsToggle;