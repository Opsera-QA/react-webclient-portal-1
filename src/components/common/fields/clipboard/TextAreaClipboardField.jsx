import React, {useState} from "react";
import PropTypes from "prop-types";
import FieldContainer from "components/common/fields/FieldContainer";
import Button from "react-bootstrap/Button";

function TextAreaClipboardField({textAreaValue, description}) {
  const [copiedToClipboard, setCopiedToClipboard] = useState(false);

  const copyToClipboard = () => {
    const dummy = document.createElement("textarea");
    document.body.appendChild(dummy);
    dummy.value = textAreaValue;
    dummy.select();
    document.execCommand("copy");
    document.body.removeChild(dummy);
    setCopiedToClipboard(true);
  };


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
    <FieldContainer>
      <textarea
        value={textAreaValue}
        disabled={true}
        className="form-control"
        rows={5}
      />
      {getDescription()}
      <Button variant={"outline-secondary"} onClick={() => {copyToClipboard()}}>Copy to clipboard</Button>
    </FieldContainer>
  );
}

TextAreaClipboardField.propTypes = {
  textAreaValue: PropTypes.string,
  description: PropTypes.string,
};

export default TextAreaClipboardField;