import React from "react";
import PropTypes from "prop-types";
import FieldContainer from "components/common/fields/FieldContainer";
import FieldLabelBase from "components/common/fields/FieldLabelBase";

export default function BooleanFieldBase(
  {
    label,
    value,
    className,
  }) {
  return (
    <FieldContainer className={className}>
      <FieldLabelBase label={label}/>
      <span>{value === true ? "True" : "False"}</span>
    </FieldContainer>
  );
}

BooleanFieldBase.propTypes = {
  label: PropTypes.string,
  value: PropTypes.bool,
  className: PropTypes.string,
};
