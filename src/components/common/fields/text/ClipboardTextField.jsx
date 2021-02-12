import React, { useState } from "react";
import PropTypes from "prop-types";
import FieldContainer from "components/common/fields/FieldContainer";
import FieldLabel from "components/common/fields/FieldLabel";
import SmallCopyButton from "components/common/buttons/clipboard/SmallCopyButton";

function ClipboardTextField({dataObject, fieldName}) {
  const [field] = useState(dataObject.getFieldById(fieldName));
  return (
    <FieldContainer>
      <FieldLabel field={field}/>
      <span>{dataObject?.getData(fieldName)}</span>
      <SmallCopyButton size={"sm"} copyString={dataObject?.getData(fieldName)} />
    </FieldContainer>
  );
}

ClipboardTextField.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
};

export default ClipboardTextField;