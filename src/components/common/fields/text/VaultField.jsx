import React, { useState } from "react";
import PropTypes from "prop-types";
import FieldContainer from "components/common/fields/FieldContainer";
import FieldLabel from "components/common/fields/FieldLabel";

function VaultField({dataObject, fieldName, className}) {
  const [field] = useState(dataObject.getFieldById(fieldName));

  const isStoredInVault = () => {
    let currentValue = dataObject.getData(fieldName);
    return typeof currentValue === "object" && Object.entries(currentValue).length > 0;
  };

  const getText = () => {
    if (isStoredInVault()) {
      return <span>This credential is securely stored in the vault.</span>;
    }
  };

  return (
    <FieldContainer className={className}>
      <FieldLabel field={field}/>
      {getText()}
    </FieldContainer>
  );
}

VaultField.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  className: PropTypes.string
};

export default VaultField;