import React, { useState } from "react";
import PropTypes from "prop-types";
import StandaloneLinkField from "components/common/fields/link/standalone/StandaloneLinkField";

function LinkField({dataObject, fieldName, className, showClipboardButton, openInNewWindow }) {
  const [field] = useState(dataObject.getFieldById(fieldName));

  return (
    <StandaloneLinkField
      className={className}
      openInNewWindow={openInNewWindow}
      link={dataObject?.getData(fieldName)}
      label={field?.label}
      showClipboardButton={showClipboardButton}
    />
  );
}

LinkField.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  className: PropTypes.string,
  showClipboardButton: PropTypes.bool,
  openInNewWindow: PropTypes.bool
};

export default LinkField;