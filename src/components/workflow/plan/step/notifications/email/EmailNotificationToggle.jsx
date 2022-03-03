import React from "react";
import PropTypes from "prop-types";
import BooleanToggleInput from "components/common/inputs/boolean/BooleanToggleInput";

function EmailNotificationToggle({ fieldName, model, setModel, disabled }) {

  const setDataFunction = (fieldName, newValue) => {
    const newModel = {...model};
    newModel.setData(fieldName, newValue);
    newModel.setData("addresses", []);
    newModel.setData("address", undefined);
    setModel({...newModel});
  };

  return (
    <BooleanToggleInput
      fieldName={fieldName}
      setDataFunction={setDataFunction}
      dataObject={model}
      setDataObject={setModel}
      disabled={disabled}
      id={"email"}
    />
  );
}

EmailNotificationToggle.propTypes = {
  disabled: PropTypes.bool,
  setModel: PropTypes.func,
  model: PropTypes.object,
  fieldName: PropTypes.string
};

EmailNotificationToggle.defaultProps = {
  fieldName: "enabled"
};

export default EmailNotificationToggle;