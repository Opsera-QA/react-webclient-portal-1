import React from "react";
import PropTypes from "prop-types";
import {faUsers} from "@fortawesome/pro-light-svg-icons";
import ContactInput from "components/common/inputs/object/ContactInput";

function RegistryToolContactInput({ dataObject, setDataObject, disabled, fieldName}) {
  return (
    <ContactInput
      titleIcon={faUsers}
      dataObject={dataObject}
      setDataObject={setDataObject}
      fieldName={fieldName}
      allowIncompleteItems={true}
      type={"Contact"}
      disabled={disabled}
    />
  );
}

RegistryToolContactInput.propTypes = {
  dataObject: PropTypes.object,
  fieldName: PropTypes.string,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
};

RegistryToolContactInput.defaultProps = {
  fieldName: "contacts"
};

export default RegistryToolContactInput;