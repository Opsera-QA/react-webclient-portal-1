import React, { useState } from "react";
import PropTypes from "prop-types";
import FieldContainer from "components/common/fields/FieldContainer";
import FieldLabel from "components/common/fields/FieldLabel";
import {hasStringValue} from "components/common/helpers/string-helpers";

function ArrayToTextField({ model, fieldName, className, visible }) {
  const [field] = useState(model?.getFieldById(fieldName));

  const getCommaSeparatedText = () => {
    const array = model?.getArrayData(fieldName);
    if (Array.isArray(array) && array.length > 0) {
      let commaSeparatedText = "";

      array.forEach((value) => {
        if (hasStringValue(value)) {
          if (commaSeparatedText.length > 0) {
            commaSeparatedText += commaSeparatedText?.length > 0 ? `, ${value}` : value;
          }
        }
      });

      return commaSeparatedText;
    }
  };

  if (field == null || visible === false) {
    return null;
  }

  return (
    <FieldContainer className={className}>
      <div className="w-100 d-flex">
        <FieldLabel field={field} />
        <span>{getCommaSeparatedText()}</span>
      </div>
    </FieldContainer>
  );
}

ArrayToTextField.propTypes = {
  fieldName: PropTypes.string,
  model: PropTypes.object,
  className: PropTypes.string,
  visible: PropTypes.bool,
};

export default ArrayToTextField;
