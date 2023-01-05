import React from "react";
import PropTypes from "prop-types";
import { hasStringValue } from "components/common/helpers/string-helpers";

function InputContainer(
  {
    fieldName,
    children,
    className,
  }) {
  const getClassNames = () => {
    let classNames = hasStringValue(className) === true ? className : "mt-2 mb-3 input-container";

    if (hasStringValue(fieldName) === true) {
      classNames += ` input-for-${fieldName}`;
    }

    return classNames;
  };

  return (
    <div className={getClassNames()}>
      {children}
    </div>
  );
}

InputContainer.propTypes = {
  fieldName: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.any,
};

export default InputContainer;