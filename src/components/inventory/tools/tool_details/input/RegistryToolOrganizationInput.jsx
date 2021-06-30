import React, {useEffect} from "react";
import PropTypes from "prop-types";
import OrganizationListInput from "components/common/list_of_values_input/settings/organizations/OrganizationListInput";

function RegistryToolOrganizationInput({ dataObject, setDataObject, disabled, fieldName, className}) {

  // Remove old organizations values
  useEffect(() => {
    const currentOrganizations = dataObject?.getArrayData(fieldName);

    if (Array.isArray(currentOrganizations) && currentOrganizations.length > 0) {
      const filteredArray = currentOrganizations.filter((organization) => typeof organization === "string");
      dataObject.setData(fieldName, filteredArray);
      setDataObject({...dataObject});
    }
  }, []);


  return (
    <OrganizationListInput
      className={className}
      disabled={disabled}
      fieldName={fieldName}
      setDataObject={setDataObject}
      dataObject={dataObject}
    />
  );
}

RegistryToolOrganizationInput.propTypes = {
  dataObject: PropTypes.object,
  fieldName: PropTypes.string,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
  className: PropTypes.string
};

RegistryToolOrganizationInput.defaultProps = {
  fieldName: "organization"
};

export default RegistryToolOrganizationInput;