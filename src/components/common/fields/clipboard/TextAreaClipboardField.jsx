import React from "react";
import PropTypes from "prop-types";
import FieldContainer from "components/common/fields/FieldContainer";
import CopyToClipboardButton from "components/common/buttons/clipboard/CopyToClipboardButton";

function TextAreaClipboardField({textAreaValue, description, className, rows}) {
  const getDescription = () => {
    if (description) {
      return (
        <div className="my-2">
          {description}
        </div>
      );
    }
  }

  if (textAreaValue == null || textAreaValue === "") {
    return null;
  }

  return (
    <FieldContainer className={className}>
      <textarea
        value={textAreaValue}
        disabled={true}
        className="form-control"
        rows={rows}
      />
      {getDescription()}
      <CopyToClipboardButton copyString={textAreaValue} />
    </FieldContainer>
  );
}

TextAreaClipboardField.propTypes = {
  textAreaValue: PropTypes.string,
  description: PropTypes.string,
  className: PropTypes.string,
  rows: PropTypes.number
};

TextAreaClipboardField.defaultProps = {
  rows: 5
};

export default TextAreaClipboardField;