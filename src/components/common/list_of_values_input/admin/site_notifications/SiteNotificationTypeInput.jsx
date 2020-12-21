import React from "react";
import PropTypes from "prop-types";
import SelectInputBase from "../../../inputs/SelectInputBase";
import siteNotificationLovHelpers from "./site-notification-lov-helpers";

function SiteNotificationTypeInput({ fieldName, dataObject, setDataObject, disabled }) {
  return (
    <SelectInputBase
      fieldName={fieldName}
      dataObject={dataObject}
      setDataObject={setDataObject}
      selectOptions={siteNotificationLovHelpers.notificationTypes}
      valueField="id"
      textField="label"
      disabled={disabled}
    />
  );
}

SiteNotificationTypeInput.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
};

SiteNotificationTypeInput.defaultProps = {
  fieldName: "type"
};

export default SiteNotificationTypeInput;