import React, { useState } from "react";
import PropTypes from "prop-types";
import FieldContainer from "components/common/fields/FieldContainer";
import FieldLabel from "components/common/fields/FieldLabel";

function ArrayToTextField({ dataObject, fieldName, className }) {
  const [field] = useState(dataObject?.getFieldById(fieldName));

  const getCommaSeparatedText = (arr) => {
    if (Array.isArray(arr) && arr.length > 0) {
      return arr.reduce((acc, val) => acc = acc + ", " + val).trim();
    }
  };

  if (field == null) {
    return null;
  }

  return (
    <FieldContainer className={className}>
      <div className="w-100 d-flex">
        <FieldLabel field={field} />
        <span>{getCommaSeparatedText(dataObject.getData(fieldName))}</span>
      </div>
    </FieldContainer>
  );
}

ArrayToTextField.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  className: PropTypes.string,
};

export default ArrayToTextField;
