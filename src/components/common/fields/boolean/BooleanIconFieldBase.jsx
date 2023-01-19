import React from "react";
import PropTypes from "prop-types";
import FieldContainer from "components/common/fields/FieldContainer";
import FieldLabelBase from "components/common/fields/FieldLabelBase";
import BooleanIcon from "components/common/icons/boolean/BooleanIcon";

export default function BooleanIconFieldBase(
  {
    label,
    value,
    className,
  }) {
  return (
    <FieldContainer className={className}>
      <FieldLabelBase label={label}/>
      <BooleanIcon
        value={value}
      />
    </FieldContainer>
  );
}

BooleanIconFieldBase.propTypes = {
  label: PropTypes.string,
  value: PropTypes.bool,
  className: PropTypes.string,
};
