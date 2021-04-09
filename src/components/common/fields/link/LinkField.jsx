import React, { useState } from "react";
import PropTypes from "prop-types";
import StandaloneLinkField from "components/common/fields/link/standalone/StandaloneLinkField";

function LinkField({model, fieldName, className, showClipboardButton, openInNewWindow }) {
  const [field] = useState(model?.getFieldById(fieldName));

  if (model == null || model.getData(fieldName) == null) {
    return null;
  }

  return (
    <StandaloneLinkField
      className={className}
      openInNewWindow={openInNewWindow}
      link={model?.getData(fieldName)}
      label={field?.label}
      showClipboardButton={showClipboardButton}
    />
  );
}

LinkField.propTypes = {
  fieldName: PropTypes.string,
  model: PropTypes.object,
  className: PropTypes.string,
  showClipboardButton: PropTypes.bool,
  openInNewWindow: PropTypes.bool
};

export default LinkField;