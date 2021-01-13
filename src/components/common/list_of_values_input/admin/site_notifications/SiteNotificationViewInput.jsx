import React from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import siteNotificationLovHelpers from "./site-notification-lov-helpers";

function SiteNotificationViewInput({ fieldName, dataObject, setDataObject, disabled }) {
  return (
    <SelectInputBase
      fieldName={fieldName}
      dataObject={dataObject}
      setDataObject={setDataObject}
      selectOptions={siteNotificationLovHelpers.viewLocations}
      valueField="id"
      textField="label"
      disabled={disabled}
    />
  );
}

SiteNotificationViewInput.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
};

SiteNotificationViewInput.defaultProps = {
  fieldName: "view"
};

export default SiteNotificationViewInput;