import React, {useState} from "react";
import PropTypes from "prop-types";
import FieldContainer from "components/common/fields/FieldContainer";
import FieldLabel from "components/common/fields/FieldLabel";

function VaultAccessField({dataObject, fieldName, noDataMessage, className}) {
  const [field] = useState(dataObject.getFieldById(fieldName));

  const getVaultAccessConfigurationItems = () => {
    if (dataObject?.getData(fieldName) == null || dataObject?.getData(fieldName)?.length === 0) {
      return <span>{noDataMessage}</span>;
    }
    return (
      "User Specified Vault Instance In Use"
    );
  };

  return (
    <FieldContainer className={className}>
      <FieldLabel fieldName={fieldName} field={field}/>
      <span className="item-field">
        {getVaultAccessConfigurationItems()}
      </span>
    </FieldContainer>
  );
}

VaultAccessField.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  noDataMessage: PropTypes.any,
  className: PropTypes.string
};

export default VaultAccessField;