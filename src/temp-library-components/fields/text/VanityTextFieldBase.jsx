import React from "react";
import PropTypes from "prop-types";
import FieldContainer from "components/common/fields/FieldContainer";
import {VanityLabelBase} from "temp-library-components/label/VanityLabelBase";

export default function VanityTextFieldBase(
  {
    label,
    text,
    className,
    requireValue,
    showLabel,
  }) {
  if (requireValue && !text) {
    return null;
  }

  return (
    <FieldContainer className={className}>
      <VanityLabelBase
        label={label}
        visible={showLabel}
      />
      <div>{text}</div>
    </FieldContainer>
  );
}

VanityTextFieldBase.propTypes = {
  label: PropTypes.any,
  text: PropTypes.string,
  className: PropTypes.string,
  requireValue: PropTypes.bool,
  showLabel: PropTypes.bool,
};