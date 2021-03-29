import React, { useState } from "react";
import PropTypes from "prop-types";
import FieldContainer from "components/common/fields/FieldContainer";
import FieldLabel from "components/common/fields/FieldLabel";
import CopyToClipboardIcon from "components/common/icons/CopyToClipboardIcon";

function TextFieldBase({dataObject, fieldName, className, showClipboardButton }) {
  const [field] = useState(dataObject.getFieldById(fieldName));

  const getClipboardButton = () => {
    if (showClipboardButton === true) {
      return (<CopyToClipboardIcon className={"my-auto ml-auto"} copyString={dataObject?.getData(fieldName)} />);
    }
  };

  return (
    <FieldContainer className={className}>
      <div className="w-100 d-flex">
        <FieldLabel field={field}/>
        <span>{dataObject.getData(fieldName)}</span>
        {getClipboardButton()}
      </div>
    </FieldContainer>
  );
}

TextFieldBase.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  className: PropTypes.string,
  showClipboardButton: PropTypes.bool
};

export default TextFieldBase;