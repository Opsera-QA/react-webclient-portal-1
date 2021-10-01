import React from "react";
import PropTypes from "prop-types";
import FieldContainer from "components/common/fields/FieldContainer";
import {getLargeVendorIconFromToolIdentifier} from "components/common/helpers/icon-helpers";

function ToolIdentifierVendorIconField({dataObject, fieldName, className}) {
  const getIcon = () => {
    let icon = getLargeVendorIconFromToolIdentifier(dataObject?.getData(fieldName));

    if (typeof icon === "string") {
      icon = (
        <div className="d-flex w-100 h-100 mt-2 mb-4">
          <div className="my-auto tool-title-text">{icon}</div>
        </div>
      );
    }

    return icon;
  };

  return (
    <FieldContainer className={className}>
      {getIcon()}
    </FieldContainer>
  );
}

ToolIdentifierVendorIconField.propTypes = {
  fieldName: PropTypes.string,
  className: PropTypes.string,
  dataObject: PropTypes.object,
};

export default ToolIdentifierVendorIconField;