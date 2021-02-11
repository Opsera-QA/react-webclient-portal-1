import React from "react";
import PropTypes from "prop-types";
import NameValueInputBase from "components/common/inputs/object/NameValueInputBase";
import {faLocationArrow} from "@fortawesome/pro-light-svg-icons";

function RegistryToolLocationInput({ dataObject, setDataObject, disabled, fieldName}) {
  return (
    <NameValueInputBase
      titleIcon={faLocationArrow}
      dataObject={dataObject}
      setDataObject={setDataObject}
      fieldName={fieldName}
      allowIncompleteItems={true}
      type={"Location"}
      disabled={disabled}
    />
  );
}

RegistryToolLocationInput.propTypes = {
  dataObject: PropTypes.object,
  fieldName: PropTypes.string,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
};

RegistryToolLocationInput.defaultProps = {
  fieldName: "location"
};

export default RegistryToolLocationInput;