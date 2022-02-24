import React, { useState } from "react";
import PropTypes from "prop-types";
import FieldContainer from "components/common/fields/FieldContainer";
import FieldLabel from "components/common/fields/FieldLabel";

function ConstantFieldBase(
  {
    model,
    fieldName,
    className,
    showLabel,
    getLabelFunction
  }) {
  const [field] = useState(model?.getFieldById(fieldName));

  if (field == null || getLabelFunction == null) {
    return null;
  }

  return (
    <FieldContainer className={className}>
      <div className={"w-100 d-flex"}>
        <FieldLabel field={field} showLabel={showLabel}/>
        <span>{getLabelFunction(model?.getData(fieldName))}</span>
      </div>
    </FieldContainer>
  );
}

ConstantFieldBase.propTypes = {
  getLabelFunction: PropTypes.func,
  fieldName: PropTypes.string,
  model: PropTypes.object,
  className: PropTypes.string,
  showLabel: PropTypes.bool,
};

export default ConstantFieldBase;