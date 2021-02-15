import React from "react";
import PropTypes from "prop-types";
import FieldContainer from "components/common/fields/FieldContainer";
import CopyToClipboardButton from "components/common/buttons/clipboard/CopyToClipboardButton";

function TextAreaClipboardField({textAreaValue, description, className, rows, allowResize}) {
  const getDescription = () => {
    if (description) {
      return (
        <div className="my-2">
          {description}
        </div>
      );
    }
  }

  return (
    <FieldContainer className={className}>
      <textarea
        value={textAreaValue}
        disabled={true}
        className={`form-control${!allowResize ? " no-resize" : ""}`}
        placeholder={"Generate a new token to get started."}
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
  rows: PropTypes.number,
  allowResize: PropTypes.bool
};

TextAreaClipboardField.defaultProps = {
  rows: 5,
  allowResize: true
};

export default TextAreaClipboardField;