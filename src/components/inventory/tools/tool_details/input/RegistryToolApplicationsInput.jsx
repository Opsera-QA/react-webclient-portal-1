import React from "react";
import PropTypes from "prop-types";
import NameValueInputBase from "components/common/inputs/object/NameValueInputBase";
import {faBrowser} from "@fortawesome/pro-light-svg-icons";

function RegistryToolApplicationsInput({ dataObject, setDataObject, disabled, fieldName}) {
  return (
    <NameValueInputBase
      titleIcon={faBrowser}
      dataObject={dataObject}
      setDataObject={setDataObject}
      fieldName={fieldName}
      allowIncompleteItems={true}
      type={"Application"}
      disabled={disabled}
    />
  );
}

RegistryToolApplicationsInput.propTypes = {
  dataObject: PropTypes.object,
  fieldName: PropTypes.string,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
};

RegistryToolApplicationsInput.defaultProps = {
  fieldName: "applications"
};

export default RegistryToolApplicationsInput;