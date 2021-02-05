import React from "react";
import PropTypes from "prop-types";
import FieldContainer from "components/common/fields/FieldContainer";
import {getLargeVendorIconFromToolIdentifier} from "components/common/helpers/icon-helpers";

function ToolIdentifierVendorIconField({dataObject, fieldName, className}) {
  return (
    <FieldContainer className={className}>
      {getLargeVendorIconFromToolIdentifier(process.env.REACT_APP_OPSERA_S3_STORAGE_URL, dataObject?.getData(fieldName))}
    </FieldContainer>
  );
}

ToolIdentifierVendorIconField.propTypes = {
  fieldName: PropTypes.string,
  className: PropTypes.string,
  dataObject: PropTypes.object,
};

export default ToolIdentifierVendorIconField;