import React, { useState } from "react";
import PropTypes from "prop-types";
import FieldContainer from "components/common/fields/FieldContainer";
import FieldLabel from "components/common/fields/FieldLabel";
import CopyToClipboardIcon from "components/common/icons/CopyToClipboardIcon";

function ClipboardTextField({dataObject, fieldName, className}) {
  const [field] = useState(dataObject.getFieldById(fieldName));
  return (
    <FieldContainer className={className}>
      <div className="w-100 d-flex">
        <FieldLabel field={field}/>
        <span>{dataObject?.getData(fieldName)}</span>
        <CopyToClipboardIcon className={" my-auto ml-auto"} copyString={dataObject?.getData(fieldName)} />
      </div>
    </FieldContainer>
  );
}

ClipboardTextField.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  className: PropTypes.string
};

export default ClipboardTextField;