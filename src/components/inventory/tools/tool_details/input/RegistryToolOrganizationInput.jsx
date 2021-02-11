import React from "react";
import PropTypes from "prop-types";
import NameValueInputBase from "components/common/inputs/object/NameValueInputBase";
import {faLocationArrow, faSitemap} from "@fortawesome/pro-light-svg-icons";

function RegistryToolOrganizationInput({ dataObject, setDataObject, disabled, fieldName}) {
  return (
    <NameValueInputBase
      titleIcon={faSitemap}
      dataObject={dataObject}
      setDataObject={setDataObject}
      fieldName={fieldName}
      allowIncompleteItems={true}
      type={"Organization"}
      disabled={disabled}
    />
  );
}

RegistryToolOrganizationInput.propTypes = {
  dataObject: PropTypes.object,
  fieldName: PropTypes.string,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
};

RegistryToolOrganizationInput.defaultProps = {
  fieldName: "organization"
};

export default RegistryToolOrganizationInput;