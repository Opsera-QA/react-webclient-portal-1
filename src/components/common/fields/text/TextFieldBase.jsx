import React, { useState } from "react";
import PropTypes from "prop-types";
import FieldContainer from "components/common/fields/FieldContainer";
import FieldLabel from "components/common/fields/FieldLabel";
import CopyToClipboardIcon from "components/common/icons/CopyToClipboardIcon";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";

function TextFieldBase(
  {
    dataObject,
    fieldName,
    className,
    showClipboardButton,
    visible,
    requireSavedValue,
  }) {
  const field = dataObject?.getFieldById(fieldName);
  const textValue = DataParsingHelper.parseString(dataObject?.getData(fieldName));
  const numberValue = DataParsingHelper.parseNumber(dataObject?.getData(fieldName));

  const getClipboardButton = () => {
    if (showClipboardButton === true) {
      return (<CopyToClipboardIcon className={"my-auto ml-3"} copyString={dataObject?.getData(fieldName)} />);
    }
  };

  if (field == null || visible === false || (requireSavedValue === true && !textValue && !numberValue)) {
    return null;
  }

  return (
    <FieldContainer className={className}>
      <div className="w-100 d-flex">
        <FieldLabel field={field} />
        <span>{textValue || numberValue?.toString() || ""}</span>
        {getClipboardButton()}
      </div>
    </FieldContainer>
  );
}

TextFieldBase.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  className: PropTypes.string,
  showClipboardButton: PropTypes.bool,
  visible: PropTypes.bool,
  requireSavedValue: PropTypes.bool,
};

export default TextFieldBase;